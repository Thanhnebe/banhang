import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface AddressEntity {
    _id: string;
    user_id: string;
    houseNumber: string;
    ward: string;
    district: string;
    province: string;
    name: string;
    phone: string;
    addressType: AddressType;
    isDefault: boolean;
}

export interface CreateAddressEntity {
    user_id: string;
    houseNumber: string;
    ward: string;
    district: string;
    province: string;
    name: string;
    phone: string;
    addressType: string;
    isDefault: boolean;
}

export interface UpdateAddressEntity {
    _id: string;
    houseNumber: string;
    ward: string;
    district: string;
    province: string;
    name: string;
    phone: string;
    addressType: string;
    isDefault: boolean;
}

export const enum isBoolean {
    TRUE = 'true',
    FALSE = 'false'
}

export const enum AddressType {
    HOME = 'Nhà riêng',
    OFFICE = 'Văn phòng',
}

export type AddressParams = {
    item: {
        _id: string;
        province: string;
        district: string;
        ward: string;
    }
}

export type TypeEditAddressParmas = NativeStackScreenProps<AddressParams, 'item'>;
