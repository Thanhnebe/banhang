import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { FontsROBOTO } from '../../../constant/Fonts'
import { COLOR } from '../../../constant/Colors'
import { ProductState } from '../../../model/entity/IndexProduct.entity'
import FastImage from 'react-native-fast-image'
import { Responsive } from '../../../constant/Responsive'
import { FormatPrice, calculateDiscountedPrice } from '../../../utils/FormatPrice'
import { useAppSelector } from '../../../import/IndexFeatures'
import { Icon } from '../../../constant/Icon'
import IndexHandleFavourites from '../../../service/Api/IndexHandleDetails'

type PropsProduct = {
    item: ProductState,
    navigation: any,
    userId?: any,
    dispatch?: any,
}
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)
const imageAnimated = new Animated.Value(0)

const ItemProductHomePage = ({ item, navigation, userId, dispatch }: PropsProduct) => {
    const favourites = useAppSelector((state) => state.Favourites.items);
    const isFavourite = favourites.some(favItem => favItem.productId._id === item._id);

    const onFastImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.viewItem} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailArticle', params: { _id: item._id } })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textdiscount}>Giảm {item.discount.percentage}%</Text>
                    {isFavourite ? (
                        <TouchableOpacity style={styles.viewHeart} onPress={() => IndexHandleFavourites.handleRemoveFavourite(favourites.find(favItem => favItem.productId._id === item._id)?._id as string, dispatch, userId)}>
                            <Icon.HeartCheckedSVG width={Responsive.wp(5)} height={Responsive.hp(3)} fill={COLOR.REDONE} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.viewHeart} onPress={() => IndexHandleFavourites.handleAddFavourite(item, userId, navigation, dispatch)}>
                            <Icon.HeartSVG width={Responsive.wp(5)} height={Responsive.hp(3)} fill={COLOR.BLACKONE} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ paddingHorizontal: Responsive.wp(2), gap: Responsive.hp(1) }}>
                    <AnimatedFastImage
                        source=
                        {{
                            uri: item.images[0] as string,
                            cache: FastImage.cacheControl.immutable,
                            priority: FastImage.priority.high,
                        }}
                        style={[styles.image, { opacity: imageAnimated }]}
                        resizeMode={FastImage.resizeMode.contain}
                        onLoad={onFastImageLoad}
                    />
                    <Text style={styles.textName}>{item.name} {item.storage} {item.model}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Responsive.wp(2) }}>
                        <Text style={styles.textPriceDiscount}>{FormatPrice(calculateDiscountedPrice(item.priceColor[0].price, item.discount.percentage))}</Text>
                        <Text style={styles.textPrice}>{FormatPrice(item.priceColor[0].price)}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ItemProductHomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewItem: {
        flexDirection: 'column',
        width: Responsive.wp(58),
        height: Responsive.hp(43),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        margin: Responsive.wp(2),
        shadowColor: COLOR.BLACK,
        elevation: 10,
        alignSelf: 'center',
    },
    image: {
        width: Responsive.wp(45),
        height: Responsive.hp(25),
        alignSelf: 'center',
    },
    textName: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.BLACK,
        fontWeight: '700',
    },
    textPrice: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.1),
        color: COLOR.BLACK,
        textDecorationLine: 'line-through',
    },
    textPriceDiscount: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.REDONE,
    },
    textdiscount: {
        width: Responsive.wp(20),
        height: Responsive.hp(2.8),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLOR.WHITE,
        textAlign: 'center',
        fontSize: Responsive.RFPercentage(1.9),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    viewHeart: {
        right: Responsive.wp(2),
    },
})