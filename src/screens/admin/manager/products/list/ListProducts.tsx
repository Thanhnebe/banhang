import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import StyleListProducts from './StyleListProducts'

import { CustomHeader, ItemAdminListProducts } from '../../../../../import/IndexComponent'
import { useAppDispatch, useAppSelector } from '../../../../../import/IndexFeatures'
import { fetProductsPagination } from '../../../../../service/Api/IndexProduct'

import { FlashList } from '@shopify/flash-list'
import { COLOR } from '../../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from '../../../../../constant/Icon'

const ListProducts: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const dispatch = useAppDispatch();

    const data = useAppSelector(state => state.ProductPagination);

    const productlength = useAppSelector(state => state.Product.data.length);

    const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

    const handleOnReached = () => {
        if (!data.loading) {
            dispatch(fetProductsPagination({ page: data.nextPage, limit: 10 }));
        }
    };

    const renderFooter = () => {
        if (!data.loading) return null;
        return (
            <View style={StyleListProducts.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        );
    };

    return (
        <View style={StyleListProducts.container}>
            <View style={StyleListProducts.viewheader}>
                <View style={StyleListProducts.headerTitle}>
                    <CustomHeader title='Danh sách sản phẩm' color='red' />
                    <TouchableOpacity onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'AddProducts' })}>
                        <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleListProducts.containerBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, bottom: 5 }}>
                    <Text style={StyleListProducts.textTitle}>Số lượng sản phẩm</Text>
                    <Text style={StyleListProducts.textNumber}>{productlength}</Text>
                </View>
                <FlashList
                    data={data.data}
                    renderItem={({ item }) => <ItemAdminListProducts item={item} navigation={navigation} currentlyOpenSwipeable={currentlyOpenSwipeable} />}
                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleOnReached}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}

export default ListProducts