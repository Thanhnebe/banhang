

import { createNavigationContainerRef } from '@react-navigation/native';
import { StackHomeTypeParam } from '../model/param/IndexStack.Param';

export const navigationRef = createNavigationContainerRef<any>();

export const navigate = (name: string, params?: any) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.log('Navigation not ready');
    }
} 
