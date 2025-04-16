import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { IndexStyles } from '../../../../import/IndexStyles'
import { Icon } from '../../../../constant/Icon'
import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CustomVeriftyInput } from '../../../../import/IndexComponent'

import { HandleResendEmail, HandleVerifyOtp } from '../../../../service/Api/IndexUser'
import ToastMessage from '../../../../utils/ToastMessage'
import PasswordManagement from '../../../../features/auth/PasswordManagement'

type RouteParams = {
    email: string
}

const OtpPassword: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true)
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const route = useRoute<RouteProp<Record<string, RouteParams>, string>>()
    const { email } = route.params
    const { otp, setOtp, time, setTime, handleResendEmailOtp } = PasswordManagement()


    const handleVerifyOtp = async () => {
        try {
            const response = await HandleVerifyOtp(otp.join(''))
            if (response.status === 200) {
                navigation.navigate('CreatePassword', { email })
                ToastMessage('success', 'Otp hợp lệ')
                console.log("🚀 ~ handleVerifyOtp ~ response:", response)
            }
        } catch (error) {
            ToastMessage('error', 'Otp không hợp lệ')
            console.log("🚀 ~ handleVerifyOtp ~ error:", error)
        }
    }

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        if (time === 0) {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);
        };
    }, [time]);

    return (
        <View style={IndexStyles.StyleOtpPassword.container}>
            <View style={IndexStyles.StyleOtpPassword.containerHeader}>
                <View style={IndexStyles.StyleOtpPassword.viewHeader}>
                    <Icon.BackSVG width={25} height={25} fill='red' onPress={() => navigation.goBack()} />
                    <Text style={IndexStyles.StyleOtpPassword.textHeader}>Nhập mã xác minh</Text>
                </View>
            </View>
            <View style={IndexStyles.StyleOtpPassword.containerBody}>
                <View style={IndexStyles.StyleOtpPassword.viewname}>
                    <Text style={IndexStyles.StyleOtpPassword.textTitle}>Mã xác đã gửi đến Email vui lòng kiểm tra</Text>
                    <Text style={IndexStyles.StyleOtpPassword.textname}>{email}</Text>
                </View>
                <View style={IndexStyles.StyleOtpPassword.viewInput}>
                    <CustomVeriftyInput
                        length={4}
                        value={otp}
                        onChangeText={setOtp}
                    />
                </View>
                <View style={IndexStyles.StyleOtpPassword.button}>
                    <TouchableOpacity style={IndexStyles.StyleOtpPassword.buttonResend} onPress={handleVerifyOtp}>
                        <Text style={IndexStyles.StyleOtpPassword.textResend}>Tiếp theo</Text>
                    </TouchableOpacity>
                    {time === 0 ? (
                        <View style={IndexStyles.StyleOtpPassword.viewResend}>
                            <Text style={IndexStyles.StyleOtpPassword.textResend}>Bạn vẫn chưa nhận được mã xác thực? </Text>
                            <TouchableOpacity onPress={handleResendEmailOtp}>
                                <Text style={IndexStyles.StyleOtpPassword.textSend}>Gửi lại mã</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={IndexStyles.StyleOtpPassword.viewResend}>
                            <Text style={IndexStyles.StyleOtpPassword.textTime}>Thời gian hiệu lực còn </Text>
                            <Text style={IndexStyles.StyleOtpPassword.textSend}>{time}s </Text>
                            <Text style={IndexStyles.StyleOtpPassword.textTime}>để có thể gửi lại mã</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default OtpPassword