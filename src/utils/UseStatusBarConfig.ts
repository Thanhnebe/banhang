import { useEffect, useLayoutEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

const useStatusBarConfig = (
    barStyle: 'default' | 'light-content' | 'dark-content',
    backgroundColor: string,
    translucent: boolean = false
) => {
    useEffect(() => {
        StatusBar.setBarStyle(barStyle);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(backgroundColor);
            StatusBar.setTranslucent(translucent);
        }
        return () => {
            StatusBar.setBarStyle('dark-content');
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor('transparent');
                StatusBar.setTranslucent(true);
            }
        };
    }, [barStyle, backgroundColor, translucent]);
};

export default useStatusBarConfig;
