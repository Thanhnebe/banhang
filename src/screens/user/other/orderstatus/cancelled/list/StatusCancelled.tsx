import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { IndexStyles } from '../../../../../../import/IndexStyles';

import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../../../../../import/IndexFeatures';
import { useGetOrderUserQuery } from '../../../../../../service/Api/Index.Order';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLOR } from '../../../../../../constant/Colors';
import { Icon } from '../../../../../../constant/Icon';

import { FormatPrice, FormatPriceVND2 } from '../../../../../../utils/FormatPrice';
import { Responsive } from '../../../../../../constant/Responsive';
import { ScrollView } from 'react-native-gesture-handler';

import { useUpdateCartStatusMutation } from '../../../../../../service/Api/IndexCart';
import ToastMessage from '../../../../../../utils/ToastMessage';
import { incrementItemCount } from '../../../../../../redux/slices/CountCartSlice';

const StatusCancelled: React.FC = () => {
    
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.root.Auth.user._id);

    const { data, error, isLoading } = useGetOrderUserQuery(user);

    const pendingOrder = data?.data.filter((item) => item.status === "Đã hủy");

    const [updateCartStatus] = useUpdateCartStatusMutation();

    const payment = 'Đơn hàng đã huỷ';

    const handleUpdateCart = async (id: any) => {
        try {
            const data: any = {
                ids: id,
                status: 'giỏ hàng',
            }
            const result: any = await updateCartStatus(data);
            if (result.data) {
                const quantityToDecrement = result.data.data.matchedCount
                dispatch(incrementItemCount(quantityToDecrement));
                navigation.navigate('TabHome', { screen: 'Giỏ hàng' });
            } else {
                ToastMessage('error', 'Cập nhật giỏ hàng thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
            <View style={IndexStyles.StyleDetailArticle.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        )
    }

    return (
        <View style={IndexStyles.StyleStatusCancelled.container}>
            <ScrollView>
                {pendingOrder?.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity style={IndexStyles.StyleStatusCancelled.containerItem} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusCancelled', params: { id: item._id, payment: payment } })}>
                            <View style={IndexStyles.StyleStatusCancelled.viewText}>
                                <View style={IndexStyles.StyleStatusCancelled.viewIcon}>
                                    <Icon.StoreSVG width={25} height={25} />
                                    <Text style={IndexStyles.StyleStatusCancelled.textShop}>ShopApple</Text>
                                </View>
                                <Text style={IndexStyles.StyleStatusCancelled.textStatus}>{item.paymentStatus}</Text>
                            </View>
                            <View style={IndexStyles.StyleStatusCancelled.viewCart}>
                                <View style={IndexStyles.StyleStatusCancelled.viewImagge}>
                                    <Image source={{ uri: item.products[0].priceColor.image }} style={IndexStyles.StyleStatusCancelled.image} />
                                </View>
                                <View style={IndexStyles.StyleStatusCancelled.viewInfor}>
                                    <Text style={IndexStyles.StyleStatusCancelled.textInfor}>{item.products[0].name} {item.products[0].model} {item.products[0].storage}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={IndexStyles.StyleStatusCancelled.textInfor}>{item.products[0].priceColor.color}</Text>
                                        <Text style={IndexStyles.StyleStatusCancelled.textQuantity}>x{item.products[0].quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(10) }}>
                                        <Text style={IndexStyles.StyleStatusCancelled.textChangeProducts}>Đổi trả miễn phí 7 ngày</Text>
                                        <Text style={IndexStyles.StyleStatusCancelled.textPrice}>{FormatPrice(item.products[0].priceColor.price)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={IndexStyles.StyleStatusCancelled.line} />
                            {item.products.length > 1 ? (
                                <TouchableOpacity onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusCancelled', params: { id: item._id, payment: payment } })}>
                                    <Text style={IndexStyles.StyleStatusCancelled.textMoreProducts}>Xem thêm sản phẩm</Text>
                                    <View style={IndexStyles.StyleStatusCancelled.line} />
                                </TouchableOpacity>
                            ) : null}
                            <View style={IndexStyles.StyleStatusCancelled.viewLengthCart}>
                                <Text style={IndexStyles.StyleStatusCancelled.textLengthCart}>{item.products.length} sản phẩm</Text>
                                <Text style={IndexStyles.StyleStatusCancelled.textTotal}>Thành tiền: {FormatPriceVND2(item.totalAmount)}</Text>
                            </View>
                            <View style={IndexStyles.StyleStatusCancelled.line} />
                            <View style={IndexStyles.StyleStatusCancelled.viewPayment}>
                                <Text style={IndexStyles.StyleStatusCancelled.textPayment}>{payment}</Text>
                                <TouchableOpacity style={IndexStyles.StyleStatusCancelled.viewButton} onPress={() => handleUpdateCart(item.products.map((item) => item._id))}>
                                    <Text style={IndexStyles.StyleStatusCancelled.textButton}>Mua lại</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
                }
            </ScrollView>
        </View>
    )
}

export default StatusCancelled