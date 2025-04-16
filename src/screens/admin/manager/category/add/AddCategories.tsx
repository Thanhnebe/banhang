import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';

import StyleAddCategories from './StyleAddCategories';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../../constant/Icon';
import { fetchCategoryProduct, useCreateCategoryMutation } from '../../../../../service/Api/IndexCategory';
import ToastMessage from '../../../../../utils/ToastMessage';

import { useAppDispatch } from '../../../../../import/IndexFeatures';

const AddCategories: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');

  const [images, setImages] = useState<string>('');

  const [createCategory] = useCreateCategoryMutation();

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

  const handleCreateCategory = async () => {
    try {
      const body = {
        name: name,
        image: {
          fileName: images.split('/').pop(),
          type: 'image/jpeg',
          uri: images,
        }
      };
      const response = await createCategory(body);
      if (response.data) {
        ToastMessage('success', 'Thêm danh mục thành công');
        dispatch(fetchCategoryProduct())
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error creating category: ', error);
      ToastMessage('error', 'Thêm danh mục thất bại');
    }
  }

  return (
    <View style={StyleAddCategories.container}>
      <View style={StyleAddCategories.viewheader}>
        <View style={StyleAddCategories.headerTitle}>
          <CustomHeader title='Thêm danh mục' color='red' />
        </View>
      </View>
      <View style={StyleAddCategories.containerBody}>
        <View >
          <View style={StyleAddCategories.viewImage}>
            {
              images ? <Image source={{ uri: images }} style={StyleAddCategories.image} /> :
                <Icon.AvatarSVG width={100} height={100} fill='black' />
            }
            <TouchableOpacity style={StyleAddCategories.buttonImage} onPress={handleSelectPhoto}>
              <Text style={StyleAddCategories.textButtonImage}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={StyleAddCategories.viewInput}>
            <Text style={StyleAddCategories.text}>Tên danh mục</Text>
            <InputCustom
              placeholder='Danh mục sản phẩm'
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={StyleAddCategories.button} onPress={handleCreateCategory}>
        <Text style={StyleAddCategories.textButton}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategories;
