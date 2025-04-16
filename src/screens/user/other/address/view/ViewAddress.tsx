import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'

import { Icon } from '../../../../../constant/Icon'
import { IndexStyles } from '../../../../../import/IndexStyles';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { StackIndividualParams } from '../../../../../model/param/IndexStack.Param'

import { useGetAddressIdUserQuery } from '../../../../../service/Api/IndexAddress';
import { useAppSelector, useAppDispatch } from '../../../../../import/IndexFeatures';
import { CustomHeader, ItemListAddress } from '../../../../../import/IndexComponent';
import { Responsive } from '../../../../../constant/Responsive';

const ViewAddress: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackIndividualParams, 'ViewAddRess'>>();
    const user_id = useAppSelector(state => state.root.Auth.user._id)
    const dispatch = useAppDispatch()

    const { data, isLoading, isFetching } = useGetAddressIdUserQuery(user_id)

    if (isLoading || isFetching) {
        return (
            <View style={IndexStyles.StyleViewAddRess.loadingContainer}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    return (
        <View style={IndexStyles.StyleViewAddRess.container}>
            <View style={IndexStyles.StyleViewAddRess.viewheader}>
                <View style={IndexStyles.StyleViewAddRess.headerTitle}>
                    <CustomHeader title='Địa chỉ của tôi' color='red' fontSize={Responsive.RFPercentage(2.5)} />
                </View>
            </View>
            <View style={IndexStyles.StyleViewAddRess.containerBody}>
                <Text style={IndexStyles.StyleViewAddRess.textAddressTitle}>Địa chỉ</Text>
                <View style={IndexStyles.StyleViewAddRess.containerItem}>
                    <FlatList
                        data={data?.data}
                        renderItem={({ item }) => <ItemListAddress item={item} navigation={navigation} dispatch={dispatch} />}
                        keyExtractor={item => item._id}
                        pagingEnabled={true}
                        ItemSeparatorComponent={() => <View style={IndexStyles.StyleViewAddRess.separator} />}
                    />
                </View>
                <TouchableOpacity style={IndexStyles.StyleViewAddRess.moreAddress} onPress={() => navigation.navigate('MoreAddress')}>
                    <Icon.AddSVG width={30} height={30} fill='red' />
                    <Text style={IndexStyles.StyleViewAddRess.textMoreAddress}>Thêm địa chỉ mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ViewAddress