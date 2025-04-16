import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { CustomHeader } from '../../../../../../import/IndexComponent'

import { IndexStyles } from '../../../../../../import/IndexStyles'
import { Icon } from '../../../../../../constant/Icon'
import { useRoute, RouteProp } from '@react-navigation/native'

import { useGetDetailOrderQuery } from '../../../../../../service/Api/Index.Order'
import { FormatPrice, FormatPriceVND2 } from '../../../../../../utils/FormatPrice'
import { ScrollView } from 'react-native-gesture-handler'

import { FormatDate3 } from '../../../../../../utils/FormatDate'
import Clipboard from '@react-native-clipboard/clipboard'

type RootStackParamList = {
    DetailOrder: {
        id: string,
        payment: string
    }
}

const DetailStatusDelivered: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'DetailOrder'>>()

    const { id, payment } = route.params

    const { data, isLoading } = useGetDetailOrderQuery(id)

    const item = data?.data || [] as any

    if (isLoading) {
        return (
            <View style={IndexStyles.StyleDetailArticle.loading}>
                <ActivityIndicator size="large" color='black' />
            </View>
        )
    }

    return (
        <View style={IndexStyles.StyleDetailStatusDelivered.container}>
            <View style={IndexStyles.StyleDetailStatusDelivered.viewheader}>
                <View style={IndexStyles.StyleDetailStatusDelivered.headerTitle}>
                    <CustomHeader title='Thông tin đơn hàng' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
                <View style={IndexStyles.StyleDetailStatusDelivered.containerBody}>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewPayment}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewPaymentPending}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textPayment}>{item.paymentStatus}</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textPayment}>{payment}</Text>
                        </View>
                        <Icon.WaitShipperSVG width={45} height={45} fill='white' />
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewShipper}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewShipperTitle}>
                            <Icon.WaitShipperSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textShippertTitle}>Thông tin vận chuyển</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailStatusDelivered.textShipper}>Đơn hàng của bạn đang được giao tới, vui lòng để ý điện thoại.</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewAddress}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewAddressTitle}>
                            <Icon.LocationSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textAddressTitle}>Địa chỉ giao hàng</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.shippingAddress.province + ', ' + item.shippingAddress.district + ', ' + item.shippingAddress.ward + ', ' + item.shippingAddress.houseNumber)}>
                                <Text style={IndexStyles.StyleDetailStatusDelivered.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewAddressContent}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textAddressContent}>{item.shippingAddress.name}</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textAddressContent}>{item.shippingAddress.phone}</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textAddressContent}>{item.shippingAddress.houseNumber}, {item.shippingAddress.district}, {item.shippingAddress.ward}, {item.shippingAddress.province}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewCart}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewCartTitle}>
                            <Icon.ShoppingCartSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textCartTitle}>ShopApple</Text>
                        </View>
                        {item.products.map((value: any, index: number) => (
                            <View key={index} style={IndexStyles.StyleDetailStatusDelivered.viewCartContent}>
                                <Image source={{ uri: value.priceColor.image }} style={IndexStyles.StyleDetailStatusDelivered.imageCartContent} />
                                <View style={IndexStyles.StyleDetailStatusDelivered.viewCartInfor}>
                                    <Text style={IndexStyles.StyleDetailStatusDelivered.textCartContent}>{value.name} {value.model} {value.storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailStatusDelivered.textCartContent}>{value.priceColor.color}</Text>
                                        <Text style={IndexStyles.StyleDetailStatusDelivered.textCartContent}>x{value.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailStatusDelivered.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StyleDetailStatusDelivered.textCartContent}>{FormatPrice(value.priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewTotal}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotalTitle}>Tổng tiền hàng</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotal}>{FormatPrice(item.products.reduce((total: number, value: any) => total + value.priceColor.price * value.quantity, 0))}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotalTitle}>Phí vận chuyển</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotal}>{FormatPrice(item.shippingFee)}</Text>
                        </View>
                        {item.voucher ? (
                            <View style={IndexStyles.StyleDetailStatusDelivered.viewTotalTitle}>
                                <Text style={IndexStyles.StyleDetailStatusDelivered.textTotalTitle}>ShopApple Voucher</Text>
                                <Text style={IndexStyles.StyleDetailStatusDelivered.textTotal}>-{item.voucher}</Text>
                            </View>
                        ) : null}
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotalTitle}>Thành tiền</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textTotal}>{FormatPriceVND2(item.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewPaymentMethod}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewPaymentMethodTitle}>
                            <Icon.PaymentSVG width={25} height={25} fill='red' />
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textPaymentMethodTitle}>Phương thức thanh toán</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailStatusDelivered.textPaymentMethod}>Đơn hàng này bạn đang thanh toán bằng {item.paymentMethod}</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailStatusDelivered.viewOrderCode}>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewOrderCodeTitle}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCodeTitle}>Mã đơn hàng</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textCode}>{item.orderCode}</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.orderCode)}>
                                <Text style={IndexStyles.StyleDetailStatusDelivered.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>Mã thanh toán {item.paymentMethod}</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>{item.paymentCode}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>Ngày đặt hàng:</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>{FormatDate3(item.createdAt)}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailStatusDelivered.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>Ngày giao hàng:</Text>
                            <Text style={IndexStyles.StyleDetailStatusDelivered.textOrderCode}>{FormatDate3(item.deliveredAt)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailStatusDelivered