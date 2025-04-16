import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';


class HandleClearCache {
    static async clearAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage successfully cleared!');
        } catch (error) {
        console.log("🚀 ~ HandleClearCache ~ clearAsyncStorage ~ error:", error)
        }
    }

    static clearFastImageCache() {
        FastImage.clearMemoryCache();
        FastImage.clearDiskCache();
        console.log('FastImage successfully cleared!');
    }
}

export { HandleClearCache }