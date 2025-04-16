import { View, Text, Animated, Share, Dimensions } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { DetailProductParams } from '../../model/entity/IndexProduct.entity';
import { useAppDispatch } from '../redux/ReduxHook';
import ToastMessage from '../../utils/ToastMessage';
import { addFavourite, fetchFavourites } from '../../redux/slices/Favourties.Slice';


type Props = {
    item?: any;
}

const UseBottomSheetModallCart = ({ item }: Props) => {

    const [open, setopen] = useState<boolean>(false);

    const bottomsheetHeight = Dimensions.get('window').height * 0.5;

    const bottomsheet = useRef(new Animated.Value(-bottomsheetHeight)).current;

    const onDismiss = useCallback(() => {
        setopen(false);
        Animated.timing(bottomsheet, {
            toValue: -bottomsheetHeight,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [bottomsheet, bottomsheetHeight]);

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



    return { bottomsheet, bottomsheetHeight, open, setopen, onDismiss, onGestureEvent, onGestureEnd}
}

export default UseBottomSheetModallCart