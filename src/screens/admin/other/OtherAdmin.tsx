import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useStatusBarConfig from '../../../utils/UseStatusBarConfig';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../import/IndexFeatures';

import { HandleRemoveFcmToken } from '../../../service/Api/IndexUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../../redux/slices/Auth.Slice';

import StyleOtherAdmin from './StyleOtherAdmin';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../../constant/Icon';
import { CustomModalConfirm, renderInformationItem } from '../../../import/IndexComponent';

import { useGetAllOrderForAdminQuery } from '../../../service/Api/Index.Order';
import ToastMessage from '../../../utils/ToastMessage';

const OtherAdmin: React.FC = () => {
  useStatusBarConfig('dark-content', 'transparent', true)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const dispatch = useAppDispatch()

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const isLoggedIn = useAppSelector(state => state.root.Auth)

  const { data, isLoading } = useGetAllOrderForAdminQuery()

  const lenghtOrder = data?.data.length

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
      setIsVisible(false);
      await handleRemoveToken();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={StyleOtherAdmin.container}>
        <LinearGradient colors={['#EB5A65', '#EB5A65', '#EB5A65']} style={StyleOtherAdmin.viewheader}>
          <TouchableOpacity style={StyleOtherAdmin.headerTitle} onPress={() => navigation.navigate('StackAdminManagerOther', { screen: 'EditProfileAdmin' } as any)}>
            {isLoggedIn.user.photoUrl
              ? <Image source={{ uri: isLoggedIn.user.photoUrl }} style={StyleOtherAdmin.image} />
              : <Icon.AvatarSVG width={50} height={50} fill='#FFFFFF' />
            }
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text style={StyleOtherAdmin.textheader1}>Nguyễn Xuân Hoàng</Text>
              <Text style={StyleOtherAdmin.textheader3}>Bạn có {lenghtOrder} đơn hàng hãy kiểm tra</Text>
              <Text style={StyleOtherAdmin.textheader2}>Tài khoản admin</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={StyleOtherAdmin.containerBody}>
          <View>
            {renderInformationItem({ text: 'Quản lý điểm', image: Icon.POINTS, onPress: () => ToastMessage('info', 'Chức năng đang phát triển') })}
            {renderInformationItem({ text: 'Thông tin cá nhân', image: Icon.INFOR, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'EditProfileAdmin' } as any) })}
            {renderInformationItem({ text: 'Quản lý khách hàng', image: Icon.ADDRESS, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'ManagerCustomerAdmin' } as any) })}
            {renderInformationItem({ text: 'Đổi mật khẩu', image: Icon.CHANGEPASSWORD, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'ChangePasswordAdmin' } as any) })}
            {renderInformationItem({ text: 'Quản lý đánh giá khách hàng', image: Icon.FEEDBACK, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'EvaluateAdmin' } as any) })}
            {renderInformationItem({ text: 'Trò chuyện với khách hàng', image: Icon.CHATWITHSHOP, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'ListCustomerChat' } as any) })}
            {renderInformationItem({ text: 'Liên hệ và góp ý', image: Icon.CONTACT, onPress: () => navigation.navigate('StackAdminManagerOther', { screen: 'ContactFeedbackAdmin' } as any) })}
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

export default OtherAdmin;