import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import StyleListNotification from './StyleListNotification'

import { CustomHeader, ItemAdminListNotification } from '../../../../../import/IndexComponent'

import { FlashList } from '@shopify/flash-list'
import { COLOR } from '../../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'
import { Icon } from '../../../../../constant/Icon'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useGetAdminNotificationQuery } from '../../../../../service/Api/Index.Notification'

const ListNotifications: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

    const { data, isLoading } = useGetAdminNotificationQuery()


    if (isLoading) {
        return (
            <View style={StyleListNotification.container}>
                <ActivityIndicator size='large' color={COLOR.REDONE} />
            </View>
        )
    }

    return (
        <View style={StyleListNotification.container}>
            <View style={StyleListNotification.viewheader}>
                <View style={StyleListNotification.headerTitle}>
                    <CustomHeader title='Danh sách thông báo' color='red' />
                    <TouchableOpacity onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'SendNotifications' })}>
                        <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleListNotification.containerBody}>
                <FlashList
                    data={data?.data}
                    renderItem={({ item }) => <ItemAdminListNotification item={item} navigation={navigation} currentlyOpenSwipeable={currentlyOpenSwipeable} />}
                    keyExtractor={item => item._id}
                    estimatedItemSize={200}
                />
            </View>
        </View>
    )
}

export default ListNotifications