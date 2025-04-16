import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import StyleListVoucher from './StyleListVoucher'

import { CustomHeader, ItemAdminListVoucher } from '../../../../../import/IndexComponent'

import { FlashList } from '@shopify/flash-list'
import { COLOR } from '../../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../../utils/UseStatusBarConfig'
import { Icon } from '../../../../../constant/Icon'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useGetAllAdminVoucherQuery } from '../../../../../service/Api/Index.Voucher'

const ListVouchers: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const { data, isLoading } = useGetAllAdminVoucherQuery()

    const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    return (
        <View style={StyleListVoucher.container}>
            <View style={StyleListVoucher.viewheader}>
                <View style={StyleListVoucher.headerTitle}>
                    <CustomHeader title='Danh sách giảm giá' color='red' />
                    <TouchableOpacity onPress={() => navigation.navigate('StackAdminManagerProduct', { screen: 'AddVouchers' })}>
                        <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleListVoucher.containerBody}>
                <FlashList
                    data={data?.data}
                    renderItem={({ item }) => <ItemAdminListVoucher item={item} navigation={navigation} currentlyOpenSwipeable={currentlyOpenSwipeable} />}
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

export default ListVouchers