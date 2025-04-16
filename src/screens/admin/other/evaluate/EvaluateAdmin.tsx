import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomAirbnbRating, CustomHeader } from '../../../../import/IndexComponent';

import StyleEvaluateAdmin from './StyleEvaluateAdmin';
import { Responsive } from '../../../../constant/Responsive';
import { useGetEvaluateAllAdminQuery } from '../../../../service/Api/Index.Evaluate';

import { FlashList } from '@shopify/flash-list';
import { FormatDate3 } from '../../../../utils/FormatDate';


const EvaluateAdmin: React.FC = () => {

    const { data } = useGetEvaluateAllAdminQuery()

    const dataEvaluate = data?.data.filter((item: any) => item.status === 'Đã đánh giá')

    return (
        <View style={StyleEvaluateAdmin.container}>
            <View style={StyleEvaluateAdmin.viewheader}>
                <View style={StyleEvaluateAdmin.headerTitle}>
                    <CustomHeader title='Đánh giá của khách hàng' color='red' fontSize={Responsive.RFPercentage(2.4)} />
                </View>
            </View>
            <View style={StyleEvaluateAdmin.containerBody}>
                <FlashList
                    data={data?.data.filter((item: any) => item.status === 'Đã đánh giá')}
                    renderItem={({ item }: any) => {
                        return (
                            <View style={StyleEvaluateAdmin.viewEvaluateProduct}>
                                <View style={StyleEvaluateAdmin.viewShop}>
                                    <Image source={{ uri: item.user_id.photoUrl }} style={StyleEvaluateAdmin.imageAvatar} />
                                    <View>
                                        <Text style={StyleEvaluateAdmin.textName}>{item.user_id.fullname}</Text>
                                        <CustomAirbnbRating rating={item.rating} reviews={["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"]} size={18} />
                                    </View>
                                </View>
                                <View style={StyleEvaluateAdmin.viewProduct}>
                                    <Text style={StyleEvaluateAdmin.textProduct}>{FormatDate3(item.updated_at)} | </Text>
                                    <Text style={StyleEvaluateAdmin.textProduct}>Phân loại: {item.order_id.products[0].priceColor.color}</Text>
                                </View>
                                <View>
                                    <Text style={StyleEvaluateAdmin.textReview}>{item.comment}</Text>
                                    <Text style={StyleEvaluateAdmin.textReview}>Chi tiết kinh nghiệm: {item.detail.experience}</Text>
                                    <Text style={StyleEvaluateAdmin.textReview}>Chi tiết cảm nghĩ: {item.detail.feeling}</Text>
                                    <Text style={StyleEvaluateAdmin.textReview}>Chi tiết chất lượng: {item.detail.quality}</Text>
                                </View>
                                <View style={StyleEvaluateAdmin.viewProduct}>
                                    <Image source={{ uri: item.order_id.products[0].priceColor.image }} style={StyleEvaluateAdmin.imageProduct} />
                                    <View style={StyleEvaluateAdmin.viewProductDetail}>
                                        <Text style={StyleEvaluateAdmin.textProduct}>{item.order_id.products[0].name} {item.order_id.products[0].storage} {item.order_id.products[0].model}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item._id}
                    estimatedItemSize={200}
                />
            </View>
        </View>
    )
}

export default EvaluateAdmin