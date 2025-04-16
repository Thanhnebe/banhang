import { Linking } from "react-native"

export const handleLinking = (url: string) => {
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
}