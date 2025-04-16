import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IndexStyles } from '../../../../../../import/IndexStyles';

import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../../../../import/IndexFeatures';
import { useGetOrderUserQuery } from '../../../../../../service/Api/Index.Order';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLOR } from '../../../../../../constant/Colors';
import { Icon } from '../../../../../../constant/Icon';

import { FormatPrice, FormatPriceVND2 } from '../../../../../../utils/FormatPrice';
import { Responsive } from '../../../../../../constant/Responsive';
import { ScrollView } from 'react-native-gesture-handler';

const PendingDelivery: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const user = useAppSelector(state => state.root.Auth.user._id);

    const { data, error, isLoading } = useGetOrderUserQuery(user);

    const pendingOrder = data?.data.filter((item) => item.status === "Đang giao");

    const payment = 'Đơn hàng đang giao tới bạn, vui lòng chờ nhận hàng và kiểm tra hàng hóa trước khi thanh toán.';

    if (isLoading) {
        return (
            <View style={IndexStyles.StyleDetailArticle.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={IndexStyles.StylePendingDelivery.container}>
                {pendingOrder?.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity style={IndexStyles.StylePendingDelivery.containerItem} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailPendingDelivery', params: { id: item._id, payment: payment } })}>
                            <View style={IndexStyles.StylePendingDelivery.viewText}>
                                <View style={IndexStyles.StylePendingDelivery.viewIcon}>
                                    <Icon.StoreSVG width={25} height={25} />
                                    <Text style={IndexStyles.StylePendingDelivery.textShop}>ShopApple</Text>
                                </View>
                                <Text style={IndexStyles.StylePendingDelivery.textStatus}>{item.paymentStatus}</Text>
                            </View>
                            <View style={IndexStyles.StylePendingDelivery.viewCart}>
                                <View style={IndexStyles.StylePendingDelivery.viewImagge}>
                                    <Image source={{ uri: item.products[0].priceColor.image }} style={IndexStyles.StylePendingDelivery.image} />
                                </View>
                                <View style={IndexStyles.StylePendingDelivery.viewInfor}>
                                    <Text style={IndexStyles.StylePendingDelivery.textInfor}>{item.products[0].name} {item.products[0].model} {item.products[0].storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={IndexStyles.StylePendingDelivery.textInfor}>{item.products[0].priceColor.color}</Text>
                                        <Text style={IndexStyles.StylePendingDelivery.textQuantity}>x{item.products[0].quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(10) }}>
                                        <Text style={IndexStyles.StylePendingDelivery.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StylePendingDelivery.textPrice}>{FormatPrice(item.products[0].priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={IndexStyles.StylePendingDelivery.line} />
                            {item.products.length > 1 ? (
                                <TouchableOpacity onPress={() => navigation.navigate('StackMisc', { screen: 'DetailPendingDelivery', params: { id: item._id, payment: payment } })}>
                                    <Text style={IndexStyles.StylePendingDelivery.textMoreProducts}>Xem thêm sản phẩm</Text>
                                    <View style={IndexStyles.StylePendingDelivery.line} />
                                </TouchableOpacity>
                            ) : null}
                            <View style={IndexStyles.StylePendingDelivery.viewLengthCart}>
                                <Text style={IndexStyles.StylePendingDelivery.textLengthCart}>{item.products.length} sản phẩm</Text>
                                <Text style={IndexStyles.StylePendingDelivery.textTotal}>Tổng thanh toán: {FormatPriceVND2(item.totalAmount)}</Text>
                            </View>
                            <View style={IndexStyles.StylePendingDelivery.line} />
                            <View style={IndexStyles.StylePendingDelivery.viewPayment}>
                                <Text style={IndexStyles.StylePendingDelivery.textPayment}>{payment}</Text>
                                <View style={IndexStyles.StylePendingDelivery.viewButton}>
                                    <Text style={IndexStyles.StylePendingDelivery.textButton}>Đang giao hàng</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
                }
            </View>
        </ScrollView>
    )
}

export default PendingDelivery