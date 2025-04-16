import { View, Text, Animated, Share } from 'react-native'
import React, { useCallback, useState } from 'react'
import { calculateDiscountedPrice, FormatPrice } from '../../utils/FormatPrice'
import { DetailProductParams } from '../../model/entity/IndexProduct.entity';


const ShareItemDetail = () => {
    const imageAnimated = new Animated.Value(0);
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    const shareProduct = async (item: DetailProductParams) => {
        try {
            const shareResponse = await Share.share({
                title: item.name,
                message: `Hãy xem sản phẩm này: ${item.name} ${item.storage} ${item.model} với giá ${FormatPrice(calculateDiscountedPrice(item.priceColor.map((item) => item.price)[0], item.discount.percentage))}`,
            });
            if (shareResponse.action === Share.sharedAction) {
                if (shareResponse.activityType) {
                    console.log('Shared with activity type of', shareResponse.activityType)
                } else {
                    console.log('Shared')
                }
            } else if (shareResponse.action === Share.dismissedAction) {
                console.log('Dismissed', shareResponse)
            }
        } catch (error) {
            console.log('Error =>', error)
        }
    }

    const ToggleDescription = () => {
        setShowDescription(!showDescription)
    };

    return {
        onImageLoad, shareProduct, showDescription, setShowDescription, ToggleDescription,
    }
}

export default ShareItemDetail