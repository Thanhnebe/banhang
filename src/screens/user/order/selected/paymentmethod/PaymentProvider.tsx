import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IndexStyles } from '../../../../../import/IndexStyles'
import { CustomHeader } from '../../../../../import/IndexComponent'
import { PaymentMethodData } from '../../../../../data/PaymentMethod'
import { COLOR } from '../../../../../constant/Colors'
import { Icon } from '../../../../../constant/Icon'

interface PaymentProviderProps {
    id: string,
    shipper: string,
    address: any;
    selectedPaymentMethod: any;
}

const paymentMethodMap: Record<string, string> = {
    'Thanh toán khi nhận hàng': 'Nhận hàng tại nhà',
    'Thanh toán qua thẻ ngân hàng': 'Ngân hàng',
    'Thanh toán qua vnpay': 'Vnpay',
    'Thanh toán chuyển khoản ngân hàng': 'Chuyển Khoản',
    'Thanh toán bằng trả góp': 'Trả góp',
};

const PaymentProvider: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    const route = useRoute()

    const { id, shipper, address, selectedPaymentMethod } = route.params as PaymentProviderProps

    const handleSelectPayment = (name: string) => {
        setSelectedPayment(paymentMethodMap[name])
    };

    useEffect(() => {
        setSelectedPayment(selectedPaymentMethod)
    }, [selectedPaymentMethod])

    return (
        <View style={IndexStyles.StylePaymentProvider.container}>
            <View style={IndexStyles.StylePaymentProvider.viewheader}>
                <View style={IndexStyles.StylePaymentProvider.headerTitle}>
                    <CustomHeader title='Phương thức thanh toán' color='red' />
                </View>
            </View>
            <View style={IndexStyles.StylePaymentProvider.containerBody}>
                <View style={IndexStyles.StylePaymentProvider.viewProtect}>
                    <Text style={IndexStyles.StylePaymentProvider.textProtect}>Thanh toán cho ShopApple</Text>
                </View>
                <View style={IndexStyles.StylePaymentProvider.viewPayment}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.GREY, width: '100%' }} />
                    {PaymentMethodData.map((item, index) => {
                        const IconComponent = item.icon;

                        return (
                            <TouchableOpacity key={index}
                                onPress={() => handleSelectPayment(item.name)}
                            >
                                <View style={IndexStyles.StylePaymentProvider.viewItem}>
                                    {IconComponent ? (
                                        <IconComponent color={COLOR.RED} width={35} height={35} />
                                    ) : item.image ? (
                                        <Image source={item.image} style={IndexStyles.StylePaymentProvider.image} />
                                    ) : null}
                                    <Text style={IndexStyles.StylePaymentProvider.textPayment}>{item.name}</Text>
                                    {selectedPayment === paymentMethodMap[item.name] ? (
                                        <Icon.CheckSVG color={COLOR.RED} width={25} height={25} style={{ marginLeft: 'auto' }} />
                                    ) : null}
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.GREY, width: '100%' }} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <View style={IndexStyles.StylePaymentProvider.containerFooter}>
                <TouchableOpacity style={IndexStyles.StylePaymentProvider.viewButton}
                    onPress={() => {
                        navigation.navigate('StackMisc', { screen: 'PaymentOrders', params: { address: address, id: id, shipper: shipper, selectedPayment: selectedPayment } })
                    }}
                >
                    <Text style={IndexStyles.StylePaymentProvider.textButton}>Thêm phương thức thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentProvider