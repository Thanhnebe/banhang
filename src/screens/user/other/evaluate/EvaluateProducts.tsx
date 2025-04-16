import { View, Text, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndexStyles } from '../../../../import/IndexStyles'
import { CustomHeader, CustomAirbnbRating } from '../../../../import/IndexComponent'

import { useDetailEvaluateQuery } from '../../../../service/Api/Index.Evaluate';
import { Icon } from '../../../../constant/Icon';
import { ScrollView } from 'react-native-gesture-handler';

import { useUpdateEvaluateMutation } from '../../../../service/Api/Index.Evaluate';


type detailParams = {
    id: string
}

type DetailType = {
    experience: string;
    feeling: string;
    quality: string;
};

const EvaluateProducts: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const route = useRoute<RouteProp<Record<string, detailParams>, string>>()

    const { id } = route.params

    const { data, error, isLoading } = useDetailEvaluateQuery(id)

    const item = data?.data || {}

    const itemProducts = data?.data.order_id.products

    const [rating, setRating] = useState<number>(5)

    const [comment, setComment] = useState<string>('')

    const [detail, setDetail] = useState<DetailType>({
        experience: '',
        feeling: '',
        quality: ''
    })

    const [updateEvaluate] = useUpdateEvaluateMutation()

    const handleUpdateEvaluate = async () => {
        try {
            const body = {
                rating: rating,
                comment: comment,
                detail: detail,
                status: 'Đã đánh giá',
                updated_at: new Date().toISOString()
            }
            const result = await updateEvaluate({ id: id, body: body }).unwrap()
            if (result.data) {
                navigation.goBack()
            }
        } catch (error) {
            console.log("🚀 ~ handleUpdateEvaluate ~ error:", error)
        }
    }

    return (
        <View style={IndexStyles.StyleEvaluateProducts.container} >
            <View style={IndexStyles.StyleEvaluateProducts.viewheader}>
                <View style={IndexStyles.StyleEvaluateProducts.headerTitle}>
                    <CustomHeader title='Đánh giá sản phẩm' color='white' />
                    <TouchableOpacity onPress={handleUpdateEvaluate}>
                        <Text style={IndexStyles.StyleEvaluateProducts.textHeader}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={IndexStyles.StyleEvaluateProducts.containerBody}>
                    <View style={IndexStyles.StyleEvaluateProducts.viewProducts}>
                        {itemProducts?.map((item: any, index: number) => (
                            <View key={index} style={IndexStyles.StyleEvaluateProducts.viewProduct}>
                                <Image source={{ uri: item.priceColor.image }} style={IndexStyles.StyleEvaluateProducts.imageProduct} />
                                <View style={IndexStyles.StyleEvaluateProducts.viewProductDetail}>
                                    <Text style={IndexStyles.StyleEvaluateProducts.textProduct}>{item.name} {item.storage} {item.model}</Text>
                                    <Text style={IndexStyles.StyleEvaluateProducts.textProduct}>Màu: {item.priceColor.color}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={IndexStyles.StyleEvaluateProducts.line} />
                    </View>
                    <View style={IndexStyles.StyleEvaluateProducts.rating}>
                        <Text style={IndexStyles.StyleEvaluateProducts.textRating}>Chất lượng sản phẩm</Text>
                        <View style={IndexStyles.StyleEvaluateProducts.viewRating}>
                            <CustomAirbnbRating
                                reviews={["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"]}
                                rating={rating}
                                setRating={setRating}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={IndexStyles.StyleEvaluateProducts.viewMedia}>
                        <Text style={IndexStyles.StyleEvaluateProducts.textMedia}>Vui lòng đánh giá sản phẩm gồm hình ảnh, video để chia sẽ chất lượng cho chúng tôi biết</Text>
                        <View style={IndexStyles.StyleEvaluateProducts.Media}>
                            <TouchableOpacity style={IndexStyles.StyleEvaluateProducts.viewAddMedia}>
                                <Icon.CameraSVG width={25} height={25} fill='red' />
                                <Text style={IndexStyles.StyleEvaluateProducts.textAddMedia}>Thêm hình ảnh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={IndexStyles.StyleEvaluateProducts.viewImage}>
                                <Icon.VideoSVG width={25} height={25} fill='red' />
                                <Text style={IndexStyles.StyleEvaluateProducts.textAddMedia}>Thêm video</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={IndexStyles.StyleEvaluateProducts.viewReviews}>
                        <View style={IndexStyles.StyleEvaluateProducts.viewInput}>
                            <Text style={IndexStyles.StyleEvaluateProducts.textReviews}>Kinh nghiệm sử dụng</Text>
                            <TextInput
                                style={IndexStyles.StyleEvaluateProducts.inputReviews}
                                placeholder='Kinh nghiệm sử dụng'
                                multiline={true}
                                value={detail.experience}
                                onChangeText={(text) => setDetail({ ...detail, experience: text })}
                            />
                        </View>
                        <View style={IndexStyles.StyleEvaluateProducts.viewInput}>
                            <Text style={IndexStyles.StyleEvaluateProducts.textReviews}>Cảm nghĩ của bạn</Text>
                            <TextInput
                                style={IndexStyles.StyleEvaluateProducts.inputReviews}
                                placeholder='Cảm nhận về sản phẩm'
                                multiline={true}
                                value={detail.feeling}
                                onChangeText={(text) => setDetail({ ...detail, feeling: text })}
                            />
                        </View>
                        <View style={IndexStyles.StyleEvaluateProducts.viewInput}>
                            <Text style={IndexStyles.StyleEvaluateProducts.textReviews}>Chất lượng sản phẩm này như thế nào?</Text>
                            <TextInput
                                style={IndexStyles.StyleEvaluateProducts.inputReviews}
                                placeholder='Chất lượng sản phẩm có tốt không?'
                                multiline={true}
                                value={detail.quality}
                                onChangeText={(text) => setDetail({ ...detail, quality: text })}
                            />
                        </View>
                        <View style={IndexStyles.StyleEvaluateProducts.decor} />
                        <TextInput
                            style={IndexStyles.StyleEvaluateProducts.inputReviews}
                            placeholder='Hãy chia sẽ nhận xét cho sản phẩm này nhé!'
                            multiline={true}
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EvaluateProducts 