import { DetailProductParams } from "../model/entity/IndexProduct.entity";

export const colorMapping: { [key: string]: string[] } = {
    /*Iphone*/
    "Đen": ["Black", "MiniBlack"],
    "Trắng": ["white", "MiniWhite"],
    "Hồng": ["pinky", "purple", "ProPurple", "MiniPurple"],
    "Xanh dương": ["blue", "MiniBlue"],
    "Xanh lá cây": ["green", "ProGreen", "MiniGreen"],
    "Xanh đen": ["MacbookAirM3GreenBlack"],
    "Đỏ": ["red", "MiniRed"],
    "Vàng": ["gold", "Yellow", "ProGold", "ProYellow", "MacbookAirM3SYellow"],
    "Xám": ["progrey", "ProGrey", "MacbookAirM38512GB", "MacbookAirM3Grey"],
    "Bạc": ["prosilver", "ProSilver", "MacbookAirM3Silever"],
    "Titan Xanh": ["ProTitanBlue"],
    "Titan Đen": ["protitanblack"],
    "Titan Trắng": ["ProTitanWhite"],
    "Titan Tự nhiên": ["ProTitanNatural"],
};


export const findImageByColor = (item: DetailProductParams, color: string) => {
    const normalizedColor = colorMapping[color];
    const matchedImage = item.images.find(image => {
        const imageName = image.toString().split('/').pop()?.split('.')[0];
        return normalizedColor?.some(color => imageName?.toLowerCase().includes(color.toLowerCase()));
    });
    return matchedImage ? matchedImage : item.images[0];
};
