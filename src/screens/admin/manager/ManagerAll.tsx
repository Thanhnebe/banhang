import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import useStatusBarConfig from '../../../utils/UseStatusBarConfig'
import { CustomHeader } from '../../../import/IndexComponent'
import StyleAll from './StyleAll'
import { Icon } from '../../../constant/Icon'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const ManagerAll: React.FC = () => {
  useStatusBarConfig('dark-content', 'transparent', true)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <View style={StyleAll.container}>
      <View style={StyleAll.viewheader}>
        <View style={StyleAll.headerTitle}>
          <CustomHeader title='Quản lý danh mục' color='red' />
        </View>
      </View>
      <View style={StyleAll.containerBody}>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListProducts' })}>
          <Image source={Icon.PRODUCTADMIN} style={StyleAll.image} />
          <Text style={StyleAll.textTitle}>Quản lý sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListCategories' })}>
          <Image source={Icon.CATEGORYADMIN} style={StyleAll.image} />
          <Text style={StyleAll.textTitle}>Quản lý danh mục sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListBanner' })}>
          <Image source={Icon.BANNERADMIN} style={StyleAll.image} />
          <Text style={StyleAll.textTitle}>Quản lý quảng cáo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListVouchers' })}>
          <Icon.VoucherSVG width={50} height={50} fill='red' />
          <Text style={StyleAll.textTitle}>Quản lý voucher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListNotifications' })}>
          <Image source={Icon.CUSTOMERADMIN} style={StyleAll.image} />
          <Text style={StyleAll.textTitle}>Quản lý thông báo, sự kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleAll.viewTab}
          onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'ListCustomers' })}>
          <Image source={Icon.CUSTOMERADMIN} style={StyleAll.image} />
          <Text style={StyleAll.textTitle}>Quản lý Khách hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ManagerAll