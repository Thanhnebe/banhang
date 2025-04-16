import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackAdminManagerOrderEnum } from '../../model/enum/IndexStack.enum';
import { StackAdminManagerOrderParams } from '../../model/param/IndexStack.Param';

import DetailManagerOrder from '../../screens/admin/infororder/detail/DetailManagerOrder';
import DetailOrderCancel from '../../screens/admin/infororder/detail/DetailOrderCancel';
import DetailOrderDelivered from '../../screens/admin/infororder/detail/DetailOrderDelivered';
import DetailOrderDelivering from '../../screens/admin/infororder/detail/DetailOrderDelivering';
import DetailOrderPending from '../../screens/admin/infororder/detail/DetailPendingOrder';

const Stack = createNativeStackNavigator<StackAdminManagerOrderParams>();

const StacKAdminManagerOrder = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={StackAdminManagerOrderEnum.DetailManagerOrder} component={DetailManagerOrder} />
            <Stack.Screen name={StackAdminManagerOrderEnum.DetailOrderCancel} component={DetailOrderCancel} />
            <Stack.Screen name={StackAdminManagerOrderEnum.DetailOrderDelivered} component={DetailOrderDelivered} />
            <Stack.Screen name={StackAdminManagerOrderEnum.DetailOrderDelivering} component={DetailOrderDelivering} />
            <Stack.Screen name={StackAdminManagerOrderEnum.DetailOrderPending} component={DetailOrderPending} />
        </Stack.Navigator>
    );
};



export default StacKAdminManagerOrder;