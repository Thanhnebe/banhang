import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useConfirmOrderAdminMutation, useGetDetailOrderQuery } from '../../../../service/Api/Index.Order'

import { useRoute, RouteProp } from '@react-navigation/native'
import { CustomHeader } from '../../../../import/IndexComponent'
import StyleDetailManagerOder from './StyleDetailManagerOrder'

import { Icon } from '../../../../constant/Icon'
import Clipboard from '@react-native-clipboard/clipboard'
import { FormatPrice, FormatPriceVND2 } from '../../../../utils/FormatPrice'

import { FormatDate3 } from '../../../../utils/FormatDate'
import { ScrollView } from 'react-native-gesture-handler'
import ToastMessage from '../../../../utils/ToastMessage'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteParams = {
    DetailManagerOrder: {
        id: string
    }
}

const DetailOrderCancel: React.FC = () => {

    const route = useRoute<RouteProp<RouteParams, 'DetailManagerOrder'>>()

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const { data, isLoading } = useGetDetailOrderQuery(route.params.id)

    const item = data?.data || {} as any

    const [ConfirmOrderAdmin] = useConfirmOrderAdminMutation()

    const handleConfirmOrder = async (id: string, status: string, canceledAt?: Date, updateAt?: Date, paymentStatus?: string) => {
        try {
            const data = {
                data: {
                    status: status,
                    // Kiểm tra nếu trạng thái là 'Đã hủy', chỉ thêm canceledAt và paymentStatus
                    ...(status === 'Đã hủy' && { canceledAt, paymentStatus }),
                    // Nếu không phải 'Đã hủy', chỉ thêm updateAt và paymentStatus
                    ...(status !== 'Đã hủy' && { updateAt, paymentStatus })
                }
            };
            const response = await ConfirmOrderAdmin({ id, data }).unwrap();
            if (response) {
                const successMessage = status === 'Đã hủy'
                    ? 'Xác nhận hủy đơn hàng thành công'
                    : 'Xác nhận đơn hàng thành công';
                ToastMessage('success', successMessage);
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Xác nhận đơn hàng không thành công');
        }
    };


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
                    <CustomHeader title='Chi tiết đơn hủy' color='red' />
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
                            <Text style={StyleDetailManagerOder.textOrderCode}>Trạng thái đơn hàng:</Text>
                            <Text style={StyleDetailManagerOder.textOrderCode}>{item.status}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={StyleDetailManagerOder.viewFooter}>
                    <TouchableOpacity onPress={() => handleConfirmOrder(item._id, 'Đã hủy', new Date(), undefined, 'Đã hủy')}>
                        <View style={StyleDetailManagerOder.viewOrderButton}>
                            <Text style={StyleDetailManagerOder.textActive}>Hủy đơn hàng</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleConfirmOrder(item._id, 'Đã xác nhận', undefined, new Date(), 'Đã thanh toán')}>
                        <View style={StyleDetailManagerOder.viewOrderButton}>
                            <Text style={StyleDetailManagerOder.textActive}>Xác nhận đơn hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </View>
    )
}

export default DetailOrderCancel