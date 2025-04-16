import { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { HandleUploadAvatar } from '../../service/Api/IndexUser';
import { Platform, Alert, Linking } from 'react-native';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

const useImagePicker = () => {
    const [photoUrl, setPhotoUrl] = useState<string>('');

    const askPermission = async () => {
        if (Platform.OS === 'ios') {
            const checkCamera = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (checkCamera === RESULTS.DENIED) {
                const requestCamera = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                if (requestCamera === RESULTS.GRANTED) {
                    return true;
                }
            }
            return false;
        } else {
            const checkCamera = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            if (checkCamera === RESULTS.DENIED) {
                const requestCamera = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                if (requestCamera === RESULTS.GRANTED) {
                    return true;
                }
            }
            return false;
        }
    }

    const handleSelectPhoto = async () => {
        try {
            // const permission = await askPermission();
            // if (!permission) {
            //     Alert.alert(
            //         'Thông báo',
            //         'Vui lòng cấp quyền truy cập thư viện ảnh để tiếp tục',
            //         [
            //             {
            //                 text: 'Đồng ý',
            //                 onPress: () => {
            //                     Linking.openSettings();
            //                 },
            //             },
            //         ],
            //     );
            //     return
            // }
            ImageCropPicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageQuality: 0.7,
                compressImageMaxWidth: 300,
                compressImageMaxHeight: 300,
                includeBase64: true,
            }).then((image: any) => {
                setPhotoUrl(image.path);
            }).catch((error: any) => {
                console.log('Error', error);
            });
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUploadPhoto = async (id: string, photoUrl: string) => {
        try {
            const response = await HandleUploadAvatar(id, photoUrl);
            return response;
        } catch (error) {
            console.log('Error', error);
        }
    };

    return { photoUrl, handleSelectPhoto, handleUploadPhoto };
};

export default useImagePicker;
