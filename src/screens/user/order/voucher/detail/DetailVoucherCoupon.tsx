import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IndexStyles } from '../../../../../import/IndexStyles'
import { CustomHeader } from '../../../../../import/IndexComponent'
import { useGetVoucherByIdQuery } from '../../../../../service/Api/Index.Voucher'
import { useRoute, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TypeVoucherProps } from '../../../../../model/entity/Index.Voucher.entity'
import { Icon } from '../../../../../constant/Icon'
import { FormatDate2 } from '../../../../../utils/FormatDate'
import { ScrollView } from 'react-native-gesture-handler'


const DetailVoucherCoupon: React.FC = () => {
    const route = useRoute<TypeVoucherProps['route']>()

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const { id } = route.params

    const { data } = useGetVoucherByIdQuery(id)
    
    const imageUri = data?.data.images ? { uri: data.data.images as string } : Icon.BACKGROUNDVOUCHER;

    return (
        <View style={IndexStyles.StyleDetailVoucherCoupon.container}>
            <View style={IndexStyles.StyleDetailVoucherCoupon.viewheader}>
                <View style={IndexStyles.StyleDetailVoucherCoupon.headerTitle}>
                    <CustomHeader title='Chi tiết mã giảm giá' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={IndexStyles.StyleDetailVoucherCoupon.containerBody}>
                    <View style={IndexStyles.StyleDetailVoucherCoupon.viewImageBackground}>
                        <Image source={Icon.BACKGROUNDVOUCHER} style={IndexStyles.StyleDetailVoucherCoupon.imageBackground} />
                    </View>
                    <View style={IndexStyles.StyleDetailVoucherCoupon.containerDetail}>
                        <View style={IndexStyles.StyleDetailVoucherCoupon.viewVoucher}>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewImage}>
                                <Image source={imageUri} style={IndexStyles.StyleDetailVoucherCoupon.image} />
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textLogo}>ShopApple</Text>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewDetail}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textVoucher}>{data?.data.name}</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textPrice}>Đơn tối thiểu {data?.data.minOrderAmount}</Text>
                                <View style={IndexStyles.StyleDetailVoucherCoupon.viewExpiration}>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textExpiration}>HSD: {FormatDate2(data?.data.expirationDate as string)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={IndexStyles.StyleDetailVoucherCoupon.viewConditionDetail}>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textCondition}>Hạn sử dụng mã</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textConditionDetail}>{FormatDate2(data?.data.createdAt as string)} - {FormatDate2(data?.data.expirationDate as string)}</Text>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textSpecidal}>Ưu đãi</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textSpecidalDetail}>{data?.data.description}</Text>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textPaymentProvider}>Phương thức thanh toán</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textPaymentProviderDetail}>Mọi hình thức thanh toán</Text>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipperTitle}>Đơn vị vận chuyển</Text>
                                <View style={IndexStyles.StyleDetailVoucherCoupon.viewShipper}>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Giao hàng nhanh</Text>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Giao hàng tiết kiệm</Text>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Viettel Post</Text>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Grab</Text>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Ahamove</Text>
                                    <Text style={IndexStyles.StyleDetailVoucherCoupon.textShipper}>- Giao hỏa tốc</Text>
                                </View>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textCondition}>Thiết bị áp dụng</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textConditionDetail}>IOS, Android</Text>
                            </View>
                            <View style={IndexStyles.StyleDetailVoucherCoupon.viewCondition}>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textCondition}>Điều kiện</Text>
                                <Text style={IndexStyles.StyleDetailVoucherCoupon.textConditionDetail}>{data?.data.condition}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={IndexStyles.StyleDetailVoucherCoupon.viewButton} onPress={() => navigation.goBack()}>
                <Text style={IndexStyles.StyleDetailVoucherCoupon.textButton}>Đồng ý</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailVoucherCoupon