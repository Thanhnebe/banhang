import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'

import { IndexStyles } from '../../../../import/IndexStyles'
import { useAppSelector } from '../../../../import/IndexFeatures'
import { InputCustom } from '../../../../import/IndexComponent'
import { Icon } from '../../../../constant/Icon'

import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list'
import { ItemArticle } from '../../../../import/IndexComponent'

const SearchHome: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const product = useAppSelector(state => state.Product.data)
    const [search, setSearch] = useState<string>('')

    const searchProduct = product.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    })


    return (
        <View style={IndexStyles.StyleSearchHome.container}>
            <LinearGradient colors={['#E33545', '#F9405C', '#E9515E']} style={IndexStyles.StyleSearchHome.viewheader}>
                <View style={IndexStyles.StyleSearchHome.headerSmall}>
                    <View style={IndexStyles.StyleSearchHome.containerInput}>
                        <InputCustom
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                            placeholder='Tìm kiếm sản phẩm'
                            style={IndexStyles.StyleSearchHome.inputsearch}
                            icon={<Icon.SearchSVG width={20} height={20} fill='#000' />}
                        />
                        <TouchableOpacity style={IndexStyles.StyleSearchHome.buttonCancel} onPress={() => setSearch('')}>
                            <Image source={Icon.CANCELSEARCH} style={IndexStyles.StyleSearchHome.iconCancelsearch} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={IndexStyles.StyleSearchHome.textTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={IndexStyles.StyleSearchHome.containerBody}>
                {search.length > 0 && searchProduct.length > 0 ? (
                    <FlashList
                        data={searchProduct}
                        renderItem={({ item }) => <ItemArticle item={item} navigation={navigation} />}
                        keyExtractor={(item) => item._id}
                        estimatedItemSize={100}
                        showsVerticalScrollIndicator={false}
                        pagingEnabled={true}
                        numColumns={2}
                    />
                ) : (
                    search.length > 0 && (
                        <View style={IndexStyles.StyleSearchHome.viewNoProduct}>
                            <Image source={Icon.NotFoundProduct} style={IndexStyles.StyleSearchHome.iconNoProduct} />
                            <Text style={IndexStyles.StyleSearchHome.textNoProduct}>Không tìm thấy sản phẩm</Text>
                        </View>
                    )
                )}
            </View>
        </View>
    )
}

export default SearchHome