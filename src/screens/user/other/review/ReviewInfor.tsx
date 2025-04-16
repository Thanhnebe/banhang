import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { UseActiveTab } from '../../../../utils/ActiveTab'
import { IndexStyles } from '../../../../import/IndexStyles'
import { CustomHeader, CustomAirbnbRating } from '../../../../import/IndexComponent'

import { Responsive } from '../../../../constant/Responsive'
import { useGetEvaluateUserQuery } from '../../../../service/Api/Index.Evaluate'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppSelector } from '../../../../import/IndexFeatures'
import { FlashList } from '@shopify/flash-list'
import { Icon } from '../../../../constant/Icon'

import { FormatDate3 } from '../../../../utils/FormatDate'

const ReviewInfor: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const user = useAppSelector(state => state.root.Auth.user._id)

    const { data, error, isLoading } = useGetEvaluateUserQuery(user)

    const { activeTab, handleActiveTab } = UseActiveTab('Chưa đánh giá')

    const countProductNotEvaluate = data?.data.filter((item: any) => item.status === 'Chưa đánh giá').length

    return (
        <View style={IndexStyles.StyleReviewInfor.container} >
            <View style={IndexStyles.StyleReviewInfor.viewheader}>
                <View style={IndexStyles.StyleReviewInfor.headerTitle}>
                    <CustomHeader title='Đánh giá của tôi' color='red' fontSize={Responsive.RFPercentage(2.5)} />
                </View>
            </View>
            <View style={IndexStyles.StyleReviewInfor.containerBody}>
                <View style={IndexStyles.StyleReviewInfor.viewTab}>
                    <TouchableOpacity
                        style={IndexStyles.StyleReviewInfor.viewRatedYet}
                        onPress={() => { handleActiveTab('Chưa đánh giá') }}>
                        <Text style={activeTab === 'Chưa đánh giá' ? IndexStyles.StyleReviewInfor.textActive : IndexStyles.StyleReviewInfor.textTab}>Chưa đánh giá</Text>
                        <Text style={IndexStyles.StyleReviewInfor.textCount}>{countProductNotEvaluate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={activeTab === 'Đã đánh giá' ? IndexStyles.StyleReviewInfor.viewRatedYet : null}
                        onPress={() => { handleActiveTab('Đã đánh giá') }}>
                        <Text style={activeTab === 'Đã đánh giá' ? IndexStyles.StyleReviewInfor.textActive : IndexStyles.StyleReviewInfor.textTab}>Đã đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'Chưa đánh giá' ? (
                <FlashList
                    data={data?.data.filter((item: any) => item.status === 'Chưa đánh giá')}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item.order_id._id } })}>
                            <View style={IndexStyles.StyleReviewInfor.viewReview}>
                                <View style={IndexStyles.StyleReviewInfor.viewShop}>
                                    <Icon.StoreSVG width={25} height={25} fill='red' />
                                    <Text style={IndexStyles.StyleReviewInfor.textReview}>AppleShop</Text>
                                </View>
                                <View style={IndexStyles.StyleReviewInfor.viewProduct}>
                                    <Image source={{ uri: item.order_id.products[0].priceColor.image }} style={IndexStyles.StyleReviewInfor.imageProduct} />
                                    <View style={IndexStyles.StyleReviewInfor.viewProductDetail}>
                                        <Text style={IndexStyles.StyleReviewInfor.textProduct}>{item.order_id.products[0].name} {item.order_id.products[0].storage} {item.order_id.products[0].model}</Text>
                                        <Text style={IndexStyles.StyleReviewInfor.textProduct}>Màu: {item.order_id.products[0].priceColor.color}</Text>
                                    </View>
                                </View>
                                <View style={IndexStyles.StyleReviewInfor.decor} />
                                <View style={IndexStyles.StyleReviewInfor.viewEvaluate}>
                                    <Text style={IndexStyles.StyleReviewInfor.textReview}>Chỉ còn 30 ngày để đánh giá</Text>
                                    <TouchableOpacity
                                        style={IndexStyles.StyleReviewInfor.viewButton}
                                        onPress={() => navigation.navigate('StackMisc', { screen: 'EvaluateProducts', params: { id: item._id } })}>
                                        <Text style={IndexStyles.StyleReviewInfor.textButton}>Đánh giá ngay</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={200}
                />
            ) : (
                <FlashList
                    data={data?.data.filter((item: any) => item.status === 'Đã đánh giá')}
                    renderItem={({ item }) => (
                        <View style={IndexStyles.StyleReviewInfor.viewEvaluateProduct}>
                            <View style={IndexStyles.StyleReviewInfor.viewShop}>
                                <Image source={{ uri: item.user_id.photoUrl }} style={IndexStyles.StyleReviewInfor.imageAvatar} />
                                <View>
                                    <Text style={IndexStyles.StyleReviewInfor.textName}>{item.user_id.fullname}</Text>
                                    <CustomAirbnbRating rating={item.rating} reviews={[]} size={18} />
                                </View>
                            </View>
                            <View style={IndexStyles.StyleReviewInfor.viewProduct}>
                                <Text style={IndexStyles.StyleReviewInfor.textProduct}>{FormatDate3(item.updated_at)} | </Text>
                                <Text style={IndexStyles.StyleReviewInfor.textProduct}>Phân loại: {item.order_id.products[0].priceColor.color}</Text>
                            </View>
                            <View>
                                <Text style={IndexStyles.StyleReviewInfor.textReview}>{item.comment}</Text>
                                <Text style={IndexStyles.StyleReviewInfor.textReview}>Chi tiết kinh nghiệm: {item.detail.experience}</Text>
                                <Text style={IndexStyles.StyleReviewInfor.textReview}>Chi tiết cảm nghĩ: {item.detail.feeling}</Text>
                                <Text style={IndexStyles.StyleReviewInfor.textReview}>Chi tiết chất lượng: {item.detail.quality}</Text>
                            </View>
                            <View style={IndexStyles.StyleReviewInfor.viewProduct}>
                                <Image source={{ uri: item.order_id.products[0].priceColor.image }} style={IndexStyles.StyleReviewInfor.imageProduct} />
                                <View style={IndexStyles.StyleReviewInfor.viewProductDetail}>
                                    <Text style={IndexStyles.StyleReviewInfor.textProduct}>{item.order_id.products[0].name} {item.order_id.products[0].storage} {item.order_id.products[0].model}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={200}
                />
            )}
        </View>
    )
}

export default ReviewInfor 