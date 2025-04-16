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

const DetailStatusCancelled: React.FC = () => {
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
        <View style={IndexStyles.StyleDetailCancelled.container}>
            <View style={IndexStyles.StyleDetailCancelled.viewheader}>
                <View style={IndexStyles.StyleDetailCancelled.headerTitle}>
                    <CustomHeader title='Thông tin đơn hủy' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
                <View style={IndexStyles.StyleDetailCancelled.containerBody}>
                    <View style={IndexStyles.StyleDetailCancelled.viewPayment}>
                        <View style={IndexStyles.StyleDetailCancelled.viewPaymentPending}>
                            <Text style={IndexStyles.StyleDetailCancelled.textPayment}>{item.paymentStatus}</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textPayment}>{payment}</Text>
                        </View>
                        <Icon.PaymentCancellSVG width={45} height={45} fill='white' />
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewShipper}>
                        <View style={IndexStyles.StyleDetailCancelled.viewShipperTitle}>
                            <Icon.WaitShipperSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailCancelled.textShippertTitle}>Thông tin vận chuyển</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailCancelled.textShipper}>Đơn hàng vận chuyển sẽ được bên shop liên hệ để vận chuyển giao tới</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewAddress}>
                        <View style={IndexStyles.StyleDetailCancelled.viewAddressTitle}>
                            <Icon.LocationSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailCancelled.textAddressTitle}>Địa chỉ giao hàng</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.shippingAddress.province + ', ' + item.shippingAddress.district + ', ' + item.shippingAddress.ward + ', ' + item.shippingAddress.houseNumber)}>
                                <Text style={IndexStyles.StyleDetailCancelled.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailCancelled.viewAddressContent}>
                            <Text style={IndexStyles.StyleDetailCancelled.textAddressContent}>{item.shippingAddress.name}</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textAddressContent}>{item.shippingAddress.phone}</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textAddressContent}>{item.shippingAddress.houseNumber}, {item.shippingAddress.district}, {item.shippingAddress.ward}, {item.shippingAddress.province}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewCart}>
                        <View style={IndexStyles.StyleDetailCancelled.viewCartTitle}>
                            <Icon.ShoppingCartSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailCancelled.textCartTitle}>ShopApple</Text>
                        </View>
                        {item.products.map((value: any, index: number) => (
                            <View key={index} style={IndexStyles.StyleDetailCancelled.viewCartContent}>
                                <Image source={{ uri: value.priceColor.image }} style={IndexStyles.StyleDetailCancelled.imageCartContent} />
                                <View style={IndexStyles.StyleDetailCancelled.viewCartInfor}>
                                    <Text style={IndexStyles.StyleDetailCancelled.textCartContent}>{value.name} {value.model} {value.storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailCancelled.textCartContent}>{value.priceColor.color}</Text>
                                        <Text style={IndexStyles.StyleDetailCancelled.textCartContent}>x{value.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailCancelled.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StyleDetailCancelled.textCartContent}>{FormatPrice(value.priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewTotal}>
                        <View style={IndexStyles.StyleDetailCancelled.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotalTitle}>Tổng tiền hàng</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotal}>{FormatPrice(item.products.reduce((total: number, value: any) => total + value.priceColor.price * value.quantity, 0))}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailCancelled.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotalTitle}>Phí vận chuyển</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotal}>{FormatPrice(item.shippingFee)}</Text>
                        </View>
                        {item.voucher ? (
                            <View style={IndexStyles.StyleDetailCancelled.viewTotalTitle}>
                                <Text style={IndexStyles.StyleDetailCancelled.textTotalTitle}>ShopApple Voucher</Text>
                                <Text style={IndexStyles.StyleDetailCancelled.textTotal}>-{item.voucher}</Text>
                            </View>
                        ) : null}
                        <View style={IndexStyles.StyleDetailCancelled.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotalTitle}>Thành tiền</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textTotal}>{FormatPriceVND2(item.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewPaymentMethod}>
                        <View style={IndexStyles.StyleDetailCancelled.viewPaymentMethodTitle}>
                            <Icon.PaymentSVG width={25} height={25} fill='red' />
                            <Text style={IndexStyles.StyleDetailCancelled.textPaymentMethodTitle}>Phương thức thanh toán</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailCancelled.textPaymentMethod}>Đơn hàng này bạn đang thanh toán bằng {item.paymentMethod}</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailCancelled.viewOrderCode}>
                        <View style={IndexStyles.StyleDetailCancelled.viewOrderCodeTitle}>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCodeTitle}>Mã đơn hàng</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textCode}>{item.orderCode}</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.orderCode)}>
                                <Text style={IndexStyles.StyleDetailCancelled.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailCancelled.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>Mã thanh toán {item.paymentMethod}</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>{item.paymentCode}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailCancelled.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>Ngày đặt hàng:</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>{FormatDate3(item.createdAt)}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailCancelled.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>Ngày hủy hàng:</Text>
                            <Text style={IndexStyles.StyleDetailCancelled.textOrderCode}>{FormatDate3(item.canceledAt)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={IndexStyles.StyleDetailCancelled.viewButton}>
                <Text style={IndexStyles.StyleDetailCancelled.textButton}>Mua hàng tiếp</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailStatusCancelled