import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';

import StyleAddProducts from './StyleAddProducts';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Icon } from '../../../../../constant/Icon';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { createProduct } from '../../../../../service/Api/IndexProduct';
import ToastMessage from '../../../../../utils/ToastMessage';
import { useAppDispatch, useAppSelector } from '../../../../../import/IndexFeatures';

import { Dropdown } from 'react-native-element-dropdown';
import { CreateProductState } from '../../../../../model/entity/IndexProduct.entity';
import { fetchProducts } from '../../../../../service/Api/IndexProduct';
import { fetProductsPagination } from '../../../../../service/Api/IndexProduct';

const AddProducts: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useAppDispatch();

    const DataCategory = useAppSelector((state) => state.Category.data);

    const [photoUrl, setPhotoUrl] = useState<string[]>([]);

    const [formValues, setFormValues] = useState<string[]>(Array(10).fill(''));

    const [priceColors, setPriceColors] = useState<{ color: string, price: number }[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const inputFields = [
        { placeholder: 'Tên sản phẩm', title: 'Tên sản phẩm' },
        { placeholder: 'Mẫu điện thoại', title: 'Hàng xuất xứ' },
        { placeholder: 'Bộ nhớ', title: 'Bộ nhớ' },
        { placeholder: 'Mô tả thông tin máy', title: 'Mô tả chỉ tiết mẫu điện thoại' },
        { placeholder: 'Thương hiệu', title: 'Thương hiệu' },
        { placeholder: 'Số lượng', title: 'Số lượng' },
        { placeholder: 'Màn hình', title: 'Màn hình' },
        { placeholder: 'Pin điện thoại', title: 'Lượng pin' },
        { placeholder: 'Thẻ nhớ', title: 'Thẻ nhớ' },
        { placeholder: 'Thông tin máy ảnh', title: 'Camera trước sau' },
        { placeholder: 'Bộ xử lý', title: 'Bộ xử lý' },
        { placeholder: 'Trọng lượng điện thoại', title: 'Cân nặng điện thoại' },
        { placeholder: 'Kích thước', title: 'Kích thước màn hình' },
        { placeholder: 'Giảm phần trăm mã giảm', title: 'Phần trăm giảm' },
        { placeholder: 'Mô tả giảm giá', title: 'Mô tả chi tiết phần trăm' },
        { placeholder: 'Loại sản phẩm', title: 'Loại sản phẩm (mới,cũ)' },
        { placeholder: 'Màu sắc', title: 'Màu sắc' },
        { placeholder: 'Giá màu sắc', title: 'Giá màu sắc' },
    ];

    const handleInputChange = (index: number, value: string) => {
        const updatedValues = [...formValues];
        updatedValues[index] = value;
        setFormValues(updatedValues);
    };

    const handleSelectPhoto = async () => {
        ImageCropPicker.openPicker({
            multiple: true,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.7,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            includeBase64: true,
        }).then((images: any) => {
            const imagePaths = images.map((image: any) => image.path);
            setPhotoUrl(imagePaths);
        }).catch(error => {
            console.log('Error selecting images: ', error);
        });
    };

    const handleQuantityChange = (index: number, delta: number) => {
        const currentValue = parseInt(formValues[index], 10) || 0;
        const updatedValue = Math.max(0, currentValue + delta);
        handleInputChange(index, updatedValue.toString());
    };

    const addPriceColor = () => {
        const color = formValues[16];
        const price = parseFloat(formValues[17]);
        if (color && !isNaN(price)) {
            const updatedPriceColors = [...priceColors];
            updatedPriceColors.push({ color, price });
            setPriceColors(updatedPriceColors);
            const updatedValues = [...formValues];
            updatedValues[16] = '';
            updatedValues[17] = '';
        } else {
            ToastMessage('error', 'Vui lòng nhập màu và giá hợp lệ trước khi thêm.');
        }
    };

    const removePriceColor = (index: number) => {
        const updatedPriceColors = priceColors.filter((item, i) => i !== index);
        setPriceColors(updatedPriceColors);
    };

    const handleSubmit = async () => {
        const data: CreateProductState = {
            name: formValues[0],
            model: formValues[1],
            storage: formValues[2],
            priceColor: priceColors as any,
            description: formValues[3],
            category: selectedCategory,
            brand: formValues[4],
            stock: parseInt(formValues[5], 10),
            specifications: {
                screen: formValues[6],
                battery: formValues[7],
                memory: formValues[8],
                camera: formValues[9],
                processor: formValues[10],
                weight: formValues[11],
                dimensions: formValues[12],
            },
            status: 'available',
            discount: {
                percentage: parseFloat(formValues[13]),
                description: formValues[14],
            },
            condition: formValues[15],
        };
        const images = photoUrl
        try {
            const response = await createProduct(data, images);
            if (response?.status === 201) {
                ToastMessage('success', 'Thêm sản phẩm thành công');
                dispatch(fetchProducts());
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Thêm sản phẩm thất bại');
        }
    };

    return (
        <View style={StyleAddProducts.container}>
            <View style={StyleAddProducts.viewheader}>
                <View style={StyleAddProducts.headerTitle}>
                    <CustomHeader title='Thêm sản phẩm' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={StyleAddProducts.containerBody}>
                    {inputFields.map((field, index) => (
                        <View key={index} style={StyleAddProducts.row}>
                            <View style={StyleAddProducts.inputWrapper}>
                                <Text style={StyleAddProducts.label}>{field.title}</Text>
                                <InputCustom
                                    placeholder={field.placeholder}
                                    value={formValues[index]}
                                    onChangeText={(value) => handleInputChange(index, value)}
                                    style={StyleAddProducts.input}
                                />
                                {field.title === 'Số lượng' &&
                                    <View style={StyleAddProducts.viewIcon}>
                                        <TouchableOpacity onPress={() => handleQuantityChange(index, 1)}>
                                            <Icon.PlusSVG width={20} height={20} fill='red' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleQuantityChange(index, -1)}>
                                            <Icon.MinusSVG width={20} height={20} fill='red' />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity onPress={addPriceColor} style={StyleAddProducts.addPriceColorButton}>
                        <Text style={StyleAddProducts.textButton}>Thêm Màu & Giá</Text>
                    </TouchableOpacity>
                    {priceColors.length > 0 && (
                        <View>
                            {priceColors.map((item, index) => (
                                <View style={StyleAddProducts.priceColorContainer}>
                                    <Text key={index}>Màu: {item.color} - Giá: {item.price}</Text>
                                    <TouchableOpacity onPress={() => removePriceColor(index)}>
                                        <Icon.TrashSVG width={20} height={20} fill='red' />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                    <View style={StyleAddProducts.viewDropdown}>
                        <Text style={StyleAddProducts.label}>Danh mục sản phẩm</Text>
                        <Dropdown
                            style={[StyleAddProducts.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={StyleAddProducts.placeholderStyle}
                            selectedTextStyle={StyleAddProducts.selectedTextStyle}
                            inputSearchStyle={StyleAddProducts.inputSearchStyle}
                            data={DataCategory}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="_id"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={selectedCategory}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setSelectedCategory(item._id);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                    <View style={StyleAddProducts.imageContainer}>
                        {photoUrl.map((imageSource, index) => (
                            <TouchableOpacity key={index}>
                                <Image
                                    source={{ uri: imageSource }}
                                    style={StyleAddProducts.image}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleSelectPhoto}>
                        <Text style={StyleAddProducts.textImage}>Chọn ảnh</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity style={StyleAddProducts.button} onPress={handleSubmit}>
                <Text style={StyleAddProducts.textButton}>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddProducts;
