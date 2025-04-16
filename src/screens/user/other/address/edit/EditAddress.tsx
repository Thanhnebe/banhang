import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Icon } from '../../../../../constant/Icon'
import { IndexStyles } from '../../../../../import/IndexStyles'

import { useRoute } from '@react-navigation/native'
import { AddressType, TypeEditAddressParmas } from '../../../../../model/entity/IndexAddress.entity'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CustomSwtich, InputCustom, CustomModalConfirm, CustomHeader } from '../../../../../import/IndexComponent'

import { useAppSelector, useAppDispatch } from '../../../../../import/IndexFeatures'
import { setAddressFromParams, setUpdate } from '../../../../../redux/slices/Address.Slice'
import { useUpdateAddressMutation, useDeleteAddressMutation } from '../../../../../service/Api/IndexAddress'
import ToastMessage from '../../../../../utils/ToastMessage'
import { Responsive } from '../../../../../constant/Responsive'


const EditAddress: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const dispatch = useAppDispatch()
    const route = useRoute<TypeEditAddressParmas['route']>()
    const { _id, province, ward, district } = route?.params || {}
    const update = useAppSelector(state => state.Address)
    const isPhonelength = update.update.phone.length === 10
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [updateAddress] = useUpdateAddressMutation()
    const [deleteAddress] = useDeleteAddressMutation()

    const handleUpdateAddress = () => {
        try {
            if (!isPhonelength) {
                ToastMessage('error', 'Số điện thoại phải có 10 số')
            } else {
                updateAddress({
                    id: update.update._id, body: {
                        _id: update.update._id,
                        name: update.update.name,
                        phone: update.update.phone,
                        ward: update.update.ward,
                        district: update.update.district,
                        province: update.update.province,
                        houseNumber: update.update.houseNumber,
                        addressType: update.update.addressType,
                        isDefault: update.update.isDefault
                    }
                })
                    .unwrap()
                    .then((response) => {
                        if (response !== undefined) {
                            ToastMessage('success', 'Cập nhật địa chỉ thành công')
                            navigation.goBack()
                        }
                    })
            }
        } catch (error) {
            console.log("🚀 ~ handleUpdateAddress ~ error:", error)
        }
    }

    const handleDeleteAddress = () => {
        try {
            deleteAddress(update.update._id)
                .unwrap()
                .then((response) => {
                    if (response !== undefined) {
                        ToastMessage('success', 'Xóa địa chỉ thành công')
                        navigation.goBack()
                    }
                })
        } catch (error) {
            console.log("🚀 ~ handleDeleteAddress ~ error:", error)
        }

    }


    useEffect(() => {
        if (province && district && ward) {
            dispatch(setAddressFromParams({ province, district, ward }));
        }
        if (_id) {
            dispatch(setUpdate({ ...update.update, _id }))
        }

    }, [province, district, ward])

    if (update.isLoading) {
        return (
            <View style={IndexStyles.StyleEditAddress.loadingContainer}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    return (
        <View style={IndexStyles.StyleEditAddress.container}>
            <View style={IndexStyles.StyleEditAddress.viewheader}>
                <View style={IndexStyles.StyleEditAddress.headerTitle}>
                    <CustomHeader title='Thay đổi địa chỉ của bạn' color='red' fontSize={Responsive.RFPercentage(2.4)}/>
                </View>
            </View>
            <View style={IndexStyles.StyleEditAddress.viewinput}>
                <Text style={IndexStyles.StyleEditAddress.textinput}>Liên hệ</Text>
                <InputCustom
                    placeholder='Họ và tên'
                    placeholderTextColor='gray'
                    value={update.update.name}
                    onChangeText={(text) => dispatch(setUpdate({ name: text }))}
                    style={IndexStyles.StyleEditAddress.input1}
                    keyboardType='default'
                />
                <InputCustom
                    placeholder='Số điện thoại'
                    placeholderTextColor='gray'
                    value={update.update.phone}
                    onChangeText={(text) => dispatch(setUpdate({ phone: text }))}
                    style={IndexStyles.StyleEditAddress.input2}
                    keyboardType='numeric'
                />
            </View>
            <View style={IndexStyles.StyleEditAddress.viewinput}>
                <Text style={IndexStyles.StyleEditAddress.textinput}>Địa chỉ</Text>
                <TouchableOpacity style={IndexStyles.StyleEditAddress.viewchooseAddress} onPress={() => navigation.navigate('ChooseAddress', { previousScreen: 'EditAddress' })}>
                    <View>
                        <Text style={IndexStyles.StyleEditAddress.textchooseAddress}>
                            {update.update.province}
                        </Text>
                        <Text style={IndexStyles.StyleEditAddress.textchooseAddress}>
                            {update.update.district}
                        </Text>
                        <Text style={IndexStyles.StyleEditAddress.textchooseAddress}>
                            {update.update.ward}
                        </Text>
                    </View>

                    <Image source={Icon.RIGHT} style={IndexStyles.StyleEditAddress.iconright} />
                </TouchableOpacity>
                <InputCustom
                    placeholder='Tên đường, số nhà'
                    placeholderTextColor='gray'
                    value={update.update.houseNumber}
                    onChangeText={(text) => dispatch(setUpdate({ houseNumber: text }))}
                    style={IndexStyles.StyleEditAddress.input2}
                    keyboardType='default'
                />
            </View>
            <View style={IndexStyles.StyleEditAddress.containerSetting}>
                <Text style={IndexStyles.StyleEditAddress.textinput}>Cài đặt</Text>
                <View style={IndexStyles.StyleEditAddress.containerViewtext}>
                    <Text style={IndexStyles.StyleEditAddress.textsetting}>Loại địa chỉ:</Text>
                    <TouchableOpacity style={[IndexStyles.StyleEditAddress.viewhome, update.update.addressType === AddressType.HOME ? IndexStyles.StyleEditAddress.selected : null]}
                        onPress={() => dispatch(setUpdate({ addressType: AddressType.HOME }))}>
                        <Text style={[IndexStyles.StyleEditAddress.textoptions, update.update.addressType === AddressType.HOME ? IndexStyles.StyleEditAddress.selectedText : null]}>
                            Nhà Riêng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[IndexStyles.StyleEditAddress.viewoffice, update.update.addressType === AddressType.OFFICE ? IndexStyles.StyleEditAddress.selected : null]}
                        onPress={() => dispatch(setUpdate({ addressType: AddressType.OFFICE }))}>
                        <Text style={[IndexStyles.StyleEditAddress.textoptions, update.update.addressType === AddressType.OFFICE ? IndexStyles.StyleEditAddress.selectedText : null]}>
                            Văn Phòng
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={IndexStyles.StyleEditAddress.containerViewdefault}>
                    <Text style={IndexStyles.StyleEditAddress.textsetting}>Đặt làm địa chỉ mặc định</Text>
                    <CustomSwtich value={update.update.isDefault} onChange={(value) => dispatch(setUpdate({ isDefault: value }))} />
                </View>
            </View>
            <View style={IndexStyles.StyleEditAddress.containerButton}>
                <TouchableOpacity style={IndexStyles.StyleEditAddress.viewDelete} onPress={() => setIsVisible(true)}>
                    <Text style={IndexStyles.StyleEditAddress.textDelete}>Xóa địa chỉ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.StyleEditAddress.viewbutton} onPress={handleUpdateAddress}>
                    <Text style={IndexStyles.StyleEditAddress.textbutton}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
            <CustomModalConfirm
                title='Xác nhận xóa địa chỉ'
                message='Bạn có chắc chắn muốn xóa địa chỉ này không?'
                onPressConfirm={handleDeleteAddress}
                isVisible={isVisible}
                onPressCancel={() => setIsVisible(false)}
            />
        </View>
    )
}

export default EditAddress