import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackMiscEnum } from '../../model/enum/IndexStack.enum';
import { StackMiscParams } from '../../model/param/IndexStack.Param';
import SearchHome from '../../screens/user/homeproduct/search/SearchHome';
import Article from '../../screens/user/homeproduct/product/Article';
import CategoryArticle from '../../screens/user/homeproduct/product/CategoryArticle';
import AllCategoryProduct from '../../screens/user/category/all/AllCategoryProduct';
import DetailArticle from '../../screens/user/homeproduct/detail/DetailArticle';
import PaymentOrders from '../../screens/user/order/payment/PaymentOrders';
import SelectedAddress from '../../screens/user/order/selected/addressorder/SelectedAddress';
import VoucherCoupon from '../../screens/user/order/voucher/list/VoucherCoupon';
import DetailVoucherCoupon from '../../screens/user/order/voucher/detail/DetailVoucherCoupon';
import PaymentProvider from '../../screens/user/order/selected/paymentmethod/PaymentProvider';
import DetailOrder from '../../screens/user/other/orderstatus/detail/DetailOrder';
import DetailStatusCancelled from '../../screens/user/other/orderstatus/cancelled/detail/DetailStatusCancelled';
import DetailPendingDelivery from '../../screens/user/other/orderstatus/delivery/detail/DetailPendingDelivery';
import DetailStatusDelivered from '../../screens/user/other/orderstatus/delivered/detail/DetailStatusDelivered';
import OrderSuccess from '../../screens/user/order/result/OrderSuccess';
import OrderFailed from '../../screens/user/order/result/OrderFailed';
import Notification from '../../screens/user/homeproduct/notify/Notification';
import EvaluateProducts from '../../screens/user/other/evaluate/EvaluateProducts';


const Stack = createNativeStackNavigator<StackMiscParams>();

const StackMisc = (): React.JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={StackMiscEnum.SearchHome} component={SearchHome} />
            <Stack.Screen name={StackMiscEnum.Article} component={Article} />
            <Stack.Screen name={StackMiscEnum.CategoryArticle} component={CategoryArticle} />
            <Stack.Screen name={StackMiscEnum.AllCategoryProduct} component={AllCategoryProduct} />
            <Stack.Screen name={StackMiscEnum.DetailArticle} component={DetailArticle} />
            <Stack.Screen name={StackMiscEnum.PaymentOrders} component={PaymentOrders} />
            <Stack.Screen name={StackMiscEnum.SelectedAddress} component={SelectedAddress} />
            <Stack.Screen name={StackMiscEnum.VoucherCoupon} component={VoucherCoupon} />
            <Stack.Screen name={StackMiscEnum.DetailVoucherCoupon} component={DetailVoucherCoupon} />
            <Stack.Screen name={StackMiscEnum.PaymentProvider} component={PaymentProvider} />
            <Stack.Screen name={StackMiscEnum.DetailOrder} component={DetailOrder} />
            <Stack.Screen name={StackMiscEnum.DetailStatusCancelled} component={DetailStatusCancelled} />
            <Stack.Screen name={StackMiscEnum.DetailPendingDelivery} component={DetailPendingDelivery} />
            <Stack.Screen name={StackMiscEnum.DetailStatusDelivered} component={DetailStatusDelivered} />
            <Stack.Screen name={StackMiscEnum.OrderSuccess} component={OrderSuccess} />
            <Stack.Screen name={StackMiscEnum.OrderFailed} component={OrderFailed} />
            <Stack.Screen name={StackMiscEnum.Notification} component={Notification} />
            <Stack.Screen name={StackMiscEnum.EvaluateProducts} component={EvaluateProducts} />
        </Stack.Navigator>
    );
};



export default StackMisc;