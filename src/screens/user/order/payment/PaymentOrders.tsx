import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'

import { IndexStyles } from '../../../../import/IndexStyles'
import { Responsive } from '../../../../constant/Responsive'
import { Icon } from '../../../../constant/Icon'
import { COLOR } from '../../../../constant/Colors'

import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MultiColorLine, CustomHeader } from '../../../../import/IndexComponent'
import { useGetAddressIdUserQuery } from '../../../../service/Api/IndexAddress'
import { useAppSelector, useAppDispatch } from '../../../../import/IndexFeatures'

import { useGetCartIdsQuery, useUpdateCartStatusMutation } from '../../../../service/Api/IndexCart'
import { FormatPrice } from '../../../../utils/FormatPrice'
import ToastMessage from '../../../../utils/ToastMessage'
import IndexHandleCart from '../../../../service/Api/IndexHandleCart'

import { decrementItemCount } from '../../../../redux/slices/CountCartSlice'
import { useUseVoucherMutation } from '../../../../service/Api/Index.Voucher'
import { useCreateOrderMutation, useGetPaymentUrlVnpayMutation, useReturnFromAppQuery } from '../../../../service/Api/Index.Order'

import { useCreateEvaluateMutation } from '../../../../service/Api/Index.Evaluate'

interface PaymentOrdersProps {
    id: string,
    shipper: string,
    address: any,
    selectedVoucher: any,
    selectedPayment: any
}

const PaymentOrders: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const route = useRoute()

    const isFocused = useIsFocused()

    const dipatch = useAppDispatch()

    const userId = useAppSelector(state => state.root.Auth.user._id)

    const { id, shipper, address, selectedVoucher, selectedPayment } = route.params as PaymentOrdersProps

    const { data } = useGetAddressIdUserQuery(userId)

    const addressDefault = data?.data.find(item => item.isDefault === true)

    const [currentAddress, setCurrentAddress] = useState(address || addressDefault)

    const { data: cart } = useGetCartIdsQuery(id)

    const [createEvaluate] = useCreateEvaluateMutation()

    const [createOrder] = useCreateOrderMutation()

    const [updateCartStatus] = useUpdateCartStatusMutation()

    const [useVoucher] = useUseVoucherMutation()

    const [GetPaymentUrlVnpay] = useGetPaymentUrlVnpayMutation()

    const [paymentCode, setPaymentCode] = useState<string | null>(null)

    const { data: CheckReturnFormApp } = useReturnFromAppQuery(paymentCode as string, { skip: !paymentCode }) as any

    const [note, setNote] = useState<string>('')

    const totalProduct = cart?.data.reduce((total, item) => total + item.products.priceColor.price * item.quantity, 0) as number

    const shipperFee = parseFloat(shipper) || 0

    const voucherDiscount = selectedVoucher?.maxDiscountAmount || 0

    const totalPayment = totalProduct + shipperFee - voucherDiscount

    const currentPayment = selectedPayment || 'Nhận hàng tại nhà'

    const handleEvaluate = async (res: any) => {
        try {
            const result = await createEvaluate({ user_id: userId, order_id: res.data.data._id });
        } catch (error) {
            console.error('Failed to evaluate product', error);
        }
    }


    useEffect(() => {
        if (isFocused) {
            setCurrentAddress(address || addressDefault)
            if (paymentCode && CheckReturnFormApp) {
                const orderData = CheckReturnFormApp.data
                if (orderData && orderData.paymentStatus === 'Chờ thanh toán') {
                    ToastMessage('error', 'Thanh toán thất bại');
                    navigation.navigate('StackMisc', {
                        screen: 'OrderSuccess',
                        params: {
                            title: 'Thanh toán thất bại',
                            totalAmount: orderData.totalAmount,
                            status: 'Thất bại',
                            paymentStatus: 'Chờ thanh toán',
                        }
                    });
                }
            }
        }
    }, [isFocused, address, addressDefault, paymentCode, CheckReturnFormApp])

    const handlePlaceOrder = async () => {
        try {
            const orderData: any = {
                userId: userId,
                products: cart?.data.map(item => ({
                    _id: item.products._id,
                    name: item.products.name,
                    model: item.products.model,
                    storage: item.products.storage,
                    priceColor: {
                        color: item.products.priceColor.color,
                        price: item.products.priceColor.price,
                        image: item.products.priceColor.image,
                    },
                    quantity: item.quantity,
                })),
                totalAmount: FormatPrice(totalPayment).replace('đ', '').replace(/\./g, ''),
                ipAddr: 'IP_ADDRESS',
                bankCode: null,
                shippingAddress: currentAddress._id,
                shippingFee: shipperFee,
                language: 'vn',
                voucher: selectedVoucher?._id,
                note: note,
            };
            const orderDataAtHome: any = {
                userId: userId,
                products: cart?.data.map(item => ({
                    _id: item.products._id,
                    name: item.products.name,
                    model: item.products.model,
                    storage: item.products.storage,
                    priceColor: {
                        color: item.products.priceColor.color,
                        price: item.products.priceColor.price,
                        image: item.products.priceColor.image,
                    },
                    quantity: item.quantity,
                })),
                totalAmount: FormatPrice(totalPayment).replace('đ', '').replace(/\./g, ''),
                paymentMethod: currentPayment,
                shippingAddress: currentAddress._id,
                shippingFee: shipperFee,
                voucher: selectedVoucher?._id,
                note: note,

            }
            const idProduct = cart?.data.map(item => item.products._id)
            const data: any = {
                ids: idProduct,
                status: 'Đã đặt hàng',
            }
            switch (currentPayment) {
                case 'Nhận hàng tại nhà':
                    const res: any = await createOrder(orderDataAtHome)
                    if (res.data) {
                        await IndexHandleCart.handleUpdateCartOrder(updateCartStatus, data, dipatch, decrementItemCount)
                        await handleEvaluate(res)
                        if (selectedVoucher) {
                            const voucherData = {
                                id: selectedVoucher._id,
                                userId: userId,
                                paymentMethod: currentPayment,
                            }
                            await useVoucher(voucherData);
                        }
                        navigation.navigate('StackMisc', {
                            screen: 'OrderSuccess',
                            params: {
                                title: 'Đặt hàng thành công',
                                totalAmount: res.data.data.totalAmount,
                                status: res.data.data.status,
                                paymentStatus: res.data.data.paymentStatus,
                            }
                        })
                    } else {
                        ToastMessage('error', 'Đặt hàng không thành công');
                    }
                    break;

                case 'Chuyển Khoản':
                    ToastMessage('success', 'Chuyển khoản');
                    break;

                case 'Vnpay':
                    const paymentUrl: any = await GetPaymentUrlVnpay(orderData)
                    if (paymentUrl.data.status === 200) {
                        ToastMessage('success', 'Chuyển hướng đến trang thanh toán');
                        Linking.openURL(paymentUrl.data.data.vnpUrl);
                        const data: any = {
                            ids: id,
                            status: 'Đã đặt hàng',
                        }
                        setPaymentCode(paymentUrl.data.data.order.paymentCode)
                        IndexHandleCart.handleUpdateCartOrder(updateCartStatus, data, dipatch, decrementItemCount)
                        if (selectedVoucher) {
                            const voucherData = {
                                id: selectedVoucher._id,
                                userId: userId,
                                paymentMethod: currentPayment,
                            }
                            const res = await useVoucher(voucherData);
                        } else {
                            console.log('Không có voucher')
                        }
                    } else {
                        ToastMessage('error', 'Lỗi khi tạo liên kết thanh toán');
                    }
                    break;

                case 'Trả góp':
                    const result: any = await createOrder(orderDataAtHome)
                    if (result.data) {
                        IndexHandleCart.handleUpdateCartOrder(updateCartStatus, data, dipatch, decrementItemCount)
                        if (selectedVoucher) {
                            const voucherData = {
                                id: selectedVoucher._id,
                                userId: userId,
                                paymentMethod: currentPayment,
                            }
                            const res = await useVoucher(voucherData);
                        } else {
                            console.log('Không có voucher')
                        }
                        ToastMessage('success', 'Đặt hàng thành công');
                        navigation.navigate('StackMisc', {
                            screen: 'OrderSuccess',
                            params: {
                                title: 'Đặt hàng thành công',
                                totalAmount: result.data.data.totalAmount,
                                status: result.data.data.status,
                                paymentStatus: result.data.data.paymentStatus,
                            }
                        })
                    } else {
                        ToastMessage('error', 'Đặt hàng không thành công');
                    }
                    break;

                default:
                    ToastMessage('error', 'Phương thức thanh toán không hợp lệ');
                    break;
            }
        } catch (error) {
            ToastMessage('error', 'Đặt hàng không thành công');
        }
    };

    return (
        <View style={IndexStyles.StylePaymentOrders.container}>
            <View style={IndexStyles.StylePaymentOrders.viewheader}>
                <View style={IndexStyles.StylePaymentOrders.headerTitle}>
                    <CustomHeader title='Thanh toán' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: Responsive.hp(14) }}>
                <View style={IndexStyles.StylePaymentOrders.containerBody}>
                    <TouchableOpacity style={IndexStyles.StylePaymentOrders.viewAddress} onPress={() => navigation.navigate('SelectedAddress', { id: id, shipper: shipper, address: currentAddress, selectedPayment: selectedPayment })}>
                        <View style={IndexStyles.StylePaymentOrders.iconLotaion}>
                            <Icon.LocationSVG width={20} height={20} fill={COLOR.REDONE} />
                        </View>
                        <View style={IndexStyles.StylePaymentOrders.viewAddressDetail}>
                            <Text style={IndexStyles.StylePaymentOrders.textAddress}>Địa chỉ nhận hàng</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textAddressDetail}>{currentAddress?.name} | {currentAddress?.phone}</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textAddressDetail}>{currentAddress?.houseNumber}</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textAddressDetail}>{currentAddress?.district},{currentAddress?.ward},{currentAddress?.province}</Text>
                        </View>
                        <Image source={Icon.RIGHT} style={IndexStyles.StylePaymentOrders.iconRight} />
                    </TouchableOpacity>
                    <MultiColorLine />
                    <View style={{ marginTop: 10 }}>
                        {cart?.data.map((item, index) => (
                            <View key={index}>
                                <View style={IndexStyles.StylePaymentOrders.viewOrder}>
                                    <Image source={{ uri: item.products.priceColor.image as string }} style={IndexStyles.StylePaymentOrders.imageProduct} />
                                    <View style={IndexStyles.StylePaymentOrders.viewOrderDetail}>
                                        <Text style={IndexStyles.StylePaymentOrders.textOrder}>{item.products.name} {item.products.model} {item.products.storage}</Text>
                                        <Text style={IndexStyles.StylePaymentOrders.textChangeOrder}>Đổi ý miễn phí</Text>
                                        <Text style={IndexStyles.StylePaymentOrders.textOrderDetail}>Màu:{item.products.priceColor.color}</Text>
                                        <View style={IndexStyles.StylePaymentOrders.viewPrice}>
                                            <Text style={IndexStyles.StylePaymentOrders.textOrderDetail}>Giá:{FormatPrice(item.products.priceColor?.price as number)}</Text>
                                            <Text style={IndexStyles.StylePaymentOrders.textOrderDetail}>x{item.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                                {index !== cart.data.length - 1 && <View style={IndexStyles.StylePaymentOrders.line} />}
                            </View>
                        ))}
                    </View>
                    {selectedVoucher && (
                        <TouchableOpacity style={IndexStyles.StylePaymentOrders.viewVoucher}
                            onPress={() => navigation.navigate('VoucherCoupon', { id: id, shipper: shipper, address: currentAddress, totalProduct: totalProduct, selectedPayment: currentPayment, selectedVoucherCoupon: selectedVoucher })}>
                            <Icon.VoucherSVG width={30} height={30} fill={COLOR.REDONE} />
                            <View style={IndexStyles.StylePaymentOrders.viewVoucherDetail}>
                                <Text style={IndexStyles.StylePaymentOrders.textVoucher}>{selectedVoucher.name}</Text>
                                <View style={IndexStyles.StylePaymentOrders.viewVoucherText}>
                                    <Text style={IndexStyles.StylePaymentOrders.textPriceVoucherDetail}>-{voucherDiscount}k</Text>
                                    <Image source={Icon.RIGHT} style={IndexStyles.StylePaymentOrders.iconRight} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) || (
                            <TouchableOpacity style={IndexStyles.StylePaymentOrders.viewVoucher}
                                onPress={() => navigation.navigate('VoucherCoupon', { id: id, shipper: shipper, address: currentAddress, totalProduct: totalProduct, selectedPayment: currentPayment, selectedVoucherCoupon: selectedVoucher })}>
                                <Icon.VoucherSVG width={30} height={30} fill={COLOR.REDONE} />
                                <View style={IndexStyles.StylePaymentOrders.viewVoucherDetail}>
                                    <Text style={IndexStyles.StylePaymentOrders.textVoucher}>Vourcher của shop</Text>
                                    <View style={IndexStyles.StylePaymentOrders.viewVoucherText}>
                                        <Text style={IndexStyles.StylePaymentOrders.textVoucherDetail}>Chọn hoặc nhập mã</Text>
                                        <Image source={Icon.RIGHT} style={IndexStyles.StylePaymentOrders.iconRight} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    <View style={IndexStyles.StylePaymentOrders.viewShipper}>
                        <Text style={IndexStyles.StylePaymentOrders.textShipper}>Phương thức vận chuyển</Text>
                        <View style={IndexStyles.StylePaymentOrders.viewShipperDetail}>
                            <View style={IndexStyles.StylePaymentOrders.viewShipperText}>
                                <Text style={IndexStyles.StylePaymentOrders.textShipperDetail}>Giao hàng tiêu chuẩn</Text>
                                <Text style={IndexStyles.StylePaymentOrders.textShipperDetail}>{shipper}</Text>
                            </View>
                            <View style={IndexStyles.StylePaymentOrders.viewShipperPrice}>
                                <Icon.WaitShipperSVG width={20} height={20} fill={COLOR.BLUE} />
                                <Text style={IndexStyles.StylePaymentOrders.textShipperDetail}>Đảm bảo nhận hàng trong vòng 3 ngày</Text>
                            </View>
                        </View>
                    </View>
                    <View style={IndexStyles.StylePaymentOrders.viewNote}>
                        <Text style={IndexStyles.StylePaymentOrders.textNote}>Tin nhắn</Text>
                        <TextInput
                            placeholder='Lưu ý cho shop'
                            value={note}
                            onChangeText={(text) => setNote(text)}
                            style={IndexStyles.StylePaymentOrders.inputNote}
                        />
                    </View>
                    <TouchableOpacity style={IndexStyles.StylePaymentOrders.viewPayment} onPress={() => navigation.navigate('PaymentProvider', { id: id, shipper: shipper, address: currentAddress, selectedPaymentMethod: currentPayment })}>
                        <View style={IndexStyles.StylePaymentOrders.viewIcon}>
                            <Icon.PaymentSVG width={25} height={30} fill={COLOR.REDONE} />
                            <Text style={IndexStyles.StylePaymentOrders.textPayment}>Phương thức thanh toán</Text>
                        </View>
                        <View style={IndexStyles.StylePaymentOrders.viewText}>
                            <Text style={IndexStyles.StylePaymentOrders.textSelectedPayment}>{currentPayment}</Text>
                            <Image source={Icon.RIGHT} style={IndexStyles.StylePaymentOrders.iconRight} />
                        </View>
                    </TouchableOpacity>
                    <View style={IndexStyles.StylePaymentOrders.viewDetailOrderPayment}>
                        <View style={IndexStyles.StylePaymentOrders.viewIcon}>
                            <Icon.InvoiceSVG width={25} height={30} fill={COLOR.REDONE} />
                            <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>Chi tiết thanh toán</Text>
                        </View>
                        <View style={IndexStyles.StylePaymentOrders.viewDetailOrder}>
                            <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>Tổng tiền sản phẩm</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>{FormatPrice(totalProduct)}</Text>
                        </View>
                        <View style={IndexStyles.StylePaymentOrders.viewDetailOrder}>
                            <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>Phí vận chuyển</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>{shipper}</Text>
                        </View>
                        {selectedVoucher ? (
                            <View style={IndexStyles.StylePaymentOrders.viewDetailOrder}>
                                <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>Giảm giá sản phẩm</Text>
                                <Text style={IndexStyles.StylePaymentOrders.textDetailOrder}>-{FormatPrice(voucherDiscount)}</Text>
                            </View>
                        ) : null}
                        <View style={IndexStyles.StylePaymentOrders.viewDetailOrder}>
                            <Text style={IndexStyles.StylePaymentOrders.textTotalPayment}>Tổng thanh toán đơn hàng</Text>
                            <Text style={IndexStyles.StylePaymentOrders.textTotalPayment}>{FormatPrice(totalPayment)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={IndexStyles.StylePaymentOrders.containerFooter}>
                <View style={IndexStyles.StylePaymentOrders.viewButton}>
                    <View style={IndexStyles.StylePaymentOrders.viewTotalPayment}>
                        <Text style={IndexStyles.StylePaymentOrders.textTotalTitle}>Tổng đơn hàng</Text>
                        <Text style={IndexStyles.StylePaymentOrders.textTotalPayment}>{FormatPrice(totalPayment)}</Text>
                    </View>
                    <TouchableOpacity onPress={handlePlaceOrder}>
                        <Text style={IndexStyles.StylePaymentOrders.textButton}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PaymentOrders

