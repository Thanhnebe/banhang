import { ImageSourcePropType } from "react-native";

export interface CategoryState {
    _id: string;
    images: ImageSourcePropType;
    name: string;
}