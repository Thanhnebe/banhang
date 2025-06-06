import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useRef } from 'react'
import { FontsROBOTO } from '../../../../constant/Fonts'

import { COLOR } from '../../../../constant/Colors'
import { Responsive } from '../../../../constant/Responsive'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import IndexHandleCart from '../../../../service/Api/IndexHandleCart'
import { Icon } from '../../../../constant/Icon'
import { VoucherEntity } from '../../../../model/entity/Index.Voucher.entity'
import { FormatDate2 } from '../../../../utils/FormatDate'

type PropsProduct = {
    item: VoucherEntity,
    navigation: any,
    currentlyOpenSwipeable: any,
}

const imageAnimated = new Animated.Value(0)

const ItemAdminListVoucher = ({ item, navigation, currentlyOpenSwipeable }: PropsProduct) => {

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
                onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'EditVouchers', params: { id: item._id } })}>
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
                onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'EditVouchers', params: { id: item._id } })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(5) }}>
                    <Animated.Image
                        source={{ uri: item.images as string }}
                        style={styles.image}
                        onLoad={onImageLoad}
                    />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Tên:</Text>
                            <Text style={styles.textPrice}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Mã:</Text>
                            <Text style={styles.textPrice}>{item.code}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Giảm giá:</Text>
                            <Text style={styles.textPrice}>{item.discount}%</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Ngày hết hạn:</Text>
                            <Text style={styles.textPrice}>{FormatDate2(item.expirationDate)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Trạng thái:</Text>
                            <Text style={styles.textPrice}>{item.status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Ngày tạo:</Text>
                            <Text style={styles.textPrice}>{FormatDate2(item.createdAt)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Số lần sử dụng:</Text>
                            <Text style={styles.textPrice}>{item.userUsed.length}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Số lần còn lại:</Text>
                            <Text style={styles.textPrice}>{item.usageLimit}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Tặng mã riêng cho người dùng</Text>
                            <Text style={styles.textPrice}>{item.usersApplicable.length}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textName}>Trạng thái</Text>
                            <Text style={styles.textPrice}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default ItemAdminListVoucher

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'column',
        width: Responsive.wp(95),
        height: Responsive.hp(28),
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
        width: Responsive.wp(20),
        height: Responsive.hp(18),
        resizeMode: 'contain',
        tintColor: COLOR.REDONE
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
    textName: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
    },
    textPrice: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.REDONE,
        marginLeft: Responsive.wp(2),
    }
})