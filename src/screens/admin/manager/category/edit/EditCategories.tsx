import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, CustomModalConfirm, InputCustom } from '../../../../../import/IndexComponent';

import StyleEditCategories from './StyleEditCategories';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDetailCategoryQuery, useDeleteCategoryMutation } from '../../../../../service/Api/IndexCategory';
import { useUpdateCategoryMutation } from '../../../../../service/Api/IndexCategory';

import ToastMessage from '../../../../../utils/ToastMessage';
import { useAppDispatch } from '../../../../../import/IndexFeatures';

import { fetchCategoryProduct } from '../../../../../service/Api/IndexCategory';


const EditCategories: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<{ route: any }, 'route'>>();

    const id = route.params?.id;

    const { data, isLoading, isFetching } = useDetailCategoryQuery(id);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [name, setName] = useState<string>(data?.data.name as string);

    const [images, setImages] = useState<string>('');

    const [updateCategory] = useUpdateCategoryMutation();

    const [deleteCategory] = useDeleteCategoryMutation();

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

    const handleUpdateCategory = async () => {
        try {
            if (!name) {
                ToastMessage('error', 'Vui lòng nhập tên danh mục');
                return;
            }
            if (!images) {
                ToastMessage('error', 'Vui lòng chọn ảnh danh mục');
                return;
            }
            const body = {
                name: name,
                image: {
                    fileName: images.split('/').pop(),
                    type: 'image/jpeg',
                    uri: images,
                }
            };
            const response = await updateCategory({ id: route.params?.id, body });
            if (response.data) {
                ToastMessage('success', 'Cập nhật danh mục thành công');
                dispatch(fetchCategoryProduct())
                navigation.goBack();
            }

        } catch (error) {
            console.log('Error updating category: ', error);
            ToastMessage('error', 'Cập nhật danh mục thất bại');
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const response = await deleteCategory(id);
            if (response.data) {
                ToastMessage('success', 'Xóa danh mục thành công');
                dispatch(fetchCategoryProduct())
                navigation.goBack();
            }
        } catch (error) {
            console.log('Error deleting category: ', error);
            ToastMessage('error', 'Xóa danh mục thất bại');
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
        <View style={StyleEditCategories.container}>
            <View style={StyleEditCategories.viewheader}>
                <View style={StyleEditCategories.headerTitle}>
                    <CustomHeader title='Cập nhật danh mục' color='red' />
                </View>
            </View>
            <View style={StyleEditCategories.containerBody}>
                <View >
                    <View style={StyleEditCategories.viewImage}>
                        {images ?
                            <Image source={{ uri: images }} style={StyleEditCategories.image} />
                            :
                            <Image source={{ uri: data?.data.images as string }}
                                style={StyleEditCategories.image} />
                        }
                        <TouchableOpacity style={StyleEditCategories.buttonImage} onPress={handleSelectPhoto}>
                            <Text style={StyleEditCategories.textButtonImage}>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={StyleEditCategories.viewInput}>
                        <Text style={StyleEditCategories.text}>Tên danh mục</Text>
                        {/* <InputCustom
                            placeholder='Danh mục sản phẩm'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        /> */}
                        <InputCustom
                            placeholder='Danh mục sản phẩm'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            defaultValue={data?.data.name as string}
                        />
                    </View>
                </View>
                <TouchableOpacity style={StyleEditCategories.buttonDelete} onPress={() => setModalVisible(true)}>
                    <Text style={StyleEditCategories.textButton}>Xóa danh mục</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={StyleEditCategories.button} onPress={handleUpdateCategory}>
                <Text style={StyleEditCategories.textButton}>Cập nhật</Text>
            </TouchableOpacity>
            <CustomModalConfirm
                isVisible={modalVisible}
                onPressCancel={() => setModalVisible(false)}
                onPressConfirm={handleDeleteCategory}
                title='Xác nhận xóa'
                message='Bạn có chắc chắn muốn xóa danh mục này không?'
            />
        </View>
    );
};

export default EditCategories;
