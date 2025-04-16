import { ImageSourcePropType } from "react-native";

export interface MessageEntity {
    username: string;
    message: string;
    role: string;
    video: string;
    audio: string;
    image: ImageSourcePropType | string;
    time: string;
}
