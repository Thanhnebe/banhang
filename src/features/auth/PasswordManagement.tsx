import { View, Text, } from 'react-native'
import React, { useState } from 'react'
import { HandleLoginUser, HandleRegisterUser, HandleResendEmail, HandleVerifyOtp } from '../../service/Api/IndexUser'
import ToastMessage from '../../utils/ToastMessage'
import { Validation } from '../../utils/Validation'
import { useAppDispatch } from '../redux/ReduxHook'
import { Users } from '../../model/entity/IndexUsers.entity'
import { Login } from '../../redux/slices/Auth.Slice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackHomeTypeParam } from '../../model/param/IndexStack.Param'
import { useNavigation } from '@react-navigation/native'

const PasswordManagement = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const [otp, setOtp] = useState<string[]>(['', '', '', ''])
    const [time, setTime] = useState<number>(60)

    const [email, setEmail] = useState<string>('')

    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const handleResendEmailOtp = async () => {
        try {
            const response = await HandleResendEmail(email)
            if (response.status === 200) {
                ToastMessage('success', 'Gửi mã OTP thành công')
                console.log("🚀 ~ handleResendEmail ~ response:", response)
            }
        } catch (error) {
            ToastMessage('error', 'Email không tồn tại')
            console.log("🚀 ~ handleResendEmail ~ error:", error)
        }
    }
    


    return {
        newPassword, setNewPassword, confirmPassword, setConfirmPassword,
        showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, otp, setOtp, time, setTime, email, setEmail,
     handleResendEmailOtp
    }

}

export default PasswordManagement