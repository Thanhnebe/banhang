import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { IndexStyles } from '../../import/IndexStyles';
import { Icon } from '../../constant/Icon';
import { Responsive } from '../../constant/Responsive';
import { COLOR } from '../../constant/Colors';

const CartIconWithAnimation = ({ navigation }: any) => {
    const animatedY = useSharedValue(0);
    const animatedX = useSharedValue(0);
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedY.value }, { translateX: animatedX.value }, { scale: scale.value }],
        };
    });

    const startAnimation = () => {
        if (animatedX.value == 0){
            scale.value = 1
            animatedX.value = withTiming(150, { duration: 1500 });
            animatedY.value = withTiming(-550, { duration: 1500 });
        }
    };

    return (
        <TouchableOpacity
            style={IndexStyles.StyleItemDetailArticle.viewChat}
            onPress={startAnimation}>
            <Animated.View style={[IndexStyles.StyleItemDetailArticle.viewCart, animatedStyle]}>
                <Icon.ShoppingCartSVG fill={COLOR.REDONE} width={Responsive.wp(5)} height={Responsive.hp(5)} />
            </Animated.View>
            <Text style={IndexStyles.StyleItemDetailArticle.textCart}>Giỏ hàng</Text>
        </TouchableOpacity>
    );
};

export default CartIconWithAnimation;
