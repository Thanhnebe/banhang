import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

import { Icon } from '../../../../constant/Icon'
import { IndexStyles } from '../../../../import/IndexStyles'
import { COLOR } from '../../../../constant/Colors'

import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppSelector, useAppDispatch } from '../../../../import/IndexFeatures'

import { FlashList } from '@shopify/flash-list'

import ItemArticle from '../../../../components/item/product/list/ItemArticle'
import { fetProductsPagination } from '../../../../service/Api/IndexProduct'
import { TypeNameProductParams } from '../../../../model/entity/IndexProduct.entity'
import { CustomHeader } from '../../../../import/IndexComponent'

const Article: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const route = useRoute<TypeNameProductParams['route']>();
    const { name } = route.params
    const data = useAppSelector(state => state.ProductPagination)
    
    const handleOnReached = () => {
        if (!data.loading) {
            dispatch(fetProductsPagination({ page: data.nextPage, limit: 10 }));
        }
    };

    const renderFooter = () => {
        if (!data.loading) return null;
        return (
            <View style={IndexStyles.StyleArticle.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        );
    };

    return (
        <View style={IndexStyles.StyleArticle.container}>
            <View style={IndexStyles.StyleArticle.headerContainer}>
                <View style={IndexStyles.StyleArticle.viewHeader}>
                    <CustomHeader title='Sản phẩm nổi bật' color={COLOR.WHITE} />
                </View>
            </View>
            <View style={IndexStyles.StyleArticle.containerBody}>
                <FlashList
                    data={data.data.filter(item => item.category.name === name)}
                    renderItem={({ item }) => <ItemArticle item={item} navigation={navigation} />}
                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    numColumns={2}
                    estimatedItemSize={500}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleOnReached}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}

export default Article