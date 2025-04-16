import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { CustomHeader } from '../../../../../import/IndexComponent'

import { IndexStyles } from '../../../../../import/IndexStyles'
import { Icon } from '../../../../../constant/Icon'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { useGetDetailOrderQuery, useUpdateOrderMutation } from '../../../../../service/Api/Index.Order'
import { useResetUsageMutation } from '../../../../../service/Api/Index.Voucher'
import { FormatPrice, FormatPriceVND2 } from '../../../../../utils/FormatPrice'

import { ScrollView } from 'react-native-gesture-handler'
import { FormatDate3 } from '../../../../../utils/FormatDate'
import Clipboard from '@react-native-clipboard/clipboard'

import ToastMessage from '../../../../../utils/ToastMessage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../../../import/IndexFeatures'

type RootStackParamList = {
    DetailOrder: {
        id: string,
        payment: string
    }
}

const DetailOrder: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const route = useRoute<RouteProp<RootStackParamList, 'DetailOrder'>>()

    const { id, payment } = route.params

    const { data, isLoading } = useGetDetailOrderQuery(id)

    const item = data?.data || [] as any

    const [updateOrder] = useUpdateOrderMutation()

    const [resetUsage] = useResetUsageMutation()

    const handleCancelUpdateOrder = async () => {
        try {
            const response = await updateOrder({ id: item._id, data: { status: 'Đã hủy', canceledAt: new Date() } })
            if (response.data) {
                if (item.voucher) {
                    handleUpdateVoucher()
                    navigation.goBack()
                }
            } else {
                ToastMessage('error', 'Cập nhật đơn hàng không thành công')
            }
        } catch (error: any) {
            console.log("🚀 ~ handleUpdateOrder ~ error:", error)
        }
    }

    const handleUpdateVoucher = async () => {
        try {
            const body = {
                id: item.voucher._id,
                userId: item.user
            }
            const response = await resetUsage(body)
            if (response.data) {
                console.log("🚀 ~ handleUpdateVoucher ~ response:", response)
            } else {
                console.log("🚀 ~ handleUpdateVoucher ~ response:", response)
            }
        } catch (error: any) {
            console.log("🚀 ~ handleUpdateVoucher ~ error:", error)
        }
    }

    if (isLoading) {
        return (
            <View style={IndexStyles.StyleDetailArticle.loading}>
                <ActivityIndicator size="large" color='black' />
            </View>
        )
    }

    return (
        <View style={IndexStyles.StyleDetailOrder.container}>
            <View style={IndexStyles.StyleDetailOrder.viewheader}>
                <View style={IndexStyles.StyleDetailOrder.headerTitle}>
                    <CustomHeader title='Thông tin xác nhận ' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
                <View style={IndexStyles.StyleDetailOrder.containerBody}>
                    {item.paymentStatus === 'Chờ thanh toán' ? (
                        <View style={IndexStyles.StyleDetailOrder.viewPayment}>
                            <View style={IndexStyles.StyleDetailOrder.viewPaymentPending}>
                                <Text style={IndexStyles.StyleDetailOrder.textPayment}>{item.paymentStatus}</Text>
                                <Text style={IndexStyles.StyleDetailOrder.textPayment}>{payment}</Text>
                            </View>
                            <Icon.PaymentPendingSVG width={45} height={45} fill='white' />
                        </View>
                    ) : (
                        <View style={IndexStyles.StyleDetailOrder.viewPayment}>
                            <View>
                                <Text style={IndexStyles.StyleDetailOrder.textPayment}>Đơn hàng đã thanh toán</Text>
                                <Text style={IndexStyles.StyleDetailOrder.textPayment}>Cảm ơn bạn đã mua hàng tại ShopApple!</Text>
                            </View>
                            <Icon.PaymentSuccessSVG width={45} height={45} fill='white' />
                        </View>
                    )}
                    <View style={IndexStyles.StyleDetailOrder.viewShipper}>
                        <View style={IndexStyles.StyleDetailOrder.viewShipperTitle}>
                            <Icon.WaitShipperSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailOrder.textShippertTitle}>Thông tin vận chuyển</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailOrder.textShipper}>Đơn hàng vận chuyển sẽ được bên shop liên hệ để vận chuyển giao tới</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailOrder.viewAddress}>
                        <View style={IndexStyles.StyleDetailOrder.viewAddressTitle}>
                            <Icon.LocationSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailOrder.textAddressTitle}>Địa chỉ giao hàng</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.shippingAddress.province + ', ' + item.shippingAddress.district + ', ' + item.shippingAddress.ward + ', ' + item.shippingAddress.houseNumber)}>
                                <Text style={IndexStyles.StyleDetailOrder.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailOrder.viewAddressContent}>
                            <Text style={IndexStyles.StyleDetailOrder.textAddressContent}>{item.shippingAddress.name}</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textAddressContent}>{item.shippingAddress.phone}</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textAddressContent}>{item.shippingAddress.houseNumber}, {item.shippingAddress.district}, {item.shippingAddress.ward}, {item.shippingAddress.province}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailOrder.viewCart}>
                        <View style={IndexStyles.StyleDetailOrder.viewCartTitle}>
                            <Icon.ShoppingCartSVG width={25} height={25} fill='black' />
                            <Text style={IndexStyles.StyleDetailOrder.textCartTitle}>ShopApple</Text>
                        </View>
                        {item.products.map((value: any, index: number) => (
                            <View key={index} style={IndexStyles.StyleDetailOrder.viewCartContent}>
                                <Image source={{ uri: value.priceColor.image }} style={IndexStyles.StyleDetailOrder.imageCartContent} />
                                <View style={IndexStyles.StyleDetailOrder.viewCartInfor}>
                                    <Text style={IndexStyles.StyleDetailOrder.textCartContent}>{value.name} {value.model} {value.storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailOrder.textCartContent}>{value.priceColor.color}</Text>
                                        <Text style={IndexStyles.StyleDetailOrder.textCartContent}>x{value.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={IndexStyles.StyleDetailOrder.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StyleDetailOrder.textCartContent}>{FormatPrice(value.priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={IndexStyles.StyleDetailOrder.viewTotal}>
                        <View style={IndexStyles.StyleDetailOrder.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailOrder.textTotalTitle}>Tổng tiền hàng</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textTotal}>{FormatPrice(item.products.reduce((total: number, value: any) => total + value.priceColor.price * value.quantity, 0))}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailOrder.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailOrder.textTotalTitle}>Phí vận chuyển</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textTotal}>{FormatPrice(item.shippingFee)}</Text>
                        </View>
                        {item.voucher ? (
                            <View style={IndexStyles.StyleDetailOrder.viewTotalTitle}>
                                <Text style={IndexStyles.StyleDetailOrder.textTotalTitle}>ShopApple Voucher</Text>
                                <Text style={IndexStyles.StyleDetailOrder.textTotal}>-{FormatPrice(item.voucher.maxDiscountAmount)}</Text>
                            </View>
                        ) : null}
                        <View style={IndexStyles.StyleDetailOrder.viewTotalTitle}>
                            <Text style={IndexStyles.StyleDetailOrder.textTotalTitle}>Thành tiền</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textTotal}>{FormatPriceVND2(item.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleDetailOrder.viewPaymentMethod}>
                        <View style={IndexStyles.StyleDetailOrder.viewPaymentMethodTitle}>
                            <Icon.PaymentSVG width={25} height={25} fill='red' />
                            <Text style={IndexStyles.StyleDetailOrder.textPaymentMethodTitle}>Phương thức thanh toán</Text>
                        </View>
                        <Text style={IndexStyles.StyleDetailOrder.textPaymentMethod}>Đơn hàng này bạn đang thanh toán bằng {item.paymentMethod}</Text>
                    </View>
                    <View style={IndexStyles.StyleDetailOrder.viewOrderCode}>
                        <View style={IndexStyles.StyleDetailOrder.viewOrderCodeTitle}>
                            <Text style={IndexStyles.StyleDetailOrder.textOrderCodeTitle}>Mã đơn hàng</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textCode}>{item.orderCode}</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.orderCode)}>
                                <Text style={IndexStyles.StyleDetailOrder.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleDetailOrder.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailOrder.textOrderCode}>Mã thanh toán {item.paymentMethod}</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textOrderCode}>{item.paymentCode}</Text>
                        </View>
                        <View style={IndexStyles.StyleDetailOrder.viewOrderCodeInfor}>
                            <Text style={IndexStyles.StyleDetailOrder.textOrderCode}>Ngày đặt hàng:</Text>
                            <Text style={IndexStyles.StyleDetailOrder.textOrderCode}>{FormatDate3(item.createdAt)}</Text>
                        </View>
                        {item.paymentStatus === 'Chờ thanh toán' ? (
                            <View style={IndexStyles.StyleDetailOrder.viewPaymentPendingNow}>
                                <TouchableOpacity style={IndexStyles.StyleDetailOrder.viewPaymentNow}>
                                    <Text style={IndexStyles.StyleDetailOrder.textPaymentMethodTitle}>Thanh toán ngay</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={IndexStyles.StyleDetailOrder.viewPaymentNow} onPress={handleCancelUpdateOrder}>
                                    <Text style={IndexStyles.StyleDetailOrder.textPaymentMethodTitle}>Hủy đơn hàng</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={IndexStyles.StyleDetailOrder.viewPaymentPendingNow}>
                                <TouchableOpacity style={IndexStyles.StyleDetailOrder.viewPaymentNow} onPress={() => navigation.navigate('TabHome', { screen: 'HomePage' })}>
                                    <Text style={IndexStyles.StyleDetailOrder.textPaymentMethodTitle}>Tiếp tục mua hàng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={IndexStyles.StyleDetailOrder.viewPaymentNow} onPress={handleCancelUpdateOrder}>
                                    <Text style={IndexStyles.StyleDetailOrder.textPaymentMethodTitle}>Hủy đơn hàng</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailOrder