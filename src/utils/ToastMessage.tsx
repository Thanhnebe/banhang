import Toast from "react-native-toast-message";

const ToastMessage = (type: 'success' | 'error' | 'info' | 'any', message: string) => {
    Toast.show({
        type: type,
        text1: message
    });
}

export default ToastMessage;