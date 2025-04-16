import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IndexStyles } from '../../../../import/IndexStyles'
import { InputCustom } from '../../../../import/IndexComponent'
import { Icon } from '../../../../constant/Icon'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ToastMessage from '../../../../utils/ToastMessage'
import { HandleResetPasswordFromMail } from '../../../../service/Api/IndexUser'
import { AccountManagement } from '../../../../import/IndexFeatures'
import PasswordManagement from '../../../../features/auth/PasswordManagement'

type RouteParams = {
    email: string
}

const CreatePassword: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const route = useRoute<RouteProp<Record<string, RouteParams>, string>>()
    const { email } = route.params
    const { newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword } = PasswordManagement()


    const handleCreatePassword = async () => {
        try {
            const response = await HandleResetPasswordFromMail(email, newPassword, confirmPassword)
            if (response.status === 200) {
                ToastMessage('success', 'Tạo mật khẩu thành công')
                navigation.navigate('TabHome')
                console.log("🚀 ~ handleCreatePassword ~ response:", response)
            }
        } catch (error) {
            ToastMessage('error', 'Tạo mật khẩu không thành công')
            console.log("🚀 ~ handleCreatePassword ~ error:", error)
        }
    }

    return (
        <View style={IndexStyles.StyleCreatePassword.container}>
            <View style={IndexStyles.StyleCreatePassword.containerHeader}>
                <View style={IndexStyles.StyleCreatePassword.viewHeader}>
                    <Icon.BackSVG width={25} height={25} fill='red' onPress={() => navigation.goBack()} />
                    <Text style={IndexStyles.StyleCreatePassword.textHeader}>Tạo mật khẩu mới</Text>
                </View>
            </View>
            <View style={IndexStyles.StyleCreatePassword.containerBody}>
                <View style={IndexStyles.StyleCreatePassword.containerInput}>
                    <View style={IndexStyles.StyleCreatePassword.viewInput}>
                        <InputCustom
                            placeholder="Mật khẩu"
                            placeholderTextColor="gray"
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={!showPassword}
                            keyboardType="default"
                            style={IndexStyles.StyleCreatePassword.input}
                        />
                        <TouchableOpacity style={IndexStyles.StyleCreatePassword.iconShowPassword} onPress={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <Icon.HidePasswordSVG width={25} height={25} fill='red' /> : <Icon.ShowPasswordSVG width={25} height={25} fill='red' />}
                        </TouchableOpacity>
                    </View>
                    <View style={IndexStyles.StyleCreatePassword.viewInput}>
                        <InputCustom
                            placeholder='Nhập lại mật khẩu'
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={!showConfirmPassword}
                            style={IndexStyles.StyleCreatePassword.input}
                            keyboardType='default'
                        />
                        <TouchableOpacity style={IndexStyles.StyleCreatePassword.iconShowPassword} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {!showConfirmPassword ? <Icon.HidePasswordSVG width={25} height={25} fill='red' /> : <Icon.ShowPasswordSVG width={25} height={25} fill='red' />}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={IndexStyles.StyleCreatePassword.button} onPress={handleCreatePassword}>
                    <Text style={IndexStyles.StyleCreatePassword.text}>Tạo mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreatePassword