import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'

import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';
import { Icon } from '../../../../../constant/Icon';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { IndexStyles } from '../../../../../import/IndexStyles';

import { Responsive } from '../../../../../constant/Responsive';
import { useGetOrderUserQuery } from '../../../../../service/Api/Index.Order';
import { useAppSelector } from '../../../../../features/redux/ReduxHook';
import { FormatPrice, FormatPriceVND2 } from '../../../../../utils/FormatPrice';
import { ScrollView } from 'react-native-gesture-handler';

const SearchOrder: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [search, setSearch] = useState<string>('')

    const user = useAppSelector(state => state.root.Auth.user._id)

    const { data } = useGetOrderUserQuery(user)

    const searchOrder = data?.data.filter((item) => {
        if (item.status !== 'Đã giao') {
            return false;
        }

        return item.orderCode.toLowerCase().includes(search.toLowerCase()) ||
            item._id.toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase()) ||
            item.paymentStatus.toLowerCase().includes(search.toLowerCase()) ||
            item.products.find((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }) || [];

    const payment = 'Giao hàng thành công, cảm ơn bạn đã mua hàng tại shop.';

    return (
        <View style={IndexStyles.StyleSearchOrder.container}>
            <View style={IndexStyles.StyleSearchOrder.viewheader}>
                <CustomHeader title='Tìm kiếm đơn hàng' color='red' fontSize={Responsive.RFPercentage(2.3)} />
                <TouchableOpacity onPress={() => navigation.navigate('StackIndividual' as any, { screen: 'ChatWithAdmin' })}>
                    <Icon.ChatSVG width={28} height={28} fill='red' />
                </TouchableOpacity>
            </View>
            <View style={IndexStyles.StyleSearchOrder.viewinput}>
                <InputCustom
                    placeholder='Tìm kiếm theo tên đơn, mã, id đơn...'
                    placeholderTextColor='#000000'
                    keyboardType='default'
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    style={IndexStyles.StyleSearchOrder.input}
                    icon={<Icon.SearchSVG width={20} height={20} fill='red' />}
                />
            </View>
            <ScrollView>
                <View style={IndexStyles.StyleSearchOrder.containerBody}>
                    {search.length > 0 && searchOrder.length > 0 ? (
                        searchOrder.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={IndexStyles.StyleSearchOrder.containerItem} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item._id, payment: payment } })}>
                                    <View style={IndexStyles.StyleSearchOrder.viewText}>
                                        <View style={IndexStyles.StyleSearchOrder.viewIcon}>
                                            <Icon.StoreSVG width={25} height={25} />
                                            <Text style={IndexStyles.StyleSearchOrder.textShop}>ShopApple</Text>
                                        </View>
                                        <Text style={IndexStyles.StyleSearchOrder.textStatus}>{item.paymentStatus}</Text>
                                    </View>
                                    <View style={IndexStyles.StyleSearchOrder.viewCart}>
                                        <View style={IndexStyles.StyleSearchOrder.viewImagge}>
                                            <Image source={{ uri: item.products[0].priceColor.image }} style={IndexStyles.StyleSearchOrder.image} />
                                        </View>
                                        <View style={IndexStyles.StyleSearchOrder.viewInfor}>
                                            <Text style={IndexStyles.StyleSearchOrder.textInfor}>{item.products[0].name} {item.products[0].model} {item.products[0].storage}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={IndexStyles.StyleSearchOrder.textInfor}>{item.products[0].priceColor.color}</Text>
                                                <Text style={IndexStyles.StyleSearchOrder.textQuantity}>x{item.products[0].quantity}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(10) }}>
                                                <Text style={IndexStyles.StyleSearchOrder.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                                <Text style={IndexStyles.StyleSearchOrder.textPrice}>{FormatPrice(item.products[0].priceColor.price)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={IndexStyles.StyleSearchOrder.line} />
                                    {item.products.length > 1 ? (
                                        <TouchableOpacity onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item._id, payment: payment } })}>
                                            <Text style={IndexStyles.StyleSearchOrder.textMoreProducts}>Xem thêm sản phẩm</Text>
                                            <View style={IndexStyles.StyleSearchOrder.line} />
                                        </TouchableOpacity>
                                    ) : null}
                                    <View style={IndexStyles.StyleSearchOrder.viewLengthCart}>
                                        <Text style={IndexStyles.StyleSearchOrder.textLengthCart}>{item.products.length} sản phẩm</Text>
                                        <Text style={IndexStyles.StyleSearchOrder.textTotal}>Tổng thanh toán: {FormatPriceVND2(item.totalAmount)}</Text>
                                    </View>
                                    <View style={IndexStyles.StyleSearchOrder.line} />
                                    {item.paymentStatus === "Chờ thanh toán" && item.status === "Chờ xác nhận" ? (
                                        <View style={IndexStyles.StyleSearchOrder.viewPayment}>
                                            <TouchableOpacity style={IndexStyles.StyleSearchOrder.viewButton}>
                                                <Text style={IndexStyles.StyleSearchOrder.textButton}>Thanh toán ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : item.paymentStatus === "Đã thanh toán" ? (
                                        <View style={IndexStyles.StyleSearchOrder.viewPayment}>
                                            <TouchableOpacity style={IndexStyles.StyleSearchOrder.viewButton}>
                                                <Text style={IndexStyles.StyleSearchOrder.textButton}>Đã thanh toán</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={IndexStyles.StyleSearchOrder.viewPayment}>
                                            <TouchableOpacity style={IndexStyles.StyleSearchOrder.viewButton} >
                                                <Text style={IndexStyles.StyleSearchOrder.textButton}>Mua lại</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        search.length > 0 && (
                            <View>
                                <Text style={IndexStyles.StyleSearchOrder.textNotFound}>Không tìm thấy đơn hàng</Text>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default SearchOrder