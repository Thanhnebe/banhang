import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react'
import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'

import { CustomHeader, InputCustom } from '../../../../import/IndexComponent';
import { Icon } from '../../../../constant/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { Responsive } from '../../../../constant/Responsive';
import StyleSearchOrderAdmin from './StyleSearchOrderAdmin';

import { useGetOrderUserQuery, useGetAllOrderForAdminQuery } from '../../../../service/Api/Index.Order';
import { useAppSelector } from '../../../../features/redux/ReduxHook';
import { FormatPrice, FormatPriceVND2 } from '../../../../utils/FormatPrice';

import { ScrollView } from 'react-native-gesture-handler';

const SearchOrderAdmin: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [search, setSearch] = useState<string>('')


    const { data } = useGetAllOrderForAdminQuery()

    const searchOrder = data?.data.filter((item) => {
        return item.orderCode.toLowerCase().includes(search.toLowerCase()) ||
            item._id.toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase()) ||
            item.paymentStatus.toLowerCase().includes(search.toLowerCase()) ||
            item.products.find((product) => product.name.toLowerCase().includes(search.toLowerCase())) ||
            item.products.find((product) => product.model.toLowerCase().includes(search.toLowerCase())) ||
            item.products.find((product) => product.storage.toLowerCase().includes(search.toLowerCase())) ||
            item.products.find((product) => product.priceColor.color.toLowerCase().includes(search.toLowerCase()));
    }) || [];

    const payment = 'Giao hàng thành công, cảm ơn bạn đã mua hàng tại shop.';

    return (
        <View style={StyleSearchOrderAdmin.container}>
            <View style={StyleSearchOrderAdmin.viewheader}>
                <CustomHeader title='Tìm kiếm đơn hàng' color='red' fontSize={Responsive.RFPercentage(2.3)} />
                <TouchableOpacity onPress={() => navigation.navigate('StackIndividual' as any, { screen: 'ChatWithAdmin' })}>
                    <Icon.ChatSVG width={28} height={28} fill='red' />
                </TouchableOpacity>
            </View>
            <View style={StyleSearchOrderAdmin.viewinput}>
                <InputCustom
                    placeholder='Tìm kiếm theo tên đơn, mã, id đơn...'
                    placeholderTextColor='#000000'
                    keyboardType='default'
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    style={StyleSearchOrderAdmin.input}
                    icon={<Icon.SearchSVG width={20} height={20} fill='red' />}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={StyleSearchOrderAdmin.containerBody}>
                    {search.length > 0 && searchOrder.length > 0 ? (
                        searchOrder.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={StyleSearchOrderAdmin.containerItem} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item._id, payment: payment } })}>
                                    <View style={StyleSearchOrderAdmin.viewText}>
                                        <View style={StyleSearchOrderAdmin.viewIcon}>
                                            <Icon.StoreSVG width={25} height={25} />
                                            <Text style={StyleSearchOrderAdmin.textShop}>ShopApple</Text>
                                        </View>
                                        <Text style={StyleSearchOrderAdmin.textStatus}>{item.paymentStatus}</Text>
                                    </View>
                                    <View style={StyleSearchOrderAdmin.viewCart}>
                                        <View style={StyleSearchOrderAdmin.viewImagge}>
                                            <Image source={{ uri: item.products[0].priceColor.image }} style={StyleSearchOrderAdmin.image} />
                                        </View>
                                        <View style={StyleSearchOrderAdmin.viewInfor}>
                                            <Text style={StyleSearchOrderAdmin.textInfor}>{item.products[0].name} {item.products[0].model} {item.products[0].storage}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={StyleSearchOrderAdmin.textInfor}>{item.products[0].priceColor.color}</Text>
                                                <Text style={StyleSearchOrderAdmin.textQuantity}>x{item.products[0].quantity}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(10) }}>
                                                <Text style={StyleSearchOrderAdmin.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                                <Text style={StyleSearchOrderAdmin.textPrice}>{FormatPrice(item.products[0].priceColor.price)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={StyleSearchOrderAdmin.line} />
                                    {item.products.length > 1 ? (
                                        <TouchableOpacity onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item._id, payment: payment } })}>
                                            <Text style={StyleSearchOrderAdmin.textMoreProducts}>Xem thêm sản phẩm</Text>
                                            <View style={StyleSearchOrderAdmin.line} />
                                        </TouchableOpacity>
                                    ) : null}
                                    <View style={StyleSearchOrderAdmin.viewLengthCart}>
                                        <Text style={StyleSearchOrderAdmin.textLengthCart}>{item.products.length} sản phẩm</Text>
                                        <Text style={StyleSearchOrderAdmin.textTotal}>Tổng thanh toán: {FormatPriceVND2(item.totalAmount)}</Text>
                                    </View>
                                    <View style={StyleSearchOrderAdmin.line} />
                                    {item.paymentStatus === "Chờ thanh toán" && item.status === "Chờ xác nhận" ? (
                                        <View style={StyleSearchOrderAdmin.viewPayment}>
                                            <TouchableOpacity style={StyleSearchOrderAdmin.viewButton}>
                                                <Text style={StyleSearchOrderAdmin.textButton}>Thanh toán ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : item.paymentStatus === "Đã thanh toán" ? (
                                        <View style={StyleSearchOrderAdmin.viewPayment}>
                                            <TouchableOpacity style={StyleSearchOrderAdmin.viewButton}>
                                                <Text style={StyleSearchOrderAdmin.textButton}>Đã thanh toán</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={StyleSearchOrderAdmin.viewPayment}>
                                            <TouchableOpacity style={StyleSearchOrderAdmin.viewButton} >
                                                <Text style={StyleSearchOrderAdmin.textButton}>Mua lại</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        search.length > 0 && (
                            <View style={StyleSearchOrderAdmin.viewNotFound}>
                                <Image source={Icon.NOSEARCHORDER} style={StyleSearchOrderAdmin.imageNotFound} />
                                <Text style={StyleSearchOrderAdmin.textNotFound}>Không tìm thấy đơn hàng</Text>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default SearchOrderAdmin