import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackAdminManagerOtherEnum } from '../../model/enum/IndexStack.enum';
import { StackAdminMangerOtherParams } from '../../model/param/IndexStack.Param';

import EditProfileAdmin from '../../screens/admin/other/profile/EditProfileAdmin';
import ManagerCustomerAdmin from '../../screens/admin/other/customer/ManagerCustomerAdmin';

import EvaluateAdmin from '../../screens/admin/other/evaluate/EvaluateAdmin';
import ChangePasswordAdmin from '../../screens/admin/other/change/ChangePasswordAdmin';

import ChatAdmin from '../../screens/admin/other/chat/send/ChatAdmin';
import ContactFeedbackAdmin from '../../screens/admin/other/feedback/ContactFeedbackAdmin';

import SearchOrderAdmin from '../../screens/admin/infororder/search/SearchOrderAdmin';
import ListCustomerChat from '../../screens/admin/other/chat/list/ListCustomerChat';

const Stack = createNativeStackNavigator<StackAdminMangerOtherParams>();

const StackAdminManagerOther = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name={StackAdminManagerOtherEnum.EditProfileAdmin} component={EditProfileAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.ManagerCustomerAdmin} component={ManagerCustomerAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.EvaluateAdmin} component={EvaluateAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.ChangePasswordAdmin} component={ChangePasswordAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.ChatAdmin} component={ChatAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.ContactFeedbackAdmin} component={ContactFeedbackAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.SearchOrderAdmin} component={SearchOrderAdmin} />
            <Stack.Screen name={StackAdminManagerOtherEnum.ListCustomerChat} component={ListCustomerChat} />

        </Stack.Navigator>
    );
};



export default StackAdminManagerOther;