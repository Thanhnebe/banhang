import { View, Text, StyleSheet, Image, ImageProps, ImageSourcePropType, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { AddressEntity } from '../../../model/entity/IndexAddress.entity'
import { IndexStyles } from '../../../import/IndexStyles'
import { fetchAddressById } from '../../../redux/slices/Address.Slice';

type PropsAddress = {
    item: AddressEntity,
    navigation: any,
    dispatch: any
}

const ItemListAddress = ({ item, navigation, dispatch }: PropsAddress) => {

    return (
        <View style={IndexStyles.StyleItemListAddress.container}>
            <TouchableOpacity style={IndexStyles.StyleItemListAddress.containerItem} onPress={() => { dispatch(fetchAddressById(item._id)); navigation.navigate('EditAddress', { _id: item._id }) }}>
                <View style={IndexStyles.StyleItemListAddress.viewUser}>
                    <Text style={IndexStyles.StyleItemListAddress.textName}>{item.name}  |</Text>
                    <Text style={IndexStyles.StyleItemListAddress.textPhone}>{item.phone}</Text>
                </View>
                <View style={IndexStyles.StyleItemListAddress.viewAddress}>
                    <Text style={IndexStyles.StyleItemListAddress.textAddress}>{item.houseNumber}</Text>
                    <Text style={IndexStyles.StyleItemListAddress.textAddress}>Phường {item.ward}, {item.district}, {item.province}</Text>
                </View>
                <View style={IndexStyles.StyleItemListAddress.viewShipper}>
                    {item.isDefault ? <Text style={IndexStyles.StyleItemListAddress.textLocation}>Mặc định</Text> : null}
                    <Text style={IndexStyles.StyleItemListAddress.textLocation}>{item.addressType}</Text>
                    <Text style={IndexStyles.StyleItemListAddress.textShipper}>Địa chỉ giao hàng</Text>
                </View>

            </TouchableOpacity>
        </View >
    )
}

export default ItemListAddress

