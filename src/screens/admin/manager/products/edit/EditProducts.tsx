import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, InputCustom, CustomModalConfirm } from '../../../../../import/IndexComponent';

import StyleEditProducts from './StyleEditProducts';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateProduct, useGetProductsByIdQuery, deleteProduct, fetProductsPagination } from '../../../../../service/Api/IndexProduct';
import ToastMessage from '../../../../../utils/ToastMessage';

import { useAppSelector, useAppDispatch } from '../../../../../import/IndexFeatures';
import { Dropdown } from 'react-native-element-dropdown';
import { CreateProductState } from '../../../../../model/entity/IndexProduct.entity';

import { COLOR } from '../../../../../constant/Colors';
import { Icon } from '../../../../../constant/Icon';
import { fetchProducts } from '../../../../../service/Api/IndexProduct';


const EditProducts: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<{ route: any }, 'route'>>();

    const { data, isLoading } = useGetProductsByIdQuery(route.params?.id);

    const item = data?.data || [];

    const DataCategory = useAppSelector((state) => state.Category.data);

    const [selectedCategory, setSelectedCategory] = useState<string>(item[0]?.category || '');

    const [photoUrl, setPhotoUrl] = useState<string[]>([]);

    const [formValues, setFormValues] = useState<string[]>([]);

    const [priceColors, setPriceColors] = useState<{ color: string; price: number }[]>([]);

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (item.length > 0) {
            const product = item[0];
            setPhotoUrl(product.images as string[]);
            setFormValues([
                product.name,
                product.model,
                product.storage,
                product.description,
                product.brand,
                product.stock.toString(),
                product.specifications.screen || '',
                product.specifications.battery || '',
                product.specifications.memory || '',
                product.specifications.camera || '',
                product.specifications.processor || '',
                product.specifications.weight || '',
                product.specifications.dimensions || '',
                product.discount.percentage.toString(),
                product.discount.description,
                product.condition,
            ]);
            setPriceColors(product.priceColor);
        }
    }, [item]);

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
        const updatedPriceColors = priceColors.filter((_, i) => i !== index);
        setPriceColors(updatedPriceColors);
    }

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
            status: 'active',
            discount: {
                percentage: parseFloat(formValues[13]),
                description: formValues[14],
            },
            condition: formValues[15],
        };
        const images = photoUrl
        try {
            const response = await updateProduct(data, images, route.params?.id);
            if (response?.status === 200) {
                ToastMessage('success', 'Cập nhật sản phẩm thành công');
                dispatch(fetchProducts());
                dispatch(fetProductsPagination({ page: 1, limit: 10 }));
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Cập nhật sản phẩm thất bại');
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteProduct(route.params?.id);
            if (response?.status === 200) {
                ToastMessage('success', 'Xóa sản phẩm thành công');
                dispatch(fetchProducts());
                navigation.goBack();
            }
        } catch (error) {
            ToastMessage('error', 'Xóa sản phẩm thất bại');
        }
    }

    if (isLoading) {
        return (
            <View style={StyleEditProducts.loading}>
                <ActivityIndicator size="large" color={COLOR.REDONE} />
            </View>
        )
    }

    return (
        <View style={StyleEditProducts.container}>
            <View style={StyleEditProducts.viewheader}>
                <View style={StyleEditProducts.headerTitle}>
                    <CustomHeader title='Cập nhật sản phẩm' color='red' />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={StyleEditProducts.containerBody}>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Tên sản phẩm</Text>
                            <InputCustom
                                placeholder='Tên sản phẩm'
                                value={formValues[0]}
                                onChangeText={(value) => handleInputChange(0, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Kiểu mẫu điện thoại</Text>
                            <InputCustom
                                placeholder='Model'
                                value={formValues[1]}
                                onChangeText={(value) => handleInputChange(1, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Bộ nhớ</Text>
                            <InputCustom
                                placeholder='Bộ nhớ'
                                value={formValues[2]}
                                onChangeText={(value) => handleInputChange(2, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Mô tả</Text>
                            <InputCustom
                                placeholder='Mô tả'
                                value={formValues[3]}
                                onChangeText={(value) => handleInputChange(3, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Thương hiệu</Text>
                            <InputCustom
                                placeholder='Thương hiệu'
                                value={formValues[4]}
                                onChangeText={(value) => handleInputChange(4, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Số lượng</Text>
                            <InputCustom
                                placeholder='Số lượng'
                                value={formValues[5]}
                                onChangeText={(value) => handleInputChange(5, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                            <View style={StyleEditProducts.quantityButton}>
                                <TouchableOpacity onPress={() => handleQuantityChange(5, 1)}>
                                    <Icon.PlusSVG width={20} height={20} fill={COLOR.REDONE} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleQuantityChange(5, -1)}>
                                    <Icon.MinusSVG width={20} height={20} fill={COLOR.REDONE} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Màn hình</Text>
                            <InputCustom
                                placeholder='Màn hình'
                                value={formValues[6]}
                                onChangeText={(value) => handleInputChange(6, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Pin</Text>
                            <InputCustom
                                placeholder='Pin'
                                value={formValues[7]}
                                onChangeText={(value) => handleInputChange(7, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Bộ nhớ trong</Text>
                            <InputCustom
                                placeholder='Bộ nhớ trong'
                                value={formValues[8]}
                                onChangeText={(value) => handleInputChange(8, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Camera</Text>
                            <InputCustom
                                placeholder='Camera'
                                value={formValues[9]}
                                onChangeText={(value) => handleInputChange(9, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>CPU</Text>
                            <InputCustom
                                placeholder='CPU'
                                value={formValues[10]}
                                onChangeText={(value) => handleInputChange(10, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Trọng lượng</Text>
                            <InputCustom
                                placeholder='Trọng lượng'
                                value={formValues[11]}
                                onChangeText={(value) => handleInputChange(11, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Kích thước màn hình</Text>
                            <InputCustom
                                placeholder='Kích thước'
                                value={formValues[12]}
                                onChangeText={(value) => handleInputChange(12, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Giảm phần trăm mã</Text>
                            <InputCustom
                                placeholder='Phần trăm'
                                value={formValues[13]}
                                onChangeText={(value) => handleInputChange(13, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Mô tả giảm giá</Text>
                            <InputCustom
                                placeholder='Mô tả'
                                value={formValues[14]}
                                onChangeText={(value) => handleInputChange(14, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Tình trạng</Text>
                            <InputCustom
                                placeholder='Tình trạng'
                                value={formValues[15]}
                                onChangeText={(value) => handleInputChange(15, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                    </View>
                    <View style={StyleEditProducts.row}>
                        <Text style={StyleEditProducts.textTitle}>Danh mục sản phẩm</Text>
                        <Dropdown
                            style={[StyleEditProducts.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={StyleEditProducts.placeholderStyle}
                            selectedTextStyle={StyleEditProducts.selectedTextStyle}
                            inputSearchStyle={StyleEditProducts.inputSearchStyle}
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
                    <View style={StyleEditProducts.row}>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Màu</Text>
                            <InputCustom
                                placeholder='Màu'
                                value={formValues[16]}
                                onChangeText={(value) => handleInputChange(16, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <View style={StyleEditProducts.viewInput}>
                            <Text style={StyleEditProducts.textTitle}>Giá màu</Text>
                            <InputCustom
                                placeholder='Giá màu'
                                value={formValues[17]}
                                onChangeText={(value) => handleInputChange(17, value)}
                                style={StyleEditProducts.inputWrapper}
                            />
                        </View>
                        <TouchableOpacity onPress={addPriceColor} style={StyleEditProducts.button}>
                            <Text style={StyleEditProducts.textButton}>Thêm màu</Text>
                        </TouchableOpacity>
                    </View>
                    {priceColors.map((priceColor, index) => (
                        <View key={index} style={StyleEditProducts.row}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={StyleEditProducts.textTitle}>{priceColor.color}:</Text>
                                <Text style={StyleEditProducts.textTitle}>{priceColor.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removePriceColor(index)}>
                                <Icon.TrashSVG width={20} height={20} fill={COLOR.REDONE} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={StyleEditProducts.button} onPress={handleSelectPhoto}>
                        <Text style={StyleEditProducts.textButton}>Chọn ảnh</Text>
                    </TouchableOpacity>
                    <View style={StyleEditProducts.row}>
                        {photoUrl.map((url, index) => (
                            <Image key={index} source={{ uri: url }} style={StyleEditProducts.image} />
                        ))}
                    </View>
                    <TouchableOpacity style={StyleEditProducts.button} onPress={() => setModalVisible(true)}>
                        <Text style={StyleEditProducts.textButton}>Xóa sản phẩm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity style={StyleEditProducts.button} onPress={handleSubmit}>
                <Text style={StyleEditProducts.textButton}>Cập nhật sản phẩm</Text>
            </TouchableOpacity>
            <CustomModalConfirm
                isVisible={modalVisible}
                onPressCancel={() => setModalVisible(false)}
                onPressConfirm={handleDeleteProduct}
                title='Xác nhận xóa sản phẩm'
                message='Bạn có chắc chắn muốn xóa sản phẩm này không?'
            />
        </View>
    );
};

export default EditProducts;
