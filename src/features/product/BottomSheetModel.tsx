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

const UseBottomSheetModel = ({ item }: Props) => {

    const dispatch = useAppDispatch()

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['50%', '50%'], []);


    const snapPointsCart = useMemo(() => ['60%', '60%'], []);

    const [selectedItem, setSelectedItem] = useState<DetailProductParams | null>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setSelectedItem(item);
    }, []);

    const handleDismissModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
        setSelectedItem(null);
    }, []);

    const handleAddFavourite = async (userId: string, navigation: any) => {
        try {
            if (userId === '') {
                navigation.navigate('AuthUser', { screen: 'AuthLogin' });
            } else {
                if (userId) {
                    await dispatch(addFavourite({ userId, productId: item._id }))
                    ToastMessage('success', 'Đã thêm vào yêu thích');
                    dispatch(fetchFavourites(userId))
                } else {
                    navigation.navigate('AuthUser', { screen: 'AuthLogin' });
                }
            }
        } catch (error) {
            console.log('handleAddFavourite error:', error);
        }
    }



    return { bottomSheetModalRef, snapPoints, snapPointsCart, selectedItem, setSelectedItem, handlePresentModalPress, handleDismissModal, handleAddFavourite }
}

export default UseBottomSheetModel