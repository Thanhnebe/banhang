import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { CartEntity } from '../../../../model/entity/IndexCart.entity'

import { Responsive } from '../../../../constant/Responsive'
import { COLOR } from '../../../../constant/Colors'

import { FormatPrice } from '../../../../utils/FormatPrice'
import { Icon } from '../../../../constant/Icon'

import { IndexStyles } from '../../../../import/IndexStyles'
import IndexHandleCart from '../../../../service/Api/IndexHandleCart'
import { useLazyGetProductsByIdQuery } from '../../../../service/Api/IndexProduct'

import { ItemDetailUpdateArticle, CustomModalConfirm, CustomCheckBox } from '../../../../import/IndexComponent'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useUpdateCartMutation, useUpdateStatusRemoveMutation } from '../../../../service/Api/IndexCart'

type PropsCart = {
    item: CartEntity,
    navigation: any,
    currentlyOpenSwipeable: any,
    decrementItemCount?: any,
    dispatch?: any,
    isSelected: boolean,
    onItemSelect: (itemId: string) => void,
}
const imageAnimated = new Animated.Value(0)

const ItemListCart = ({ item, navigation, currentlyOpenSwipeable, decrementItemCount, dispatch, isSelected, onItemSelect }: PropsCart) => {

    const [show, setShow] = useState<boolean>(false);

    const [trigger, { data }] = useLazyGetProductsByIdQuery();

    const [itemCartDetail, setItemCartDetail] = useState<any>(null);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [updateStatusRemove] = useUpdateStatusRemoveMutation();

    const [updateCart] = useUpdateCartMutation();

    const swipeableRef = useRef<Swipeable | null>(null);

    useEffect(() => {
        if (data) {
            setItemCartDetail(data.data[0]);
        }
    }, [data]);

    const handleSetShow = () => {
        if (item.products._id) {
            trigger(item.products._id);
            setShow(true);
        }
    };

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={IndexStyles.StylesItemListCart.viewDelete} onPress={() => IndexHandleCart.handleUpdateStatusRemove(updateStatusRemove, item._id, dispatch, decrementItemCount)}>
                <Text style={IndexStyles.StylesItemListCart.textDelete}>Xóa</Text>
            </TouchableOpacity>
        );
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={() => IndexHandleCart.handleSwipeableOpen(swipeableRef, currentlyOpenSwipeable)}
        >
            <TouchableOpacity style={IndexStyles.StylesItemListCart.container} onPress={() => navigation.navigate('StackMisc', { screen: 'DetailArticle', params: { _id: item.products._id } })}>
                <View style={IndexStyles.StylesItemListCart.viewCheckbox}>
                    <CustomCheckBox
                        checked={isSelected}
                        onPress={() => onItemSelect(item._id)}
                    />
                </View>
                <View style={IndexStyles.StylesItemListCart.viewImage}>
                    <Animated.Image
                        source={{ uri: item.products.priceColor.image as string }}
                        style={IndexStyles.StylesItemListCart.image}
                        onLoad={onImageLoad}
                    />
                </View>
                <View style={IndexStyles.StylesItemListCart.viewItem}>
                    <Text style={IndexStyles.StylesItemListCart.textNameProducts}>{item.products.name} {item.products.model} {item.products.storage}</Text>
                    <TouchableOpacity style={IndexStyles.StylesItemListCart.viewColor} onPress={handleSetShow}>
                        <Text style={IndexStyles.StylesItemListCart.textColorProducts}>{item.products.priceColor.color}</Text>
                        <Icon.DownSVG width={Responsive.wp(10)} height={Responsive.hp(5)} fill={'red'} />
                    </TouchableOpacity>
                    <Text style={IndexStyles.StylesItemListCart.textChangeProducts}>Đổi ý 7 ngày</Text>
                    <View style={IndexStyles.StylesItemListCart.viewRows}>
                        <Text style={IndexStyles.StylesItemListCart.textPriceProducts}>{FormatPrice(item.products.priceColor.price)}</Text>
                        <View style={IndexStyles.StylesItemListCart.viewQuantity}>
                            <TouchableOpacity onPress={() => IndexHandleCart.handleUpdateCart(updateCart, { _id: item._id, quantity: item.quantity + 1 })}>
                                <Icon.PlusSVG width={Responsive.wp(4)} height={Responsive.hp(5)} fill={COLOR.GREY} />
                            </TouchableOpacity>
                            <Text style={IndexStyles.StylesItemListCart.textQuantityProducts}>{item.quantity}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.quantity > 1) {
                                        IndexHandleCart.handleUpdateCart(updateCart, { _id: item._id, quantity: item.quantity - 1 });
                                    } else {
                                        setModalVisible(true);
                                    }
                                }}>
                                <Icon.MinusSVG width={Responsive.wp(5)} height={Responsive.hp(5)} fill={COLOR.GREY} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {show && itemCartDetail &&
                <ItemDetailUpdateArticle
                    show={show}
                    onDismiss={() => setShow(false)}
                    item={itemCartDetail}
                    enableBackDropDismiss={true}
                    quantity={item.quantity}
                    id={item._id}
                />
            }
            <CustomModalConfirm
                title={'Xác nhận'}
                message={'Bạn có chắc chắn muốn xóa sản phẩm này không?'}
                isVisible={modalVisible}
                onPressCancel={() => setModalVisible(false)}
                onPressConfirm={() => IndexHandleCart.handleUpdateStatusRemove(updateStatusRemove, item._id, dispatch, decrementItemCount)}
            />
        </Swipeable>
    )
}

export default ItemListCart

