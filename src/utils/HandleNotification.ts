import messaging from '@react-native-firebase/messaging';
import { updateToken } from '../redux/slices/Auth.Slice';
import { HandleUpdateFcmToken } from '../service/Api/IndexUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

class HandleNotification {
    // static checkNotificationPermission = async (user: any, dispatch: any) => {
    //     try {
    //         //nếu là android thì cần request quyền thông báo từ notifee và firebase messaging còn ios thì sẽ thêm setting của notifee
    //         if (Platform.OS === 'android') {
    //             const settings = await notifee.requestPermission();
    //             if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    //                 console.log('Permission status:', settings.authorizationStatus);
    //                 this.getFcmToken(user, dispatch);
    //             } else {
    //                 console.log('User declined permission request');
    //             }
    //             const authStatus = await messaging().requestPermission();
    //             if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    //                 await this.getFcmToken(user, dispatch);
    //                 console.log('Notification permission granted.');
    //             } else {
    //                 console.log('Notification permission rejected.');
    //             }
    //         }
    //     } catch (error) {
    //         console.log('Failed to request notification permission:', error);
    //     }
    // }

    // Hàm xin quyền thông báo khi ứng dụng khởi động
    static checkNotificationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                // Yêu cầu quyền thông báo từ notifee và firebase messaging
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                const [notifeeSettings, messagingAuthStatus] = await Promise.all([
                    notifee.requestPermission({
                        sound: true,
                        announcement: true,
                        alert: true,
                        badge: true,
                    }),
                    messaging().requestPermission({
                        sound: true,
                        announcement: true,
                        alert: true,
                        badge: true,
                    }),
                ]);

                // Kiểm tra quyền từ notifee
                if (notifeeSettings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
                    console.log('Notifee permission granted:', notifeeSettings.authorizationStatus);
                } else {
                    console.log('User declined Notifee permission request');
                }

                // Kiểm tra quyền từ Firebase Messaging
                if (
                    messagingAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    messagingAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
                ) {
                    console.log('Firebase Messaging permission granted.');
                } else {
                    console.log('Firebase Messaging permission rejected.');
                }
            } else if (Platform.OS === 'ios') {
                // Xử lý xin quyền cho iOS nếu cần thiết
                console.log('iOS platform detected.');
            }
        } catch (error) {
            console.log('Failed to request notification permission:', error);
        }
    };

    // Hàm lấy token FCM khi có `user._id` mới
    static getFcmToken = async (user: any, dispatch: any) => {
        try {
            const storedFcmToken = await AsyncStorage.getItem('fcmToken');
            const currentFcmToken = await messaging().getToken();
            console.log("🚀 ~ HandleNotification ~ getFcmToken= ~ currentFcmToken:", currentFcmToken);
            // So sánh token mới với token đã lưu, nếu khác thì cập nhật
            if (currentFcmToken !== storedFcmToken) {
                await AsyncStorage.setItem('fcmToken', currentFcmToken);
                this.updateTokenForUser(currentFcmToken, user, dispatch);
            } else if (!storedFcmToken) {
                this.updateTokenForUser(currentFcmToken, user, dispatch);
            } else {
                console.log('Token is up to date, no update required.');
            }
        } catch (error) {
            console.log('Failed to get FCM token:', error);
        }
    };

    static updateTokenForUser = async (token: string, user: any, dispatch: any) => {
        if (user && user._id) {
            try {
                const response = await HandleUpdateFcmToken(user._id, token);
                if (response.status === 200) {
                    dispatch(updateToken(token));
                }
            } catch (error) {
                console.log('Failed to update token for user:', user._id, error);
            }
        } else {
            console.log('No user info provided for token update.');
        }
    }

}

export default HandleNotification;