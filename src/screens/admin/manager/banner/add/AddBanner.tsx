import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';

import StyleAddBanner from './StyleAddBanner';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../../constant/Icon';
import ToastMessage from '../../../../../utils/ToastMessage';

import { useAppDispatch } from '../../../../../import/IndexFeatures';
import { fetchBannerProduct, useCreateBannerMutation } from '../../../../../service/Api/IndexBanner';

const AddBanner: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');

  const [images, setImages] = useState<string>('');

  const [createBanner] = useCreateBannerMutation();


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

  const handleCreateBanner = async () => {
    try {
      if (title === '' || images === '') {
        ToastMessage('error', 'Vui lòng nhập đầy đủ thông tin');
      }
      const body = {
        title: title,
        image: {
          fileName: images.split('/').pop(),
          type: 'image/jpeg',
          uri: images,
        }
      };
      const response = await createBanner(body);
      if (response.data) {
        ToastMessage('success', 'Thêm mục quảng cáo thành công');
        dispatch(fetchBannerProduct())
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error create banner: ', error);
      ToastMessage('error', 'Thêm mục quảng cáo thất bại');
    }
  };


  return (
    <View style={StyleAddBanner.container}>
      <View style={StyleAddBanner.viewheader}>
        <View style={StyleAddBanner.headerTitle}>
          <CustomHeader title='Thêm mục quảng cáo' color='red' />
        </View>
      </View>
      <View style={StyleAddBanner.containerBody}>
        <View >
          <View style={StyleAddBanner.viewImage}>
            {
              images ? <Image source={{ uri: images }} style={StyleAddBanner.image} /> :
                <Icon.AvatarSVG width={100} height={100} fill='black' />
            }
            <TouchableOpacity style={StyleAddBanner.buttonImage} onPress={handleSelectPhoto}>
              <Text style={StyleAddBanner.textButtonImage}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={StyleAddBanner.viewInput}>
            <Text style={StyleAddBanner.text}>Tên quảng cáo</Text>
            <InputCustom
              placeholder='Tiêu đề quảng cáo'
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={StyleAddBanner.button} onPress={handleCreateBanner}>
        <Text style={StyleAddBanner.textButton}>Thêm quảng cáo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBanner;
