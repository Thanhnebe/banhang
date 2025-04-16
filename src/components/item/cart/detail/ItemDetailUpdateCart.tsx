import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions, Pressable } from 'react-native';

import { calculateDiscountedPrice, FormatPrice } from '../../../../utils/FormatPrice';
import { IndexStyles } from '../../../../import/IndexStyles';

import { Icon } from '../../../../constant/Icon';
import { DetailProductParams } from '../../../../model/entity/IndexProduct.entity';
import ToastMessage from '../../../../utils/ToastMessage';

import { COLOR } from '../../../../constant/Colors';
import { Responsive } from '../../../../constant/Responsive';
import { Portal } from 'react-native-paper';

import { PanGestureHandler } from 'react-native-gesture-handler';
import { findImageByColor } from '../../../../utils/FindImageColor';
import { useUpdateCartMutation } from '../../../../service/Api/IndexCart';

type PropsCart = {
    item: DetailProductParams,
    show: boolean;
    onDismiss: () => void;
    enableBackDropDismiss?: boolean;
    quantity?: number | undefined;
    id?: string;
}

const ItemDetailUpdateArticle: React.FC<PropsCart> = ({ item, show, onDismiss, enableBackDropDismiss = true, quantity, id }) => {
    const [selectedPrice, setSelectedPrice] = useState<{ price: number, color: string }>({
        price: item.priceColor[0].price ?? 0,
        color: item.priceColor[0].color ?? '',
    });

    const [discountedPrice, setDiscountedPrice] = useState<number>(calculateDiscountedPrice(selectedPrice.price, item.discount.percentage));

    const [selectedImage, setSelectedImage] = useState<string>(item.images[0].toString());

    const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity ?? 1);

    const [open, setopen] = useState<boolean>(show);

    const bottomsheetHeight = Dimensions.get('window').height * 0.5;

    const bottomsheet = useRef(new Animated.Value(-bottomsheetHeight)).current;

    const [updateCart] = useUpdateCartMutation();

    const onGestureEvent = (event: any) => {
        if (event.nativeEvent.translationY > 0) {
            bottomsheet.setValue(-event.nativeEvent.translationY);
        }
    };

    const onGestureEnd = (event: any) => {
        if (event.nativeEvent.translationY > bottomsheetHeight / 2) {
            onDismiss();
        } else {
            bottomsheet.setValue(0);
        }
    };

    useEffect(() => {
        if (show) {
            setopen(show);
            Animated.timing(bottomsheet, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(bottomsheet, {
                toValue: -bottomsheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setopen(false);
            });
        }
    }, [show]);

    if (!open) {
        return null;
    }

    const handlePress = (cart: { price: number, color: string }) => {
        setSelectedPrice({ price: cart.price, color: cart.color });
        setDiscountedPrice(calculateDiscountedPrice(cart.price, item.discount.percentage));
        const image = findImageByColor(item, cart.color);
        setSelectedImage(image.toString());
    };

    const handleUpdateCart = async () => {
        try {
            const data: any = {
                _id: id,
                products: {
                    _id: item._id,
                    name: item.name,
                    model: item.model,
                    storage: item.storage,
                    priceColor: {
                        color: selectedPrice.color,
                        price: selectedPrice.price,
                        image: selectedImage,
                    }
                },
                quantity: selectedQuantity,
            }
            const res = await updateCart(data)
            if (res.data) {
                ToastMessage('success', 'Cập nhật giỏ hàng thành công');
                onDismiss();
            } else {
                ToastMessage('error', 'Cập nhật giỏ hàng thất bại');
            }
        } catch (error) {
            console.log('handleUpdateCart error:', error)
        }
    }

    return (
        <Portal>
            <Pressable style={IndexStyles.StylesItemDetailUpdateCart.backdrop} onPress={enableBackDropDismiss ? onDismiss : undefined} />
            <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
                <Animated.View
                    style={[IndexStyles.StylesItemDetailUpdateCart.container, { bottom: bottomsheet }]}>
                    <View style={IndexStyles.StylesItemDetailUpdateCart.containerBody}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Responsive.wp(2) }}>
                                <View style={{ flexDirection: 'row', marginTop: Responsive.hp(1) }}>
                                    <Image source={{ uri: selectedImage }} style={{ width: Responsive.wp(26), height: Responsive.hp(15), top: Responsive.hp(1) }} />
                                    <Icon.CloseSVG width={Responsive.wp(5)} height={Responsive.hp(5)} fill={COLOR.GREY} onPress={onDismiss} style={IndexStyles.StylesItemDetailUpdateCart.iconClose} />
                                </View>
                                <View style={{ flexDirection: 'column', top: Responsive.hp(5) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Responsive.wp(2) }}>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textPrice}>{FormatPrice(selectedPrice.price)}</Text>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textPriceDiscount}>{FormatPrice(discountedPrice)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Responsive.wp(0.25) }}>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textstock}>Kho:</Text>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textstock}>{item.stock}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={IndexStyles.StylesItemDetailUpdateCart.lineHeight} />
                        <View style={IndexStyles.StylesItemDetailUpdateCart.containerText}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(1), paddingBottom: Responsive.hp(1) }}>
                                {item.priceColor.map((cart, index) => (
                                    <TouchableOpacity key={index}
                                        style={[IndexStyles.StylesItemDetailUpdateCart.viewPriceColor,
                                        selectedPrice.color === cart.color ? { backgroundColor: COLOR.REDONE } : { backgroundColor: COLOR.ORANGE }]}
                                        onPress={() => handlePress(cart)}>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textPirceColor}>{cart.color}</Text>
                                        <Text style={IndexStyles.StylesItemDetailUpdateCart.textPirceColor}>{FormatPrice(calculateDiscountedPrice(cart.price, item.discount.percentage))}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={IndexStyles.StylesItemDetailUpdateCart.containerQuantity}>
                                <Text style={IndexStyles.StylesItemDetailUpdateCart.textTilte}>Số lượng</Text>
                                <View style={IndexStyles.StylesItemDetailUpdateCart.containerQuantityItem}>
                                    <TouchableOpacity style={IndexStyles.StylesItemDetailUpdateCart.viewQuantity} onPress={() => setSelectedQuantity(selectedQuantity + 1)}>
                                        <Icon.PlusSVG width={Responsive.wp(3)} height={Responsive.hp(4)} fill={COLOR.REDONE} />
                                    </TouchableOpacity>
                                    <Text style={IndexStyles.StylesItemDetailUpdateCart.textQuantity}>{selectedQuantity}</Text>
                                    <TouchableOpacity style={IndexStyles.StylesItemDetailUpdateCart.viewQuantity} onPress={() => { if (selectedQuantity > 1) { setSelectedQuantity(selectedQuantity - 1) } }}>
                                        <Icon.MinusSVG width={Responsive.wp(4)} height={Responsive.hp(5)} fill={COLOR.REDONE} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={IndexStyles.StylesItemDetailUpdateCart.viewTotal} onPress={handleUpdateCart}>
                            <Text style={IndexStyles.StylesItemDetailUpdateCart.textTotal}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </Portal>
    );
};

export default ItemDetailUpdateArticle;
