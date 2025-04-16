import AxiosInstance from "../../utils/AxiosIntance";
import { Users, UpdateUser } from '../../model/entity/IndexUsers.entity';

const HandleLoginProvider = async (photoUrl: string, provider: string) => {
    try {
        const response = await AxiosInstance().post('/api/auth/loginProvider', { photoUrl, provider })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleLoginUser = async (email: string, password: string, phone: string) => {
    try {
        const response = await AxiosInstance().post('/api/auth/login', { email, password, phone })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleRegisterUser = async (fullname: String, email: String, phone: String, password: String, confirm_password: String) => {
    try {
        const response = await AxiosInstance().post('/api/auth/register', { fullname, email, phone, password, confirm_password })
        return response
    } catch (error: any) {
        console.log("🚀 ~ RegisterUser ~ error:", error)
        throw new Error(error)
    }
}

const HandleUpdateUser = async (id: String, infor: UpdateUser) => {
    try {
        const response = await AxiosInstance().put(`/api/auth/updateUser/${id}`, infor)
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleUploadAvatar = async (id: String, photoUrl: String) => {
    try {
        const formData = new FormData()
        formData.append('photoUrl', {
            uri: photoUrl,
            type: 'image/jpeg',
            name: 'photoUrl.jpg'
        })
        const response = await AxiosInstance('multipart/form-data').put(`/api/auth/uploadAvatar/${id}`, formData)
        return response
    } catch (error: any) {
        console.log("🚀 ~ HandleUploadAvatar ~ error:", error)
    }
}

const HandleAuthenticatePassword = async (id: String, password: String) => {
    try {
        const response = await AxiosInstance().put(`/api/auth/authenticatePassword/${id}`, { password })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleResetPassword = async (id: String, oldPassword: String, newPassword: String, confirmPassword: String) => {
    try {
        const response = await AxiosInstance().put(`/api/auth/resetPassword/${id}`, { oldPassword, newPassword, confirmPassword })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleDeleteUser = async (id: String) => {
    try {
        const response = await AxiosInstance().delete(`/api/auth/deleteUser/${id}`)
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleResendEmail = async (email: String) => {
    try {
        const response = await AxiosInstance().post('/api/auth/sendMail', { email })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleVerifyOtp = async (otp: String) => {
    try {
        const response = await AxiosInstance().post('/api/auth/verifyMailOtp', { otp })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleResetPasswordFromMail = async (email: String, newPassword: String, confirmPassword: String) => {
    try {
        const response = await AxiosInstance().post('/api/auth/resetPasswordFromMail', { email, newPassword, confirmPassword })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleUpdateFcmToken = async (id: String, fcmToken: String) => {
    try {
        const response = await AxiosInstance().put(`/api/auth/updateFcmToken/${id}`, { fcmToken })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleRemoveFcmToken = async (id: String, fcmToken: String) => {
    try {
        const response = await AxiosInstance().put(`/api/auth/removeFcmToken/${id}`, { fcmToken })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

const HandleGetAllUser = async () => {
    try {
        const response = await AxiosInstance().get('/api/auth/admin/getAllUsers')
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}

export {
    HandleRegisterUser, HandleLoginUser, HandleUpdateUser,
    HandleUploadAvatar, HandleAuthenticatePassword, HandleResetPassword,
    HandleDeleteUser, HandleResendEmail, HandleVerifyOtp, HandleResetPasswordFromMail,
    HandleLoginProvider, HandleUpdateFcmToken, HandleRemoveFcmToken, HandleGetAllUser
}