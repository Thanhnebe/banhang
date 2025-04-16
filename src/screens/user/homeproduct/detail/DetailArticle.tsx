import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect } from 'react'

import { IndexStyles } from '../../../../import/IndexStyles'
import { COLOR } from '../../../../constant/Colors'

import { useRoute, useNavigation } from '@react-navigation/native'
import { useGetProductsByIdQuery } from '../../../../service/Api/IndexProduct'
import { TypeDetailPoduct } from '../../../../model/entity/IndexProduct.entity'

import { ItemDetailArticle } from '../../../../import/IndexComponent'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'
import { useAppSelector, useAppDispatch } from '../../../../import/IndexFeatures'

const DetailArticle: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const route = useRoute<TypeDetailPoduct['route']>()
    const { _id } = route?.params
    const { data, isLoading } = useGetProductsByIdQuery(_id)
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.root.Auth.user._id)
    const cartData = useAppSelector(state => state.root.CountCart.itemCount);


    if (isLoading) {
        return (
            <View style={IndexStyles.StyleDetailArticle.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        )
    }

    const MemoizedItemDetailArticle = React.memo(ItemDetailArticle);

    return (
        <View style={IndexStyles.StyleDetailArticle.container}>
            {data?.data.map((item) => (
                <MemoizedItemDetailArticle
                    item={item}
                    navigation={navigation}
                    key={item._id}
                    userId={userId}
                    dispatch={dispatch}
                    countCart={cartData}
                />
            ))}
        </View>
    )
}

export default DetailArticle