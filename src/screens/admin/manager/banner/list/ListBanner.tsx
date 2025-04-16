import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import StyleListBanner from './StyleListBanner'

import { CustomHeader, ItemAdminListBanner } from '../../../../../import/IndexComponent'
import { useAppSelector } from '../../../../../import/IndexFeatures'

import { FlashList } from '@shopify/flash-list'
import { COLOR } from '../../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'
import { Icon } from '../../../../../constant/Icon'

import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListBanner: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const data = useAppSelector(state => state.Banner);

    const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

    return (
        <View style={StyleListBanner.container}>
            <View style={StyleListBanner.viewheader}>
                <View style={StyleListBanner.headerTitle}>
                    <CustomHeader title='Danh sách quảng cáo' color='red' />
                    <TouchableOpacity onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'AddBanner' })}>
                        <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleListBanner.containerBody}>
                <FlashList
                    data={data.data}
                    renderItem={({ item }) => <ItemAdminListBanner item={item} navigation={navigation} currentlyOpenSwipeable={currentlyOpenSwipeable} />}
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

export default ListBanner