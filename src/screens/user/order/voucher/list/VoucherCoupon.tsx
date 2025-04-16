import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IndexStyles } from '../../../../../import/IndexStyles'
import { CustomHeader, CustomCheckBox } from '../../../../../import/IndexComponent'
import { useAppSelector } from '../../../../../import/IndexFeatures'
import { useGetVoucherQuery } from '../../../../../service/Api/Index.Voucher'
import { FormatPriceVND } from '../../../../../utils/FormatPrice'
import { FormatDate2 } from '../../../../../utils/FormatDate'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToastMessage from '../../../../../utils/ToastMessage'

interface VoucherCouponProps {
    id: string,
    shipper: string,
    address: any,
    totalProduct: any,
    selectedPayment: any,
    selectedVoucherCoupon: any
}

const VoucherCoupon: React.FC = () => {
    const user = useAppSelector(state => state.root.Auth.user._id)

    const { data } = useGetVoucherQuery({ userId: user, usersApplicable: user })

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const route = useRoute()

    const { id, shipper, address, totalProduct, selectedPayment, selectedVoucherCoupon } = route.params as VoucherCouponProps

    const [selectedVoucher, setSelectedVoucher] = useState<any>(selectedVoucherCoupon)

    const handleSelectVoucher = (item: any) => {
        const now = new Date();
        if (new Date(item.expirationDate) < now) {
            ToastMessage("error", "Voucher này đã hết hạn.");
            return;
        }
        if (totalProduct < item.minOrderAmount) {
            ToastMessage("error", `Đơn hàng phải có tổng giá trị ít nhất là ${FormatPriceVND(item.minOrderAmount)} mới được sử dụng`);
            return;
        }
        if (selectedPayment !== item.paymentMethod) {
            ToastMessage("error", `Mã này áp dụng cho thanh toán ${item.paymentMethod}.`);
            return;
        }
        setSelectedVoucher(item)
        navigation.navigate('PaymentOrders', { selectedVoucher: item, id: id, shipper: shipper, address: address, selectedPayment: selectedPayment })
    };



    return (
        <View style={IndexStyles.StyleVoucherCoupon.container}>
            <View style={IndexStyles.StyleVoucherCoupon.viewheader}>
                <View style={IndexStyles.StyleVoucherCoupon.headerTitle}>
                    <CustomHeader title='Voucher dành cho bạn' color='red' />
                </View>
            </View>
            <View style={IndexStyles.StyleVoucherCoupon.containerBody}>
                {data?.data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={IndexStyles.StyleVoucherCoupon.viewVoucher} onPress={() => handleSelectVoucher(item)}>
                            <View style={IndexStyles.StyleVoucherCoupon.viewImage}>
                                <Image source={{ uri: item.images as string }} style={IndexStyles.StyleVoucherCoupon.image} />
                                <Text style={IndexStyles.StyleVoucherCoupon.textLogo}>ShopApple</Text>
                            </View>
                            <View style={IndexStyles.StyleVoucherCoupon.viewVoucherDetail}>
                                <View style={IndexStyles.StyleVoucherCoupon.viewDetail}>
                                    <Text style={IndexStyles.StyleVoucherCoupon.textVoucher}>{item.name}</Text>
                                    <Text style={IndexStyles.StyleVoucherCoupon.textPrice}>Đơn tối thiểu {FormatPriceVND(item.minOrderAmount)}</Text>
                                    <View style={IndexStyles.StyleVoucherCoupon.viewExpiration}>
                                        <Text style={IndexStyles.StyleVoucherCoupon.textExpiration}>HSD: {FormatDate2(item.expirationDate)}</Text>
                                        <TouchableOpacity style={IndexStyles.StyleVoucherCoupon.viewCondition} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailVoucherCoupon', params: { id: item._id } })}>
                                            <Text style={IndexStyles.StyleVoucherCoupon.textCondition}>Điều kiện</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <CustomCheckBox
                                    checked={selectedVoucher === item}
                                    onPress={() => handleSelectVoucher(item)}
                                    style={IndexStyles.StyleVoucherCoupon.checkbox}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
        </View>
    )
}

export default VoucherCoupon