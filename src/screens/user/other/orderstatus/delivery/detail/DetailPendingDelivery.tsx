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

const DetailPendingDelivery: React.FC = () => {

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
        <View style={IndexStyles.StyleDetailPendingDelivey.container}>
            <View style={IndexStyles.StyleDetailPendingDelivey.viewheader}>
                <View style={IndexStyles.StyleDetailPendingDelivey.headerTitle}>
                    <CustomHeader title='Thông tin đơn giao hàng' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
                <View style={IndexStyles.StyleDetailPendingDelivey.containerBody}>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewPayment}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewPaymentPending}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textPayment}>{item.paymentStatus}</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textPayment}>{payment}</Text>
                        </View>
                        <Icon.WaitShipperSVG width={45} height={45} fill='white' />
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewShipper}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewShipperTitle}>
                            <Icon.WaitShipperSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textShippertTitle}>Thông tin vận chuyển</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailPendingDelivey.textShipper}>Đơn hàng của bạn đang được giao tới, vui lòng để ý điện thoại.</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewAddress}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewAddressTitle}>
                            <Icon.LocationSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textAddressTitle}>Địa chỉ giao hàng</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.shippingAddress.province + ', ' + item.shippingAddress.district + ', ' + item.shippingAddress.ward + ', ' + item.shippingAddress.houseNumber)}>
                                <Text style={IndexStyles.StyleDetailPendingDelivey.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewAddressContent}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textAddressContent}>{item.shippingAddress.name}</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textAddressContent}>{item.shippingAddress.phone}</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textAddressContent}>{item.shippingAddress.houseNumber}, {item.shippingAddress.district}, {item.shippingAddress.ward}, {item.shippingAddress.province}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewCart}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewCartTitle}>
                            <Icon.ShoppingCartSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textCartTitle}>ShopApple</Text>
                        </View>
                        {item.products.map((value: any, index: number) => (
                            <View key={index} style={IndexStyles.StyleDetailPendingDelivey.viewCartContent}>
                                <Image source={{ uri: value.priceColor.image }} style={IndexStyles.StyleDetailPendingDelivey.imageCartContent} />
                                <View style={IndexStyles.StyleDetailPendingDelivey.viewCartInfor}>
                                    <Text style={IndexStyles.StyleDetailPendingDelivey.textCartContent}>{value.name} {value.model} {value.storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailPendingDelivey.textCartContent}>{value.priceColor.color}</Text>
                                        <Text style={IndexStyles.StyleDetailPendingDelivey.textCartContent}>x{value.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailPendingDelivey.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StyleDetailPendingDelivey.textCartContent}>{FormatPrice(value.priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewTotal}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotalTitle}>Tổng tiền hàng</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotal}>{FormatPrice(item.products.reduce((total: number, value: any) => total + value.priceColor.price * value.quantity, 0))}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotalTitle}>Phí vận chuyển</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotal}>{FormatPrice(item.shippingFee)}</Text>
                        </View>
                        {item.voucher ? (
                            <View style={IndexStyles.StyleDetailPendingDelivey.viewTotalTitle}>
                                <Text style={IndexStyles.StyleDetailPendingDelivey.textTotalTitle}>ShopApple Voucher</Text>
                                <Text style={IndexStyles.StyleDetailPendingDelivey.textTotal}>-{item.voucher}</Text>
                            </View>
                        ) : null}
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotalTitle}>Thành tiền</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textTotal}>{FormatPriceVND2(item.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewPaymentMethod}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewPaymentMethodTitle}>
                            <Icon.PaymentSVG width={25} height={25} fill='red' />
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textPaymentMethodTitle}>Phương thức thanh toán</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailPendingDelivey.textPaymentMethod}>Đơn hàng này bạn đang thanh toán bằng {item.paymentMethod}</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailPendingDelivey.viewOrderCode}>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewOrderCodeTitle}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCodeTitle}>Mã đơn hàng</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textCode}>{item.orderCode}</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.orderCode)}>
                                <Text style={IndexStyles.StyleDetailPendingDelivey.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>Mã thanh toán {item.paymentMethod}</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>{item.paymentCode}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>Ngày đặt hàng:</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>{FormatDate3(item.createdAt)}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailPendingDelivey.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>Ngày giao hàng:</Text>
                            <Text style={IndexStyles.StyleDetailPendingDelivey.textOrderCode}>{FormatDate3(item.deliveredAt)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailPendingDelivery