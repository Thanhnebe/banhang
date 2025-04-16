import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react'

import { IndexStyles } from '../../../import/IndexStyles';
import { Icon } from '../../../constant/Icon'
import { InputCustom } from '../../../import/IndexComponent';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackHomeTypeParam } from '../../../model/param/IndexStack.Param';

import LinearGradient from 'react-native-linear-gradient';
import useStatusBarConfig from '../../../utils/UseStatusBarConfig'
import { Validation } from '../../../utils/Validation';
import { AccountManagement, useAppDispatch } from '../../../import/IndexFeatures';

import { loginGoogle } from '../../../service/provider/LoginGoogle';
import ToastMessage from '../../../utils/ToastMessage';


const AuthLoginUser: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)
    const navigation = useNavigation<NativeStackNavigationProp<StackHomeTypeParam, 'AuthUser'>>()
    const dispatch = useAppDispatch()
    const { handleLogin, email, setEmail, password, setPassword, phone, setPhone } = AccountManagement()
    const [showPassword, setShowPassword] = useState<boolean>(false)


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={IndexStyles.StyleAuthLoginUser.container}>
                <View style={IndexStyles.StyleAuthLoginUser.containerHeader}>
                    <Image source={Icon.BACKGROUNDSTORE} style={IndexStyles.StyleAuthLoginUser.backgroundStore} />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon.CanceLBorderSVG width={70} height={35} fill='red' style={IndexStyles.StyleAuthLoginUser.iconCancel} />
                    </TouchableOpacity>
                </View>
                <View style={IndexStyles.StyleAuthLoginUser.containerBody}>
                    <Text style={IndexStyles.StyleAuthLoginUser.textTitle}>Chào mừng bạn đến với AppleStore</Text>
                    <View>
                        <InputCustom
                            placeholder="Email hoặc số điện thoại"
                            placeholderTextColor="gray"
                            value={email || phone}
                            onChangeText={(text) => {
                                if (Validation.validateEmail(text)) {
                                    setEmail(text)
                                    setPhone('')
                                } else {
                                    setPhone(text)
                                    setEmail('')
                                }
                            }}
                            secureTextEntry={false}
                            keyboardType="email-address"
                            style={IndexStyles.StyleAuthLoginUser.input}
                        />
                        <View style={IndexStyles.StyleAuthLoginUser.viewpassword}>
                            <InputCustom
                                placeholder="Mật khẩu"
                                placeholderTextColor="gray"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                keyboardType="default"
                                style={IndexStyles.StyleAuthLoginUser.input}
                                secureTextEntry={!showPassword}
                            />

                            <TouchableOpacity style={IndexStyles.StyleAuthLoginUser.iconShowPassword} onPress={() => setShowPassword(!showPassword)}>
                                {!showPassword ? <Icon.HidePasswordSVG width={25} height={25} fill='black' /> : <Icon.ShowPasswordSVG width={25} height={25} fill='black' />}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AuthUser', { screen: 'ForgotPassword' } as any)}>
                            <Text style={IndexStyles.StyleAuthLoginUser.textForgot}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleLogin}>
                        <LinearGradient colors={['#FFCDB2', '#FF5A5F']} style={IndexStyles.StyleAuthLoginUser.buttonLogin}
                            start={{ x: 0, y: 2 }} end={{ x: 1, y: 10 }} >
                            <Text style={IndexStyles.StyleAuthLoginUser.textButtonLogin}>Đăng nhập</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={IndexStyles.StyleAuthLoginUser.viewRegister}>
                        <Text style={IndexStyles.StyleAuthLoginUser.texTitletRegister}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AuthUser', { screen: 'AuthRegister' } as any)}>
                            <Text style={IndexStyles.StyleAuthLoginUser.textRegister}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={IndexStyles.StyleAuthLoginUser.viewLoginOther}>
                        <TouchableOpacity style={IndexStyles.StyleAuthLoginUser.viewLogin} onPress={() => loginGoogle(dispatch, navigation)}>
                            <Text style={IndexStyles.StyleAuthLoginUser.textLoginOther}>Đăng nhập bằng Google</Text>
                            <Image source={Icon.GOOGLE} style={IndexStyles.StyleAuthLoginUser.iconLoginOther} />
                        </TouchableOpacity>
                        <TouchableOpacity style={IndexStyles.StyleAuthLoginUser.viewLogin} onPress={() => ToastMessage('info', 'Chức năng đang phát triển')}>
                            <Text style={IndexStyles.StyleAuthLoginUser.textLoginOther}>Đăng nhập bằng Zalo</Text>
                            <Image source={Icon.ZALO} style={IndexStyles.StyleAuthLoginUser.iconLoginOther} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AuthLoginUser