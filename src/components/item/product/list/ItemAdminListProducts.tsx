import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { FontsROBOTO } from '../../../../constant/Fonts'

import { COLOR } from '../../../../constant/Colors'
import { ProductPaginationState } from '../../../../model/entity/IndexProduct.entity'
import { Responsive } from '../../../../constant/Responsive'

import { FormatPrice, calculateDiscountedPrice } from '../../../../utils/FormatPrice'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IndexHandleCart from '../../../../service/Api/IndexHandleCart'
import { Icon } from '../../../../constant/Icon'
import FastImage from 'react-native-fast-image'

type PropsProduct = {
    item: ProductPaginationState,
    navigation: any,
    currentlyOpenSwipeable: any,
}

const imageAnimated = new Animated.Value(0)

const ItemAdminListProducts = ({ item, navigation, currentlyOpenSwipeable }: PropsProduct) => {

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const swipeableRef = useRef<Swipeable | null>(null);


    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.viewDelete}
                onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'EditProducts', params: { id: item._id } })}>
                <Icon.EditSVG width={30} height={30} fill={COLOR.WHITE} />
            </TouchableOpacity>
        );
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={() => IndexHandleCart.handleSwipeableOpen(swipeableRef, currentlyOpenSwipeable)}
        >
            <TouchableOpacity style={styles.viewItem}>
                <Text style={styles.textdiscount}>Giảm {item.discount.percentage}%</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ top: Responsive.hp(1) }}>
                        <FastImage
                            source={{
                                uri: item.images[0] as string,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.image}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', gap: Responsive.hp(0.5), justifyContent: 'center', }}>
                        <Text style={styles.textName}>Tên sản phẩm: {item.name} {item.storage} {item.model}</Text>
                        <Text style={styles.textPriceDiscount}>Giá được giảm: {FormatPrice(calculateDiscountedPrice(item.priceColor[0].price, item.discount.percentage))}</Text>
                        <Text style={styles.textPrice}>Giá gốc: {FormatPrice(item.priceColor[0].price)}</Text>
                        <Text style={styles.textPrice}>Trạng thái: {item.status === 'available' ? 'Còn hàng' : 'Hết hàng'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default ItemAdminListProducts

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'column',
        width: Responsive.wp(95),
        height: Responsive.hp(23),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        margin: Responsive.wp(2),
        shadowColor: COLOR.BLACK,
        elevation: 10,
        alignSelf: 'center',
    },
    image: {
        width: Responsive.wp(28),
        height: Responsive.hp(14),
        resizeMode: 'contain',
    },
    textName: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.BLACK,
        fontWeight: '700',
        width: Responsive.wp(67),
    },
    textPrice: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.1),
        color: COLOR.BLACK,
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
        textAlignVertical: 'center',
        fontSize: Responsive.RFPercentage(1.9),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    viewDelete: {
        width: Responsive.wp(20),
        height: Responsive.hp(23),
        backgroundColor: COLOR.REDTWO,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDelete: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.WHITE,
        textAlign: 'center',
    },
})