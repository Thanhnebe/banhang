import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackAdminManagerProductEnum } from '../../model/enum/IndexStack.enum';
import { StackAdminManagerProductParams } from '../../model/param/IndexStack.Param';

import ListProducts from '../../screens/admin/manager/products/list/ListProducts';
import AddProducts from '../../screens/admin/manager/products/add/AddProducts';
import EditProducts from '../../screens/admin/manager/products/edit/EditProducts';

import ListCategories from '../../screens/admin/manager/category/list/ListCategories';
import AddCategories from '../../screens/admin/manager/category/add/AddCategories';
import EditCategories from '../../screens/admin/manager/category/edit/EditCategories';

import ListBanner from '../../screens/admin/manager/banner/list/ListBanner';
import AddBanner from '../../screens/admin/manager/banner/add/AddBanner';
import EditBanner from '../../screens/admin/manager/banner/edit/EditBanner';

import ListVouchers from '../../screens/admin/manager/voucher/list/ListVoucher';
import AddVouchers from '../../screens/admin/manager/voucher/add/AddVoucher';
import EditVouchers from '../../screens/admin/manager/voucher/edit/EditVoucher';

import SendNotifications from '../../screens/admin/manager/notifications/send/SendNotification';
import ListNotifications from '../../screens/admin/manager/notifications/list/ListNotification';

import ListCustomer from '../../screens/admin/manager/customer/ListCustomer';

const Stack = createNativeStackNavigator<StackAdminManagerProductParams>();

const StackAdminManagerProduct = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name={StackAdminManagerProductEnum.ListProducts} component={ListProducts} />
            <Stack.Screen name={StackAdminManagerProductEnum.AddProducts} component={AddProducts} />
            <Stack.Screen name={StackAdminManagerProductEnum.EditProducts} component={EditProducts} />

            <Stack.Screen name={StackAdminManagerProductEnum.ListCategories} component={ListCategories} />
            <Stack.Screen name={StackAdminManagerProductEnum.AddCategories} component={AddCategories} />
            <Stack.Screen name={StackAdminManagerProductEnum.EditCategories} component={EditCategories} />

            <Stack.Screen name={StackAdminManagerProductEnum.ListBanner} component={ListBanner} />
            <Stack.Screen name={StackAdminManagerProductEnum.AddBanner} component={AddBanner} />
            <Stack.Screen name={StackAdminManagerProductEnum.EditBanner} component={EditBanner} />

            <Stack.Screen name={StackAdminManagerProductEnum.ListVouchers} component={ListVouchers} />
            <Stack.Screen name={StackAdminManagerProductEnum.AddVouchers} component={AddVouchers} />
            <Stack.Screen name={StackAdminManagerProductEnum.EditVouchers} component={EditVouchers} />

            <Stack.Screen name={StackAdminManagerProductEnum.SendNotifications} component={SendNotifications} />
            <Stack.Screen name={StackAdminManagerProductEnum.ListNotifications} component={ListNotifications} />

            <Stack.Screen name={StackAdminManagerProductEnum.ListCustomer} component={ListCustomer} />

        </Stack.Navigator>
    );
};



export default StackAdminManagerProduct;