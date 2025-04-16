import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from '../../../../constant/Icon'
import { IndexStyles } from '../../../../import/IndexStyles';

import { renderInformationItem, renderOrderStatus } from '../../../../import/IndexComponent'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackHomeTypeParam } from '../../../../model/param/IndexStack.Param'

import { useAppSelector, useAppDispatch } from '../../../../features/redux/ReduxHook'
import { Logout } from '../../../../redux/slices/Auth.Slice'
import { CustomModalConfirm } from '../../../../import/IndexComponent'
import { setItemCount } from '../../../../redux/slices/CountCartSlice'
import ToastMessage from '../../../../utils/ToastMessage'
import { useGetOrderUserQuery, useGetStatusOrderQuery } from '../../../../service/Api/Index.Order'
import { paymentStatus, status } from '../../../../model/entity/IndexOrder.Entity'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HandleUpdateFcmToken, HandleRemoveFcmToken } from '../../../../service/Api/IndexUser'

const Information: React.FC = () => {
  useStatusBarConfig('dark-content', 'transparent', true)
  const navigation = useNavigation<NativeStackNavigationProp<StackHomeTypeParam>>()
  const dispatch = useAppDispatch()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isLoggedIn = useAppSelector(state => state.root.Auth)

  const { data } = useGetStatusOrderQuery({ id: isLoggedIn.user._id, status: status, paymentStatus: paymentStatus }, {
    skip: !isLoggedIn.isLogged,
    skipPollingIfUnfocused: true
  });

  const { data: cart } = useGetOrderUserQuery(isLoggedIn.user._id, {
    skip: !isLoggedIn.isLogged,
    skipPollingIfUnfocused: true
  });

  const countOrderStatus = isLoggedIn.isLogged ? data?.data.length : 0;

  const countOrderPendingDelivery = isLoggedIn.isLogged ? cart?.data.filter((item) => item.status === "Đang giao").length : 0;

  const countOrderDelivered = isLoggedIn.isLogged ? cart?.data.filter((item) => item.status === "Đã giao").length : 0;

  const countOrderCancelled = isLoggedIn.isLogged ? cart?.data.filter((item) => item.status === "Đã hủy").length : 0;

  const handleRemoveToken = async () => {
    try {
      const result = await HandleRemoveFcmToken(isLoggedIn.user._id, isLoggedIn.user.fcmToken);
      if (result.status === 200) {
        console.log('Token removed successfully');
      }
    } catch (error) {
      console.error('Failed to update token for user:', isLoggedIn.user._id, error);
    }
  }

  const handleLogout = async () => {
    try {
      dispatch(Logout());
      await AsyncStorage.removeItem('fcmToken');
      dispatch(setItemCount(0));
      setIsVisible(false);
      await handleRemoveToken();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={IndexStyles.StyleInformation.container}>
        <LinearGradient colors={['#EB5A65', '#EB5A65', '#EB5A65']} style={IndexStyles.StyleInformation.viewheader}>
          <TouchableOpacity style={IndexStyles.StyleInformation.headerTitle} onPress={() => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'EditProfile' } as any)}>
            {isLoggedIn.user.photoUrl
              ? <Image source={{ uri: isLoggedIn.user.photoUrl }} style={IndexStyles.StyleInformation.image} />
              : <Icon.AvatarSVG width={50} height={50} fill='#FFFFFF' />
            }
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text style={IndexStyles.StyleInformation.textheader1}>{isLoggedIn.isLogged ? isLoggedIn.user.fullname : 'Đăng nhập'}</Text>
              <Text style={IndexStyles.StyleInformation.textheader2}>Thành viên bạc</Text>
              {isLoggedIn.isLogged ? (
                <Text style={IndexStyles.StyleInformation.textheader2}>Bạn có {countOrderStatus} đơn hàng chờ xác nhận</Text>
              ) : (
                <Text style={IndexStyles.StyleInformation.textheader2}>Đăng nhập để xem thông tin đơn hàng</Text>
              )}
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={IndexStyles.StyleInformation.containerbody}>
          <View style={IndexStyles.StyleInformation.containerorder}>
            <View style={IndexStyles.StyleInformation.vieworder1}>
              <Icon.MenuOrderSVG width={27} height={27} fill='blue' />
              <Text style={IndexStyles.StyleInformation.textOrder1}>Đơn mua</Text>
            </View>
            <TouchableOpacity style={IndexStyles.StyleInformation.vieworder2} onPress={() => navigation.navigate(isLoggedIn ? 'TabStatusOrder' : 'AuthUser', { screen: 'StatusDelivered' } as any)}>
              <Text style={IndexStyles.StyleInformation.textOrder2}>Lịch sử mua hàng</Text>
              <Image source={Icon.RIGHT} style={{ width: 27, height: 27 }} />
            </TouchableOpacity>
          </View>
          <View style={IndexStyles.StyleInformation.containerConfirm}>
            {renderOrderStatus({
              icon: <Icon.WaitOrderSVG width={27} height={27} fill='#5e5e5e' />,
              text: 'Chờ/Đã xác nhận',
              navigate: () => navigation.navigate(isLoggedIn.isLogged ? 'TabStatusOrder' : 'AuthUser', { screen: 'Xác nhận' } as any),
              badget: countOrderStatus
            })}
            {renderOrderStatus({
              icon: <Icon.WaitPickupSVG width={27} height={27} fill='#5e5e5e' />,
              text: 'Đang giao hàng',
              navigate: () => navigation.navigate(isLoggedIn.isLogged ? 'TabStatusOrder' : 'AuthUser', { screen: 'Giao hàng' } as any),
              badget: countOrderPendingDelivery
            })}
            {renderOrderStatus({
              icon: <Icon.WaitShipperSVG width={27} height={27} fill='#5e5e5e' />,
              text: 'Đã giao hàng',
              navigate: () => navigation.navigate(isLoggedIn.isLogged ? 'TabStatusOrder' : 'AuthUser', { screen: 'Đã giao' } as any),
              badget: countOrderDelivered
            })}
            {renderOrderStatus({
              icon: <Icon.OrderCancelledSVG width={27} height={27} fill='#5e5e5e' />,
              text: 'Đã hủy đơn',
              navigate: () => navigation.navigate(isLoggedIn.isLogged ? 'TabStatusOrder' : 'AuthUser', { screen: 'Đã hủy' } as any),
              badget: countOrderCancelled
            })}
          </View>

          <View style={IndexStyles.StyleInformation.decor}></View>
          <View>
            {renderInformationItem({ text: 'Khách hàng thân thiết', image: Icon.LOYALCUSTOMER, onPress: () => ToastMessage('info', 'Chức năng đang phát triển') })}
            {renderInformationItem({ text: 'Thông tin cá nhân', image: Icon.INFOR, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'EditProfile' } as any) })}
            {renderInformationItem({ text: 'Địa chỉ', image: Icon.ADDRESS, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'ViewAddRess' } as any) })}
            {renderInformationItem({ text: 'Yêu thích', image: Icon.FAVOURITE, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'Favorites' } as any) })}
            {renderInformationItem({ text: 'Đổi mật khẩu', image: Icon.CHANGEPASSWORD, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'ChangePassword' } as any) })}
            {renderInformationItem({ text: 'Đánh giá của tôi', image: Icon.FEEDBACK, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'ReviewInfor' } as any) })}
            {renderInformationItem({ text: 'Trò chuyện với shop', image: Icon.CHATWITHSHOP, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'ChatWithAdmin' } as any) })}
            {renderInformationItem({ text: 'Xóa tài khoản', image: Icon.DELETEUSER, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'DeleteAccount' } as any) })}
            {renderInformationItem({ text: 'Liên hệ và góp ý', image: Icon.CONTACT, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'ContactFeedback' } as any) })}
            {renderInformationItem({ text: 'Giới thiệu', image: Icon.INTRODUCE, onPress: () => navigation.navigate(isLoggedIn.isLogged ? 'StackIndividual' : 'AuthUser', { screen: 'Introduction' } as any) })}
            {isLoggedIn.isLogged ? (
              renderInformationItem({ text: 'Đăng xuất', image: Icon.LOGOUT, onPress: () => setIsVisible(true) })
            ) : (
              renderInformationItem({ text: 'Đăng nhập', image: Icon.LOGIN, onPress: () => navigation.navigate('AuthUser', { screen: 'Login' } as any) })
            )}
          </View>
          <CustomModalConfirm
            isVisible={isVisible}
            title='Xác nhận'
            message='Bạn có chắc chắn muốn đăng xuất không?'
            onPressCancel={() => setIsVisible(false)}
            onPressConfirm={handleLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Information;