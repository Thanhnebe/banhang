import { ImageSourcePropType } from 'react-native';
import { CategoryState } from './IndexCategory.entity';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface ProductState {
    _id: string;
    name: string;
    model: string;
    storage: string;
    priceColor: [
        {
            color: string;
            price: number;
        }
    ];
    images: ImageSourcePropType[];
    description: string;
    category: CategoryState;
    brand: string;
    stock: number;
    specifications: {
        screen?: string;
        battery?: string;
        memory?: string;
        camera?: string;
        processor?: string;
        weight?: string;
        dimensions?: string;
    };
    status: string;
    discount: {
        percentage: number;
        description: string;
    };
    condition: string;
}

export interface CreateProductState {
    name: string;
    model: string;
    storage: string;
    priceColor: [
        {
            color: string;
            price: number;
        }
    ];
    description: string;
    category: any;
    brand: string;
    stock: number;
    specifications: {
        screen?: string;
        battery?: string;
        memory?: string;
        camera?: string;
        processor?: string;
        weight?: string;
        dimensions?: string;
    };
    status: string;
    discount: {
        percentage: number;
        description: string;
    };
    condition: string;
}

export interface ProductPaginationState {
    _id: string;
    name: string;
    model: string;
    storage: string;
    priceColor: [
        {
            color: string;
            price: number;
        }
    ];
    images: ImageSourcePropType[];
    description: string;
    category: CategoryState;
    brand: string;
    stock: number;
    specifications: {
        screen?: string;
        battery?: string;
        memory?: string;
        camera?: string;
        processor?: string;
        weight?: string;
        dimensions?: string;
    };
    status: string;
    discount: {
        percentage: number;
        description: string;
    };
    condition: string;
}

export type DetailProductParams = {
    _id: string;
    name: string;
    model: string;
    storage: string;
    priceColor: [
        {
            color: string;
            price: number;
        }
    ];
    description: string;
    images: ImageSourcePropType[];
    category: any;
    brand: string;
    stock: number;
    specifications: {
        screen?: string;
        battery?: string;
        memory?: string;
        camera?: string;
        processor?: string;
        weight?: string;
        dimensions?: string;
    };
    status: string;
    discount: {
        percentage: number;
        description: string;
    };
    condition: string;
}

type IdDetailProduct = {
    idproduct: {
        _id: string;
    }
}

type NameProducts = {
    products: {
        name: string;
    }
}

export type TypeDetailPoduct = NativeStackScreenProps<IdDetailProduct, 'idproduct'>

export type TypeNameProductParams = NativeStackScreenProps<NameProducts, 'products'>