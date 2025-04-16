import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";

interface VoucherEntity {
    _id: string;
    userUsed: string[];
    usersApplicable: string[];
    name: string;
    images: ImageSourcePropType;
    code: string;
    discount: number;
    description: string;
    condition: string;
    maxDiscountAmount: number;
    minOrderAmount: number;
    usageLimit: number;
    paymentMethod: string;
    status: string;
    expirationDate: string;
    createdAt: string;
}
interface CreateVoucherEntity {
    name: string;
    code: string;
    discount: number;
    description: string;
    condition: string;
    maxDiscountAmount: number;
    minOrderAmount: number;
    usageLimit: number;
    paymentMethod: string;
    usersApplicable: string[];
    expirationDate: string;
    images: string;
}

interface UpdateVoucherEntity {
    name: string;
    code: string;
    discount: number;
    description: string;
    condition: string;
    maxDiscountAmount: number;
    minOrderAmount: number;
    usageLimit: number;
    paymentMethod: string;
    usersApplicable: string[];
    expirationDate: string;
    images: string;
}

interface UseVoucherEntity {
    id: string;
    userId: string;
    paymentMethod: string;
}


type VoucherState = {
    idVoucher: {
        id: string;
    }
}

export type TypeVoucherProps = NativeStackScreenProps<VoucherState, 'idVoucher'>;


export type { VoucherEntity, CreateVoucherEntity, UpdateVoucherEntity, UseVoucherEntity }