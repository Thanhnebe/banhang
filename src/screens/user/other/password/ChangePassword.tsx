import { View, Text, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CustomHeader, InputCustom } from '../../../../import/IndexComponent'
import { IndexStyles } from '../../../../import/IndexStyles';
import { useAppSelector } from '../../../../import/IndexFeatures';
import { HandleAuthenticatePassword, HandleResetPassword } from '../../../../service/Api/IndexUser';
import ToastMessage from '../../../../utils/ToastMessage';
import { Responsive } from '../../../../constant/Responsive';

const ChangePassword: React.FC = () => {
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
        <Pressable style={IndexStyles.StyleChangePassword.container} onPress={Keyboard.dismiss} >
            <View style={IndexStyles.StyleChangePassword.container}>
                <View style={IndexStyles.StyleChangePassword.viewheader}>
                    <View style={IndexStyles.StyleChangePassword.headerTitle}>
                        <CustomHeader title='Thay đổi mật khẩu' color='red' fontSize={Responsive.RFPercentage(2.4)} />
                    </View>
                </View>
                <View style={IndexStyles.StyleChangePassword.containerBody}>
                    <View style={IndexStyles.StyleChangePassword.viewInput}>
                        <InputCustom
                            placeholder='Nhập lại mật khẩu cũ'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            keyboardType='default'
                            secureTextEntry={true}
                            style={IndexStyles.StyleChangePassword.textinput}
                            placeholderTextColor='gray'
                        />
                        <TouchableOpacity onPress={HandleChangePassword}>
                            <Text style={IndexStyles.StyleChangePassword.textVerification}>Xác minh?</Text>
                        </TouchableOpacity>
                    </View>
                    <InputCustom
                        placeholder='Mật khẩu mới'
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        keyboardType='default'
                        secureTextEntry={true}
                        style={IndexStyles.StyleChangePassword.textinput}
                        placeholderTextColor='gray'
                    />
                    <InputCustom
                        placeholder='Xác nhận mật khẩu mới'
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        keyboardType='default'
                        secureTextEntry={true}
                        style={IndexStyles.StyleChangePassword.textinput}
                        placeholderTextColor='gray'
                    />
                    <TouchableOpacity style={IndexStyles.StyleChangePassword.viewConfirm} onPress={HandleReset}>
                        <Text style={IndexStyles.StyleChangePassword.textConfirm}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Pressable>
    )
}

export default ChangePassword 