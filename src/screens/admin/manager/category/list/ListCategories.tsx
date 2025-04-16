import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import StyleListCategories from './StyleListCategories'

import { CustomHeader, ItemAdminListCategories } from '../../../../../import/IndexComponent'
import { useAppSelector } from '../../../../../import/IndexFeatures'

import { FlashList } from '@shopify/flash-list'
import { COLOR } from '../../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'
import { Icon } from '../../../../../constant/Icon'

import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListCategories: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const data = useAppSelector(state => state.Category);

    const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

    return (
        <View style={StyleListCategories.container}>
            <View style={StyleListCategories.viewheader}>
                <View style={StyleListCategories.headerTitle}>
                    <CustomHeader title='Danh sách danh mục' color='red' />
                    <TouchableOpacity onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'AddCategories' })}>
                        <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleListCategories.containerBody}>
                <FlashList
                    data={data.data}
                    renderItem={({ item }) => <ItemAdminListCategories item={item} navigation={navigation} currentlyOpenSwipeable={currentlyOpenSwipeable} />}
                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}

export default ListCategories