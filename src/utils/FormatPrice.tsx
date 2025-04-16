import { ProductState } from "../model/entity/IndexProduct.entity";

const FormatPrice = (price: number) => {
    const priceString = (price * 1000).toString();
    const formattedPrice = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice + "đ";
}

const FormatPriceVND = (price: number) => {
    if (price < 1000) {
        return price + "đ";
    }
    if (price < 1000000) {
        return (price / 1000) + "k";
    }
    if (price < 1000000000) {
        return (price / 1000000) + "tr";
    }
    return (price / 1000000000) + "tỷ";
}

const FormatPriceForVoucher = (price: number) => {
    if (price < 1000) {
        return price + "đ";
    }
    if (price < 1000000) {
        return (price / 1000).toFixed(3) + "đ";
    }
    return price + "đ";
}

const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
    return price - (price * discountPercentage / 100);
};

const FormatPriceVND2 = (price: number) => {
    const priceString = (price * 1).toString();
    const formattedPrice = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice + "đ";
}


export { FormatPrice, calculateDiscountedPrice, FormatPriceVND, FormatPriceForVoucher, FormatPriceVND2 };

