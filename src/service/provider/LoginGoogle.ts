import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { Users } from '../../model/entity/IndexUsers.entity';
import { HandleLoginProvider } from '../Api/IndexUser';
import { CONFIG } from '../../constant/Host';
import { Login } from '../../redux/slices/Auth.Slice';
import ToastMessage from '../../utils/ToastMessage';

const loginGoogle = async (dispatch: any, navigation: any) => {
    try {
        GoogleSignin.configure({
            webClientId: CONFIG.WEBID,
            scopes: ['email', 'profile'],
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        const photoUrl = userInfo.user.photo
        const provider = userInfo.user.id
        const response = await HandleLoginProvider(photoUrl || '', provider)
        const data: Users = {
            ...response.data,
            email: userInfo.user.email,
            photoUrl: userInfo.user.photo,
            fullname: userInfo.user.name,
        }
        if (response.status === 200) {
            dispatch(Login({ isLogged: true, user: data }))
            navigation.navigate('TabHome', { screen: 'Trang chủ' } as any)
            ToastMessage('success', 'Đăng nhập thành công')
        }
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available or outdated');
        } else {
            console.log('Some other error happened:', error);
        }
    }
};

export { loginGoogle };