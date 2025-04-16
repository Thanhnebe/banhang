import { View, Text, } from 'react-native'
import React, { useState } from 'react'
import { HandleLoginUser, HandleRegisterUser } from '../../service/Api/IndexUser'
import ToastMessage from '../../utils/ToastMessage'
import { Validation } from '../../utils/Validation'
import { useAppDispatch, useAppSelector } from '../redux/ReduxHook'
import { Users } from '../../model/entity/IndexUsers.entity'
import { Login } from '../../redux/slices/Auth.Slice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackHomeTypeParam } from '../../model/param/IndexStack.Param'
import { useNavigation } from '@react-navigation/native'
import { setItemCount } from '../../redux/slices/CountCartSlice'
import { useLazyGetCartByUserQuery } from '../../service/Api/IndexCart'

const AccountManagement = () => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const navigation = useNavigation<NativeStackNavigationProp<StackHomeTypeParam, 'AuthUser'>>()

    const handleLogin = async () => {
        try {
            if (email === '' && phone === '' || password === '') {
                ToastMessage('error', 'Không được để trống thông tin');
                return;
            }
            if (!Validation.validateEmail(email) && !Validation.validatePhone(phone)) {
                ToastMessage('error', 'Email hoặc số điện thoại không hợp lệ');
                return;
            }
            if (!Validation.validatePassword(password)) {
                ToastMessage('error', 'Mật khẩu phải lớn hơn 6 ký tự');
                return;
            }
            const response = await HandleLoginUser(email, password, phone)
            if (response.status === 200) {
                const data: Users = response.data
                dispatch(Login({ isLogged: true, user: data }))
                // navigation.navigate('TabHome', { screen: 'HomePage' } as any)
                navigation.navigate(data.role === 'user' ? 'TabHome' : 'TabAdminManager', { screen: 'HomePage' } as any)
                ToastMessage('success', 'Đăng nhập thành công')
            } else {
                ToastMessage('error', 'Đăng nhập thất bại')
            }
        } catch (error: any) {
            console.log("🚀 ~ handleLogin ~ error:", error)
            ToastMessage('error', 'Đăng nhập thất bại')
        }
    }

    const handleRegister = async () => {
        try {
            if (fullname === '' && email === '' && phone === '' || password === '' || confirmPassword === '') {
                ToastMessage('error', 'Không được để trống thông tin');
                return;
            }
            if (!Validation.validateEmail(email)) {
                ToastMessage('error', 'Email không hợp lệ');
                return;
            }
            if (!Validation.validatePhone(phone)) {
                ToastMessage('error', 'Số điện thoại phải 10 số');
                return;
            }
            if (!Validation.validatePassword(password)) {
                ToastMessage('error', 'Mật khẩu phải lớn hơn 6 ký tự');
                return;
            }
            if (!Validation.validateConfirmPassword(password, confirmPassword)) {
                ToastMessage('error', 'Mật khẩu không trùng khớp');
                return;
            }
            const response = await HandleRegisterUser(fullname, email, phone, password, confirmPassword);
            if (response.status === 201) {
                const data: Users = response.data;
                console.log("🚀 ~ handleRegister ~ data:", data);
                ToastMessage('success', 'Đăng ký thành công');
                // // navigation.navigate('TabHome', { screen: 'Trang chủ' } as any)
                // navigation.navigate(data.role === 'user' ? 'TabHome' : 'TabAdminManager', { screen: 'HomePage' } as any)
                navigation.goBack()
            } else if (response.status === 400) {
                ToastMessage('error', 'Tài khoản đã tồn tại vui lòng kiểm tra lại thông tin');
            }
        } catch (error) {
            ToastMessage('error', 'Đăng ký thất bại kiểm tra lại thông tin')
        }
    }

    return {
        handleLogin, handleRegister,
        setEmail, setPassword, setPhone, setFullname, setConfirmPassword,
        email, password, phone, fullname, confirmPassword,
    }
}

export default AccountManagement