import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';
import StyleAddVouchers from './StyleAddVoucher';

import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Icon } from '../../../../../constant/Icon';
import DatePicker from 'react-native-date-picker';
import { useGetOrderAdminQuery } from '../../../../../service/Api/Index.Order';

import { Dropdown } from 'react-native-element-dropdown';
import { useCreateAdminVoucherMutation } from '../../../../../service/Api/Index.Voucher';
import ToastMessage from '../../../../../utils/ToastMessage';

const AddVouchers: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [createAdminVoucher] = useCreateAdminVoucherMutation();

  const { data: dataOrder } = useGetOrderAdminQuery();

  const userCustomer = dataOrder?.data.map((item: any) => ({ label: item.user.fullname, value: item.user._id })) || [];

  const [images, setImages] = useState<string>('');

  const [onpenDatePicker, setOpenDatePicker] = useState<boolean>(false);


  const [input, setInput] = useState<any>({
    name: '',
    code: '',
    discount: '',
    maxDiscountAmount: '',
    minOrderAmount: '',
    expirationDate: '',
    usageLimit: '',
    usersApplicable: [],
    paymentMethod: '',
    condition: '',
    description: '',
  });

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

  const handleInputChange = (field: string, value: any) => {
    if (field === 'usersApplicable') {
      setInput({ ...input, usersApplicable: value });
    } else {
      setInput({ ...input, [field]: value });
    }
  };


  const renderInputField = (label: string, placeholder: string, field: string) => (
    <View style={StyleAddVouchers.viewInput}>
      <Text style={StyleAddVouchers.textTitle}>{label}</Text>
      {field === 'expirationDate' ? (
        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <InputCustom
            placeholder={placeholder}
            value={input[field]}
            style={StyleAddVouchers.input}
            editable={false}
          />
        </TouchableOpacity>
      ) : field === 'usersApplicable' ? (
        <Dropdown
          style={[StyleAddVouchers.dropdown, { borderColor: 'blue' }]}
          placeholderStyle={StyleAddVouchers.placeholderStyle}
          selectedTextStyle={StyleAddVouchers.selectedTextStyle}
          inputSearchStyle={StyleAddVouchers.inputSearchStyle}
          data={userCustomer}
          value={input.usersApplicable}
          onChange={(value) => handleInputChange(field, value)}
          labelField='label'
          valueField='value'
          searchField='label'
          placeholder='Tặng mã riêng cho người dùng...'
          search={true}
          
        />

      ) : (
        <InputCustom
          placeholder={placeholder}
          value={input[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          style={StyleAddVouchers.input}
        />
      )}
    </View>
  );

  const handleCreateVoucher = async () => {
    try {
      const body = {
        name: input.name,
        code: input.code,
        discount: isNaN(Number(input.discount)) ? 0 : Number(input.discount),
        description: input.description,
        condition: input.condition,
        maxDiscountAmount: isNaN(Number(input.maxDiscountAmount)) ? 0 : Number(input.maxDiscountAmount),
        minOrderAmount: isNaN(Number(input.minOrderAmount)) ? 0 : Number(input.minOrderAmount),
        usageLimit: isNaN(Number(input.usageLimit)) ? 0 : Number(input.usageLimit),
        paymentMethod: input.paymentMethod,
        expirationDate: input.expirationDate,
        usersApplicable: input.usersApplicable.value,
        images: {
          fileName: images.split('/').pop(),
          type: 'image/jpeg',
          uri: images,
        }
      };
      const result = await createAdminVoucher(body);
      if (result.data) {
        ToastMessage('success', 'Thêm mã giảm giá thành công');
        navigation.goBack()
      }
    } catch (error) {
      console.log('Error creating voucher: ', error);
    }
  }

  const inputFields = [
    { label: 'Tên mã giảm giá', placeholder: 'Tên mã giảm % tối đa bao nhiêu tiền...', field: 'name' },
    { label: 'Mã giảm giá', placeholder: 'Mã giảm giá code....', field: 'code' },
    { label: 'Giảm giá', placeholder: 'Giảm giá %...', field: 'discount' },
    { label: 'Số tiền giảm tối đa', placeholder: 'Số tiền tối đa...', field: 'maxDiscountAmount' },
    { label: 'Giá trị tối thiếu đơn hàng', placeholder: 'Giá trị tối thiểu...', field: 'minOrderAmount' },
    { label: 'Ngày hết hạn', placeholder: 'Ngày hết hạn...', field: 'expirationDate' },
    { label: 'Số lần sử dụng', placeholder: 'Số lần sử dụng...', field: 'usageLimit' },
    { label: 'Tặng mã riêng cho người dùng', placeholder: 'Tặng mã riêng cho người dùng...', field: 'usersApplicable' },
    { label: 'Áp dụng phương thức thanh toán nào', placeholder: 'Áp dụng phương thức thanh toán nào...', field: 'paymentMethod' },
    { label: 'Điều kiện áp dụng', placeholder: 'Điều kiện áp dụng...', field: 'condition' },
    { label: 'Mô tả mã giảm', placeholder: 'Mô tả mã giảm...', field: 'description' },
  ];

  return (
    <View style={StyleAddVouchers.container}>
      <View style={StyleAddVouchers.viewheader}>
        <View style={StyleAddVouchers.headerTitle}>
          <CustomHeader title='Thêm mã giảm giá' color='red' />
        </View>
      </View>
      <View style={StyleAddVouchers.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={StyleAddVouchers.viewImage}>
            <TouchableOpacity style={StyleAddVouchers.buttonImage} onPress={handleSelectPhoto}>
              <Text style={StyleAddVouchers.textButtonImage}>Chọn ảnh</Text>
              <Image source={Icon.RIGHT} style={StyleAddVouchers.iconButtonImage} />
            </TouchableOpacity>
            {images ?
              <Image source={{ uri: images }} style={StyleAddVouchers.imageLogo} />
              :
              <Image source={{ uri: 'https://storeapi.s3.ap-southeast-2.amazonaws.com/voucher/apple-logo.png' }} style={StyleAddVouchers.image} />
            }
          </View>
          {inputFields.map((inputField, index) => (
            <View key={index}>
              {renderInputField(inputField.label, inputField.placeholder, inputField.field)}
            </View>
          ))}
          <DatePicker
            modal={true}
            open={onpenDatePicker}
            date={input.expirationDate ? new Date(input.expirationDate) : new Date()}
            mode="date"
            onConfirm={(date) => {
              setInput({ ...input, expirationDate: date.toISOString() });
              setOpenDatePicker(false);
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
            locale="vi-VN"
          />
        </ScrollView>
        <TouchableOpacity style={StyleAddVouchers.buttonSave} onPress={handleCreateVoucher}>
          <Text style={StyleAddVouchers.textButtonSave}>Thêm mã giảm giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddVouchers;
