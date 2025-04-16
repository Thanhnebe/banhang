import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Icon } from '../../../constant/Icon';
import { InputCustom } from '../../../import/IndexComponent';

import useStatusBarConfig from '../../../utils/UseStatusBarConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackAuthUserParams } from '../../../model/param/IndexStack.Param';

import LinearGradient from 'react-native-linear-gradient';
import { IndexStyles } from '../../../import/IndexStyles';
import { AccountManagement } from '../../../import/IndexFeatures';


const AuthRegisterUser: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true);
    const navigation = useNavigation<NativeStackNavigationProp<StackAuthUserParams, 'AuthRegister'>>();
    const { handleRegister, fullname, setFullname, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, phone, setPhone } = AccountManagement();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={IndexStyles.StyleAuthRegisterUser.container}>
                <View style={IndexStyles.StyleAuthRegisterUser.containerHeader}>
                    <Image source={Icon.BACKGROUNDSTORE} style={IndexStyles.StyleAuthRegisterUser.backgroundStore} />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon.BackSVG width={35} height={40} fill='red' style={IndexStyles.StyleAuthRegisterUser.iconCancel} />
                    </TouchableOpacity>
                </View>
                <View style={IndexStyles.StyleAuthRegisterUser.containerBody}>
                    <Text style={IndexStyles.StyleAuthRegisterUser.textTitle}>Đăng ký tài khoản{`\n`}Apple Store</Text>
                    <View>
                        <InputCustom
                            placeholder="Nhập họ và tên"
                            placeholderTextColor="gray"
                            value={fullname}
                            onChangeText={(text) => setFullname(text)}
                            secureTextEntry={false}
                            keyboardType="email-address"
                            style={IndexStyles.StyleAuthRegisterUser.input}
                            color='white'
                        />
                        <InputCustom
                            placeholder="Nhập email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            secureTextEntry={false}
                            keyboardType="email-address"
                            style={IndexStyles.StyleAuthRegisterUser.input}
                            color='white'
                        />
                        <InputCustom
                            placeholder="Số điện thoại"
                            placeholderTextColor="gray"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            secureTextEntry={false}
                            keyboardType="phone-pad"
                            style={IndexStyles.StyleAuthRegisterUser.input}
                            color='white'
                        />
                        <View style={IndexStyles.StyleAuthRegisterUser.viewinput}>
                            <InputCustom
                                placeholder="Mật khẩu"
                                placeholderTextColor="gray"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                                keyboardType="default"
                                style={IndexStyles.StyleAuthRegisterUser.input}
                                color='white'
                            />
                            <TouchableOpacity style={IndexStyles.StyleAuthRegisterUser.iconShowPassword} onPress={() => setShowPassword(!showPassword)}>
                                {!showPassword ? <Icon.HidePasswordSVG width={25} height={25} fill='white' /> : <Icon.ShowPasswordSVG width={25} height={25} fill='white' />}
                            </TouchableOpacity>
                        </View>
                        <View style={IndexStyles.StyleAuthRegisterUser.viewinput}>
                            <InputCustom
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="gray"
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry={!showConfirmPassword}
                                keyboardType="default"
                                style={IndexStyles.StyleAuthRegisterUser.input}
                                color='white'
                            />
                            <TouchableOpacity style={IndexStyles.StyleAuthRegisterUser.iconShowPassword} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {!showConfirmPassword ? <Icon.HidePasswordSVG width={25} height={25} fill='white' /> : <Icon.ShowPasswordSVG width={25} height={25} fill='white' />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleRegister}>
                        <LinearGradient colors={['#FFCDB2', '#FF5A5F']} style={IndexStyles.StyleAuthRegisterUser.buttonLogin}
                            start={{ x: 0, y: 2 }} end={{ x: 1, y: 10 }} >
                            <Text style={IndexStyles.StyleAuthRegisterUser.textButtonLogin}>Đăng ký</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={IndexStyles.StyleAuthRegisterUser.textOr}>Hoặc</Text>
                    <View style={IndexStyles.StyleAuthRegisterUser.viewRegister}>
                        <Text style={IndexStyles.StyleAuthRegisterUser.texTitletRegister}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AuthLogin')}>
                            <Text style={IndexStyles.StyleAuthRegisterUser.textRegister}>Đăng nhập ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={IndexStyles.StyleAuthRegisterUser.viewRegisterOther}>
                        <View style={IndexStyles.StyleAuthRegisterUser.viewLogin}>
                            <Text style={IndexStyles.StyleAuthRegisterUser.textLoginOther}>Đăng nhập bằng Google</Text>
                            <Image source={Icon.GOOGLE} style={IndexStyles.StyleAuthRegisterUser.iconLoginOther} />
                        </View>
                        <View style={IndexStyles.StyleAuthRegisterUser.viewLogin}>
                            <Text style={IndexStyles.StyleAuthRegisterUser.textLoginOther}>Đăng nhập bằng Zalo</Text>
                            <Image source={Icon.ZALO} style={IndexStyles.StyleAuthRegisterUser.iconLoginOther} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default AuthRegisterUser;
