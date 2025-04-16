import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, InputCustom, CustomModalConfirm } from '../../../../../import/IndexComponent';

import StyleEditVouchers from './StyleEditVoucher';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ToastMessage from '../../../../../utils/ToastMessage';
import { useGetDetailAdminVoucherQuery, useUpdateAdminVoucherMutation, useDeleteAdminVoucherMutation } from '../../../../../service/Api/Index.Voucher';
import { ScrollView } from 'react-native-gesture-handler';

import { FormatDate2 } from '../../../../../utils/FormatDate';
import DatePicker from 'react-native-date-picker'
import { useGetOrderAdminQuery } from '../../../../../service/Api/Index.Order';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '../../../../../constant/Icon';

const EditVouchers: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const route = useRoute<RouteProp<{ route: any }, 'route'>>();

    const id = route.params?.id;

    const { data: dataOrder } = useGetOrderAdminQuery();

    const userCustomer = dataOrder?.data.map((item: any) => ({ label: item.user.fullname, value: item.user._id })) || [];

    const { data, isLoading } = useGetDetailAdminVoucherQuery(id);

    const [updateAdminVoucher] = useUpdateAdminVoucherMutation();

    const [deleteAdminVoucher] = useDeleteAdminVoucherMutation();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [opendDate, setOpenDate] = useState<boolean>(false);

    const [input, setInput] = useState<any>({
        name: '',
        images: '',
        code: '',
        discount: 0,
        description: '',
        condition: '',
        maxDiscountAmount: 0,
        minOrderAmount: 0,
        usageLimit: 0,
        usersApplicable: [],
        paymentMethod: '',
        expirationDate: '',
        createdAt: '',
    });
    // console.log('data', input);

    const [images, setImages] = useState<string>('');

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

    useEffect(() => {
        if (id && data) {
            setInput({
                ...data?.data,
            });
        }
    }, [id, data]);

    const handleUpdateVoucher = async () => {
        try {
            const body = {
                name: input.name,
                code: input.code,
                discount: input.discount,
                description: input.description,
                condition: input.condition,
                maxDiscountAmount: input.maxDiscountAmount,
                minOrderAmount: input.minOrderAmount,
                usageLimit: input.usageLimit,
                paymentMethod: input.paymentMethod,
                expirationDate: input.expirationDate,
                images: {
                    name: images.split('/').pop(),
                    type: 'image/jpeg',
                    uri: images,
                },
            };
            const response = await updateAdminVoucher({ id, body });
            console.log("🚀 ~ handleUpdateVoucher ~ response:", response)
            if (response.data) {
                ToastMessage('success', 'Cập nhật mã giảm giá thành công');
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Cập nhật mã giảm giá thất bại');
        }
    };

    const handleDeleteVoucher = async () => {
        try {
            const response = await deleteAdminVoucher(id);
            if (response.data) {
                ToastMessage('success', 'Xóa mã giảm giá thành công');
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Xóa mã giảm giá thất bại');
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
        <View style={StyleEditVouchers.container}>
            <View style={StyleEditVouchers.viewheader}>
                <View style={StyleEditVouchers.headerTitle}>
                    <CustomHeader title='Cập nhật mã giảm giá' color='red' />
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                        <Icon.TrashSVG width={20} height={20} fill='red' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={StyleEditVouchers.containerBody}>
                <View style={StyleEditVouchers.viewImage}>
                    {images ?
                        <Image source={{ uri: images }} style={StyleEditVouchers.image} />
                        :
                        <Image source={{ uri: data?.data.images as string }}
                            style={StyleEditVouchers.imageLogo} />
                    }
                    <TouchableOpacity style={StyleEditVouchers.buttonImage} onPress={handleSelectPhoto}>
                        <Text style={StyleEditVouchers.textButtonImage}>Chọn ảnh</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Tên mã giảm</Text>
                        <InputCustom
                            placeholder='Tên mã giảm giá...'
                            value={input.name}
                            onChangeText={(value) => setInput({ ...input, name: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Mã giảm giá</Text>
                        <InputCustom
                            placeholder='Mã giảm giá...'
                            value={input.code}
                            onChangeText={(value) => setInput({ ...input, code: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Giảm giá</Text>
                        <InputCustom
                            placeholder='Giảm giá...'
                            value={input.discount.toString()}
                            onChangeText={(value) => setInput({ ...input, discount: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Số tiền giảm tối đa</Text>
                        <InputCustom
                            placeholder='Số tiền giảm tối đa...'
                            value={input.maxDiscountAmount.toString()}
                            onChangeText={(value) => setInput({ ...input, maxDiscountAmount: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Giá trị tối thiểu đơn hàng</Text>
                        <InputCustom
                            placeholder='Giá trị tối thiểu đơn hàng...'
                            value={input.minOrderAmount.toString()}
                            onChangeText={(value) => setInput({ ...input, minOrderAmount: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <TouchableOpacity style={StyleEditVouchers.viewInput} onPress={() => setOpenDate(true)}>
                        <Text style={StyleEditVouchers.text}>Ngày hết hạn</Text>
                        <InputCustom
                            placeholder='Ngày hết hạn...'
                            value={FormatDate2(input.expirationDate)}
                            onChangeText={(value) => setInput({ ...input, expirationDate: value })}
                            style={StyleEditVouchers.input}
                            disabled={true}
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal={true}
                        mode="date"
                        open={opendDate}
                        date={input.expirationDate ? new Date(input.expirationDate) : new Date()}
                        locale="vi-VN"
                        onConfirm={(selectedDate) => {
                            setOpenDate(false);
                            setInput({ ...input, expirationDate: selectedDate });
                        }}
                        onCancel={() => {
                            setOpenDate(false);
                        }}
                    />
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Số lần sử dụng</Text>
                        <InputCustom
                            placeholder='Số lần sử dụng...'
                            value={input.usageLimit.toString()}
                            onChangeText={(value) => setInput({ ...input, usageLimit: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Tặng mã riêng cho người dùng</Text>
                        <Dropdown
                            style={[StyleEditVouchers.dropdown, { borderColor: 'blue' }]}
                            placeholderStyle={StyleEditVouchers.placeholderStyle}
                            selectedTextStyle={StyleEditVouchers.selectedTextStyle}
                            inputSearchStyle={StyleEditVouchers.inputSearchStyle}
                            data={userCustomer}
                            value={input.usersApplicable}
                            onChange={(value) => setInput({ ...input, usersApplicable: value })}
                            labelField='label'
                            valueField='value'

                            placeholder='Tặng mã riêng cho người dùng...'
                            search={true}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Phương thức thanh toán</Text>
                        <InputCustom
                            placeholder='Phương thức thanh toán...'
                            value={input.paymentMethod}
                            onChangeText={(value) => setInput({ ...input, paymentMethod: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Điều kiện áp dụng</Text>
                        <InputCustom
                            placeholder='Điều kiện áp dụng...'
                            value={input.condition}
                            onChangeText={(value) => setInput({ ...input, condition: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                    <View style={StyleEditVouchers.viewInput}>
                        <Text style={StyleEditVouchers.text}>Mô tả mã giảm</Text>
                        <InputCustom
                            placeholder='Mô tả mã giảm...'
                            value={input.description}
                            onChangeText={(value) => setInput({ ...input, description: value })}
                            style={StyleEditVouchers.input}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={StyleEditVouchers.containerFooter}>
                <TouchableOpacity style={StyleEditVouchers.button} onPress={handleUpdateVoucher}>
                    <Text style={StyleEditVouchers.textButton}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
            <CustomModalConfirm
                isVisible={openModal}
                title='Xác nhận'
                message='Bạn có chắc chắn muốn xóa mã giảm giá này không?'
                onPressCancel={() => setOpenModal(false)}
                onPressConfirm={handleDeleteVoucher}
            />
        </View >
    );
};

export default EditVouchers;
