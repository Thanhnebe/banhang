import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../../../import/IndexFeatures'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndexStyles } from '../../../../import/IndexStyles';
import { FlashList } from '@shopify/flash-list';
import { CustomHeader, ItemArticle } from '../../../../import/IndexComponent';
import { COLOR } from '../../../../constant/Colors';

const AllCategoryProduct: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const data = useAppSelector(state => state.Product)

    const renderFooter = () => {
        if (!data.loading) return null;
        return (
            <View style={IndexStyles.StyleAllCategoryProduct.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        );
    };

    return (
        <View style={IndexStyles.StyleAllCategoryProduct.container}>
            <View style={IndexStyles.StyleAllCategoryProduct.headerContainer}>
                <View style={IndexStyles.StyleAllCategoryProduct.viewHeader}>
                    <CustomHeader title='Tất cả sản phẩm' color={COLOR.WHITE} />
                </View>
            </View>
            <View style={IndexStyles.StyleAllCategoryProduct.containerBody}>
                <FlashList
                    data={data.data}
                    renderItem={({ item }) => <ItemArticle item={item} navigation={navigation} />}
                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    numColumns={2}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}

export default AllCategoryProduct