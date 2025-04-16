import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackIndividualEnum } from '../../model/enum/IndexStack.enum';
import { StackIndividualParams } from '../../model/param/IndexStack.Param';
import EditProfile from '../../screens/user/other/profile/EditProfile';
import ViewAddress from '../../screens/user/other/address/view/ViewAddress';
import MoreAddress from '../../screens/user/other/address/more/MoreAddress';
import EditAddress from '../../screens/user/other/address/edit/EditAddress';
import ChooseAddress from '../../screens/user/other/address/maps/ChooseAddress';
import Favorites from '../../screens/user/other/wishList/Favorites';
import ChangePassword from '../../screens/user/other/password/ChangePassword';
import ChatWithAdmin from '../../screens/user/other/chat/ChatWithAdmin';
import ReviewInfor from '../../screens/user/other/review/ReviewInfor';
import DeleteAccount from '../../screens/user/other/account/DeleteAccount';
import ContactFeedback from '../../screens/user/other/feedback/ContactFeedback';
import Introduction from '../../screens/user/other/introduction/Introduction';
import SearchOrder from '../../screens/user/other/orderstatus/search/SearchOrder';

const Stack = createNativeStackNavigator<StackIndividualParams>();

const StackIndividual = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={StackIndividualEnum.EditProfile} component={EditProfile} />
            <Stack.Screen name={StackIndividualEnum.ViewAddRess} component={ViewAddress} />
            <Stack.Screen name={StackIndividualEnum.MoreAddress} component={MoreAddress} />
            <Stack.Screen name={StackIndividualEnum.EditAddress} component={EditAddress} />
            <Stack.Screen name={StackIndividualEnum.ChooseAddress} component={ChooseAddress} />
            <Stack.Screen name={StackIndividualEnum.Favorites} component={Favorites} />
            <Stack.Screen name={StackIndividualEnum.ChangePassword} component={ChangePassword} />
            <Stack.Screen name={StackIndividualEnum.ChatWithAdmin} component={ChatWithAdmin} />
            <Stack.Screen name={StackIndividualEnum.ReviewInfor} component={ReviewInfor} />
            <Stack.Screen name={StackIndividualEnum.DeleteAccount} component={DeleteAccount} />
            <Stack.Screen name={StackIndividualEnum.ContactFeedback} component={ContactFeedback} />
            <Stack.Screen name={StackIndividualEnum.Introduction} component={Introduction} />
            <Stack.Screen name={StackIndividualEnum.SearchOrder} component={SearchOrder} />
            {/* <Stack.Screen name={StackIndividualEnum.Customer} component={Customer} /> */}
        </Stack.Navigator>
    );
};



export default StackIndividual;