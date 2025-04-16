import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, CustomModalConfirm, InputCustom } from '../../../../../import/IndexComponent';

import StyleEditBanner from './StyleEditBanner';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToastMessage from '../../../../../utils/ToastMessage';
import { useAppDispatch } from '../../../../../import/IndexFeatures';

import { fetchBannerProduct } from '../../../../../service/Api/IndexBanner';
import { useDetailBannerQuery, useUpdateBannerMutation, useDeleteBannerMutation } from '../../../../../service/Api/IndexBanner';


const EditBanner: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<{ route: any }, 'route'>>();

    const id = route.params?.id;

    const { data, isLoading } = useDetailBannerQuery(id);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [title, setTitle] = useState<string>(data?.data.title as string);

    const [images, setImages] = useState<string>('');

    const [updateBanner] = useUpdateBannerMutation();

    const [deleteBanner] = useDeleteBannerMutation();

    const handleSelectPhoto = async () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.7,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            includeBase64: true,
        }).then((images: any) => {
            setImages(images.path);
        }).catch(error => {
            console.log('Error selecting images: ', error);
        });
    };

    const handleUpdateBanner = async () => {
        try {
            if (!title) {
                ToastMessage('error', 'Vui lòng nhập đầy đủ thông tin');
            }
            const body = {
                title: title,
                images: {
                    fileName: images.split('/').pop(),
                    type: 'image/jpeg',
                    uri: images,
                }
            };
            const response = await updateBanner({ id: id, body: body });
            if (response.data) {
                ToastMessage('success', 'Cập nhật danh mục thành công');
                dispatch(fetchBannerProduct());
                navigation.goBack();
            }
        } catch (error: any) {
            console.log('Error update banner: ', error);
        }
    };

    const handleDeleteBanner = async () => {
        try {
            const response = await deleteBanner(id);
            if (response.data) {
                ToastMessage('success', 'Xóa danh mục thành công');
                dispatch(fetchBannerProduct());
                navigation.goBack();
            }
        } catch (error: any) {
            console.log('Error delete banner: ', error);
        }
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    return (
        <View style={StyleEditBanner.container}>
            <View style={StyleEditBanner.viewheader}>
                <View style={StyleEditBanner.headerTitle}>
                    <CustomHeader title='Cập nhật danh mục' color='red' />
                </View>
            </View>
            <View style={StyleEditBanner.containerBody}>
                <View >
                    <View style={StyleEditBanner.viewImage}>
                        {images ?
                            <Image source={{ uri: images }} style={StyleEditBanner.image} />
                            :
                            <Image source={{ uri: data?.data.images as string }}
                                style={StyleEditBanner.image} />
                        }
                        <TouchableOpacity style={StyleEditBanner.buttonImage} onPress={handleSelectPhoto}>
                            <Text style={StyleEditBanner.textButtonImage}>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={StyleEditBanner.viewInput}>
                        <Text style={StyleEditBanner.text}>Tên quảng cáo</Text>
                        <InputCustom
                            placeholder='Danh mục sản phẩm'
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            defaultValue={data?.data.title as string}
                        />
                    </View>
                </View>
                <TouchableOpacity style={StyleEditBanner.buttonDelete} onPress={() => setModalVisible(true)}>
                    <Text style={StyleEditBanner.textButton}>Xóa quảng cáo</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={StyleEditBanner.button} onPress={handleUpdateBanner}>
                <Text style={StyleEditBanner.textButton}>Cập nhật</Text>
            </TouchableOpacity>
            <CustomModalConfirm
                isVisible={modalVisible}
                onPressCancel={() => setModalVisible(false)}
                onPressConfirm={handleDeleteBanner}
                title='Xác nhận xóa'
                message='Bạn có chắc chắn muốn xóa danh mục quảng cáo này không?'
            />
        </View>
    );
};

export default EditBanner;
