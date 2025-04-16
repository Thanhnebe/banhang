import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackAuthUserEnum } from '../../model/enum/IndexStack.enum';
import { StackAuthUserParams } from '../../model/param/IndexStack.Param';

import AuthLoginUser from '../../screens/auth/login/AuthLoginUser';
import AuthRegisterUser from '../../screens/auth/register/AuthRegisterUser';
import ForgotPassword from '../../screens/auth/password/reset/ForgotPassword';
import OtpPassword from '../../screens/auth/password/otp/OtpPassword';
import CreatePassword from '../../screens/auth/password/create/CreatePassword';

const Stack = createNativeStackNavigator<StackAuthUserParams>();

const StackAuthUser = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={StackAuthUserEnum.AuthLogin} component={AuthLoginUser} />
            <Stack.Screen name={StackAuthUserEnum.AuthRegister} component={AuthRegisterUser} />
            <Stack.Screen name={StackAuthUserEnum.ForgotPassword} component={ForgotPassword} />
            <Stack.Screen name={StackAuthUserEnum.OtpPassword} component={OtpPassword} />
            <Stack.Screen name={StackAuthUserEnum.CreatePassword} component={CreatePassword} />
        </Stack.Navigator>
    );
};



export default StackAuthUser;