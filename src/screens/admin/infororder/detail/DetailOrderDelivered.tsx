import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useGetDetailOrderQuery } from '../../../../service/Api/Index.Order'
import { useRoute, RouteProp } from '@react-navigation/native'
import { CustomHeader } from '../../../../import/IndexComponent'
import StyleDetailManagerOder from './StyleDetailManagerOrder'
import { Icon } from '../../../../constant/Icon'
import Clipboard from '@react-native-clipboard/clipboard'
import { FormatPrice, FormatPriceVND2 } from '../../../../utils/FormatPrice'
import { FormatDate3 } from '../../../../utils/FormatDate'
import { ScrollView } from 'react-native-gesture-handler'

type RouteParams = {
    DetailManagerOrder: {
        id: string
    }
}

const DetailOrderDelivered: React.FC = () => {

    const route = useRoute<RouteProp<RouteParams, 'DetailManagerOrder'>>()

    const { data, isLoading } = useGetDetailOrderQuery(route.params.id)

    const item = data?.data || {} as any

    if (isLoading) {
        return (
            <View style={StyleDetailManagerOder.containerLoading}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    return (
        <View style={StyleDetailManagerOder.container}>
            <View style={StyleDetailManagerOder.viewheader}>
                <View style={StyleDetailManagerOder.headerTitle}>
                    <CustomHeader title='Chi tiết đơn hoàn thành' color='red' />
                </View>
            </View>
            <ScrollView>
                <View style={StyleDetailManagerOder.containerBody}>
                    <View style={StyleDetailManagerOder.viewAddress}>
                        <View style={StyleDetailManagerOder.viewAddressTitle}>
                            <Icon.LocationSVG width={25} height={25} fill='black' />
                            <Text style={StyleDetailManagerOder.textAddressTitle}>Địa chỉ giao tới khách</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.shippingAddress.province + ', ' + item.shippingAddress.district + ', ' + item.shippingAddress.ward + ', ' + item.shippingAddress.houseNumber)}>
                                <Text style={StyleDetailManagerOder.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={StyleDetailManagerOder.viewAddressContent}>
                            <Text style={StyleDetailManagerOder.textAddressContent}>{item.shippingAddress.name}</Text>
                            <Text style={StyleDetailManagerOder.textAddressContent}>{item.shippingAddress.phone}</Text>
                            <Text style={StyleDetailManagerOder.textAddressContent}>{item.shippingAddress.houseNumber}, {item.shippingAddress.district}, {item.shippingAddress.ward}, {item.shippingAddress.province}</Text>
                        </View>
                    </View>
                    <View style={StyleDetailManagerOder.viewCart}>
                        <View style={StyleDetailManagerOder.viewCartTitle}>
                            <Icon.ShoppingCartSVG width={25} height={25} fill='black' />
                            <Text style={StyleDetailManagerOder.textCartTitle}>ShopApple</Text>
                        </View>
                        {item.products.map((value: any, index: number) => (
                            <View key={index} style={StyleDetailManagerOder.viewCartContent}>
                                <Image source={{ uri: value.priceColor.image }} style={StyleDetailManagerOder.imageCartContent} />
                                <View style={StyleDetailManagerOder.viewCartInfor}>
                                    <Text style={StyleDetailManagerOder.textCartContent}>{value.name} {value.model} {value.storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={StyleDetailManagerOder.textCartContent}>{value.priceColor.color}</Text>
                                        <Text style={StyleDetailManagerOder.textCartContent}>x{value.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={StyleDetailManagerOder.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={StyleDetailManagerOder.textCartContent}>{FormatPrice(value.priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={StyleDetailManagerOder.viewTotal}>
                        <View style={StyleDetailManagerOder.viewTotalTitle}>
                            <Text style={StyleDetailManagerOder.textTotalTitle}>Tổng tiền hàng</Text>
                            <Text style={StyleDetailManagerOder.textTotal}>{FormatPrice(item.products.reduce((total: number, value: any) => total + value.priceColor.price * value.quantity, 0))}</Text>
                        </View>
                        <View style={StyleDetailManagerOder.viewTotalTitle}>
                            <Text style={StyleDetailManagerOder.textTotalTitle}>Phí vận chuyển</Text>
                            <Text style={StyleDetailManagerOder.textTotal}>{FormatPrice(item.shippingFee)}</Text>
                        </View>
                        {item.voucher ? (
                            <View style={StyleDetailManagerOder.viewTotalTitle}>
                                <Text style={StyleDetailManagerOder.textTotalTitle}>ShopApple Voucher</Text>
                                <Text style={StyleDetailManagerOder.textTotal}>-{item.voucher}</Text>
                            </View>
                        ) : null}
                        <View style={StyleDetailManagerOder.viewTotalTitle}>
                            <Text style={StyleDetailManagerOder.textTotalTitle}>Thành tiền</Text>
                            <Text style={StyleDetailManagerOder.textTotal}>{FormatPriceVND2(item.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={StyleDetailManagerOder.viewPaymentMethod}>
                        <View style={StyleDetailManagerOder.viewPaymentMethodTitle}>
                            <Icon.PaymentSVG width={25} height={25} fill='red' />
                            <Text style={StyleDetailManagerOder.textPaymentMethodTitle}>Phương thức thanh toán</Text>
                        </View>
                        <Text style={StyleDetailManagerOder.textPaymentMethod}>Đơn hàng này bạn đang thanh toán bằng {item.paymentMethod}</Text>
                    </View>
                    <View style={StyleDetailManagerOder.viewOrderCode}>
                        <View style={StyleDetailManagerOder.viewOrderCodeTitle}>
                            <Text style={StyleDetailManagerOder.textOrderCodeTitle}>Mã đơn hàng</Text>
                            <Text style={StyleDetailManagerOder.textCode}>{item.orderCode}</Text>
                            <TouchableOpacity onPress={() => Clipboard.setString(item.orderCode)}>
                                <Text style={StyleDetailManagerOder.textCoppy}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                            <Text style={StyleDetailManagerOder.textOrderCode}>Mã khách thanh toán: </Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{item.paymentCode}</Text>
                        </View>
                        <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                            <Text style={StyleDetailManagerOder.textOrderCode}>Ngày khách đặt hàng:</Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{FormatDate3(item.createdAt)}</Text>
                        </View>
                        <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                            <Text style={StyleDetailManagerOder.textOrderCode}>Ngày đang giao hàng:</Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{FormatDate3(item.deliveredAt)}</Text>
                        </View>
                        <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                            <Text style={StyleDetailManagerOder.textOrderCode}>Ngày giao hàng tới</Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{FormatDate3(item.updatedAt)}</Text>
                        </View>
                        <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                            <Text style={StyleDetailManagerOder.textOrderCode}>Trạng thái đơn hàng:</Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{item.status}</Text>
                        </View>
                        {item.note ? (
                            <View style={StyleDetailManagerOder.viewOrderCodeInfor}>
                                <Text style={StyleDetailManagerOder.textOrderCode}>Khách ghi chú:</Text>
                                <Text style={StyleDetailManagerOder.textOrderCode}>{item.note}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailOrderDelivered