import { ImageSourcePropType } from "react-native";
import { AddressEntity } from "./IndexAddress.entity";
import { DetailProductParams } from "./IndexProduct.entity";

export interface CartEntity {
    _id: string;
    user: string;
    products: {
        _id: string;
        name: string
        model: string
        storage: string
        priceColor: {
            color: string,
            price: number,
            image: ImageSourcePropType | string,
        }
    },
    quantity: number;
    status: string;
}

export interface ResponseCartEntity {
    data: CartEntity;
}


export interface CreateCartEntity {
    user: string;
    products: {
        _id: string;
        name: string;
        model: string;
        storage: string;
        priceColor: {
            color: string;
            price: number;
            image: ImageSourcePropType | string;
        }
    },
    quantity: number;
    status: string;
}

export interface UpdateCartEntity {
    _id: string;
    products: {
        _id: string;
        name: string;
        model: string;
        storage: string;
        priceColor: {
            color: string;
            price: number;
            image: ImageSourcePropType | string;
        }
    },
    quantity: number;
    status: string;
}