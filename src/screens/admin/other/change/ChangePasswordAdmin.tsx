import { View, Text, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CustomHeader, InputCustom } from '../../../../import/IndexComponent'
import { useAppSelector } from '../../../../import/IndexFeatures';
import StyleChangePasswordAdmin from './StyleChangePasswordAdmin';

import { HandleAuthenticatePassword, HandleResetPassword } from '../../../../service/Api/IndexUser';
import ToastMessage from '../../../../utils/ToastMessage';
import { Responsive } from '../../../../constant/Responsive';

const ChangePasswordAdmin: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const id = useAppSelector(state => state.root.Auth.user._id)

    const [password, setPassword] = useState<string>('')

    const [newPassword, setNewPassword] = useState<string>('')

    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const HandleChangePassword = async () => {
        try {
            const response = await HandleAuthenticatePassword(id, password)
            if (response.status === 200) {
                ToastMessage('success', 'Xác thực mật khẩu thành công')
            }
        } catch (error: any) {
            console.log("🚀 ~ HandleChangePassword ~ error", error)
            ToastMessage('error', 'Xác thực mật khẩu không thành công')
        }
    }

    const HandleReset = async () => {
        try {
            const response = await HandleResetPassword(id, password, newPassword, confirmPassword)
            if (response.status === 200) {
                console.log(response)
                ToastMessage('success', 'Đổi mật khẩu thành công')
            }
        } catch (error) {
            console.log("🚀 ~ HandleResetPassword ~ error", error)
            ToastMessage('error', 'Đổi mật khẩu thật bại')
        }
    }


    return (
        <Pressable style={StyleChangePasswordAdmin.container} onPress={Keyboard.dismiss} >
            <View style={StyleChangePasswordAdmin.container}>
                <View style={StyleChangePasswordAdmin.viewheader}>
                    <View style={StyleChangePasswordAdmin.headerTitle}>
                        <CustomHeader title='Thay đổi mật khẩu Admin' color='red' fontSize={Responsive.RFPercentage(2.4)} />
                    </View>
                </View>
                <View style={StyleChangePasswordAdmin.containerBody}>
                    <View style={StyleChangePasswordAdmin.viewInput}>
                        <InputCustom
                            placeholder='Nhập lại mật khẩu cũ'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            keyboardType='default'
                            secureTextEntry={true}
                            style={StyleChangePasswordAdmin.textinput}
                            placeholderTextColor='gray'
                        />
                        <TouchableOpacity onPress={HandleChangePassword}>
                            <Text style={StyleChangePasswordAdmin.textVerification}>Xác minh?</Text>
                        </TouchableOpacity>
                    </View>
                    <InputCustom
                        placeholder='Mật khẩu mới'
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        keyboardType='default'
                        secureTextEntry={true}
                        style={StyleChangePasswordAdmin.textinput}
                        placeholderTextColor='gray'
                    />
                    <InputCustom
                        placeholder='Xác nhận mật khẩu mới'
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        keyboardType='default'
                        secureTextEntry={true}
                        style={StyleChangePasswordAdmin.textinput}
                        placeholderTextColor='gray'
                    />
                    <TouchableOpacity style={StyleChangePasswordAdmin.viewConfirm} onPress={HandleReset}>
                        <Text style={StyleChangePasswordAdmin.textConfirm}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Pressable>
    )
}

export default ChangePasswordAdmin 