import { SvgProps } from "react-native-svg";
import { Icon } from "../constant/Icon";
import { FC } from "react";
import { ImageSourcePropType } from "react-native";


interface PaymentMethod {
    id: number;
    name: string;
    image?: ImageSourcePropType;
    icon?: FC<SvgProps>;
}

export const PaymentMethodData: PaymentMethod[] = [
    {
        id: 1,
        name: 'Thanh toán khi nhận hàng',
        icon: Icon.PaymentAtHomeSVG,
    },

    {
        id: 2,
        name: 'Thanh toán qua thẻ ngân hàng',
        icon: Icon.PaymentBankingSVG,
    },

    {
        id: 3,
        name: 'Thanh toán qua vnpay',
        image: Icon.PAYMENTVNPAY
    },
    {
        id: 4,
        name: 'Thanh toán chuyển khoản ngân hàng',
        icon: Icon.PayTransferSVG
    },
    {
        id: 5,
        name: 'Thanh toán bằng trả góp',
        icon: Icon.PaymentInstallmentSVG
    }
]

