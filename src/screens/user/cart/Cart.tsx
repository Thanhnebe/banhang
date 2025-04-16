import { View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon } from '../../../constant/Icon'
import { IndexStyles } from '../../../import/IndexStyles';

import useStatusBarConfig from '../../../utils/UseStatusBarConfig'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useGetCartByUserQuery } from '../../../service/Api/IndexCart';
import { useAppSelector, useAppDispatch } from '../../../import/IndexFeatures';
import { decrementItemCount } from '../../../redux/slices/CountCartSlice';

import { ItemListCart, CustomCheckBox, CustomHeader } from '../../../import/IndexComponent';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FormatPrice } from '../../../utils/FormatPrice';

import LinearGradient from 'react-native-linear-gradient';
import ToastMessage from '../../../utils/ToastMessage';
import { Responsive } from '../../../constant/Responsive';

const Cart: React.FC = () => {

  useStatusBarConfig('dark-content', 'transparent', true)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.root.Auth.user._id)

  const { data, isLoading } = useGetCartByUserQuery(user)

  const dataCart = (data?.data ?? []).filter(item => item.status === 'giỏ hàng' && item.status != null);

  const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [selectAll, setSelectAll] = useState<boolean>(false);

  const shipper = selectedItems.length > 0 ? '22.500đ' : '0đ'

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };

  if (isLoading) {
    return (
      <View style={IndexStyles.StyleCart.containerLoading}>
        <ActivityIndicator size='large' color='red' />
      </View>
    )
  }

  let total = 0
  dataCart.forEach(item => {
    if (selectedItems.includes(item._id)) {
      total += item.products.priceColor.price * item.quantity
    }
  })

  if (dataCart.length === 0) {
    return (
      <View style={IndexStyles.StyleCart.container}>
        <View style={IndexStyles.StyleCart.viewheader}>
          <View style={IndexStyles.StyleCart.headerSmall}>
            <CustomHeader title='Giỏ hàng của bạn' color='#fff' />
          </View>
        </View>
        <View style={IndexStyles.StyleCart.viewEmpty}>
          <Image source={Icon.NoCarts} style={IndexStyles.StyleCart.imageEmpty} />
          <Text style={IndexStyles.StyleCart.textEmpty}>Giỏ hàng của bạn đang trống</Text>
          <TouchableOpacity style={IndexStyles.StyleCart.buttonEmpty} onPress={() => navigation.goBack()}>
            <Text style={IndexStyles.StyleCart.textButtonEmpty}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={IndexStyles.StyleCart.container}>
      <View style={IndexStyles.StyleCart.viewheader}>
        <View style={IndexStyles.StyleCart.headerSmall}>
          <CustomHeader title='Giỏ hàng của bạn' color='#fff' />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: Responsive.hp(10) }}
        showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => { }} />
        }>
        <View style={IndexStyles.StyleCart.containerBody}>
          {dataCart.map((item) => (
            <ItemListCart
              key={item._id}
              item={item}
              navigation={navigation}
              currentlyOpenSwipeable={currentlyOpenSwipeable}
              decrementItemCount={decrementItemCount}
              dispatch={dispatch}
              isSelected={selectedItems.includes(item._id)}
              onItemSelect={handleItemSelect}
            />
          ))
          }
        </View>
      </ScrollView>
      {dataCart.length > 0 && (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={IndexStyles.StyleCart.viewButton} >
            <View style={IndexStyles.StyleCart.checkbox}>
              <CustomCheckBox
                checked={selectAll}
                onPress={() => {
                  setSelectAll(!selectAll);
                  if (!selectAll) {
                    setSelectedItems(data?.data.filter(item => item.status === 'giỏ hàng').map(item => item._id) || []);
                  } else {
                    setSelectedItems([]);
                  }
                }}
                title='Tất cả'
              />
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={IndexStyles.StyleCart.textPayment}>Tổng cộng</Text>
                <Text style={IndexStyles.StyleCart.textTotal}>{FormatPrice(total)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={IndexStyles.StyleCart.textShipper}>Phí vận chuyển</Text>
                <Text style={IndexStyles.StyleCart.textTotalShipper}>{shipper}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {
              if (selectedItems.length === 0) {
                ToastMessage('error', 'Bạn chưa có sản phẩm nào để thanh toán')
              } else {
                navigation.navigate('StackMisc', { screen: 'PaymentOrders', params: { id: selectedItems, shipper } });
                setSelectedItems([]);
                setSelectAll(false);
              }
            }} >
              <LinearGradient colors={['#ff5d00', '#ff00a5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={IndexStyles.StyleCart.viewPayment}>
                <Text style={IndexStyles.StyleCart.textButton}>Thanh toán({selectedItems.length})</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default Cart