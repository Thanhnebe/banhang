import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useRef } from 'react'
import { FontsROBOTO } from '../../../../constant/Fonts'

import { COLOR } from '../../../../constant/Colors'
import { Responsive } from '../../../../constant/Responsive'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import IndexHandleCart from '../../../../service/Api/IndexHandleCart'
import { Icon } from '../../../../constant/Icon'
import { CategoryState } from '../../../../model/entity/IndexCategory.entity'
import { BannerState } from '../../../../model/entity/IndexBanner.entity'
import FastImage from 'react-native-fast-image'

type PropsProduct = {
    item: BannerState,
    navigation: any,
    currentlyOpenSwipeable: any,
}

const imageAnimated = new Animated.Value(0)

const ItemAdminListBanner = ({ item, navigation, currentlyOpenSwipeable }: PropsProduct) => {

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
                onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'EditBanner', params: { id: item._id } })}>
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
            <TouchableOpacity style={styles.viewItem}
                onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'EditBanner', params: { id: item._id } })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(5) }}>
                    <FastImage
                        source={{
                            uri: item.images as string,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.image}
                    />
                    <Text style={styles.textName}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default ItemAdminListBanner

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'column',
        width: Responsive.wp(95),
        height: Responsive.hp(15),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        margin: Responsive.wp(2),
        shadowColor: COLOR.BLACK,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(5),
    },
    image: {
        width: Responsive.wp(53),
        height: Responsive.hp(18),
        resizeMode: 'contain',
    },
    textName: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.BLACK,
        fontWeight: '700',
        width: Responsive.wp(67),
    },
    viewDelete: {
        width: Responsive.wp(20),
        height: Responsive.hp(15),
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