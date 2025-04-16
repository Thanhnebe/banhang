
/*Redux Toolkit */
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';

/*Slice */
import AuthReducer from './slices/Auth.Slice';
import CategoryReducer from './slices/Category.Slice';
import BannerReducer from './slices/Banner.Slice';
import ProductReducer from './slices/Product.Slice';
import ProductPaginationReducer from './slices/ProductLimited.Slice';
import AddressReducer from './slices/Address.Slice';
import FavourtiesReducer from './slices/Favourties.Slice';
import CountCartReducer from './slices/CountCartSlice'
import CountNotificationReducert from './slices/CountNotifee.Slice'

/*BaseQuery */
import { DetailProducts } from '../service/Api/IndexProduct';
import { AddressQuery } from '../service/Api/IndexAddress';
import { CartQuery } from '../service/Api/IndexCart';
import VoucherQuery from '../service/Api/Index.Voucher';
import OrderQuery from '../service/Api/Index.Order';
import NotificationQuery from '../service/Api/Index.Notification';
import { AdminBannerQuery } from '../service/Api/IndexBanner';
import { AdminCategoriesQuery } from '../service/Api/IndexCategory';
import EvaluateQuery from '../service/Api/Index.Evaluate';
import { setupListeners } from '@reduxjs/toolkit/query';

/*AsyncStorage, Redux Persist */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    Auth: AuthReducer,
    CountCart: CountCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const StoreRedux = configureStore({
    reducer: {
        root: persistedReducer,
        Category: CategoryReducer,
        Banner: BannerReducer,
        Product: ProductReducer,
        ProductPagination: ProductPaginationReducer,
        Address: AddressReducer,
        Favourites: FavourtiesReducer,
        [DetailProducts.reducerPath]: DetailProducts.reducer,
        [AddressQuery.reducerPath]: AddressQuery.reducer,
        [CartQuery.reducerPath]: CartQuery.reducer,
        [VoucherQuery.reducerPath]: VoucherQuery.reducer,
        [OrderQuery.reducerPath]: OrderQuery.reducer,
        [NotificationQuery.reducerPath]: NotificationQuery.reducer,
        [AdminCategoriesQuery.reducerPath]: AdminCategoriesQuery.reducer,
        [AdminBannerQuery.reducerPath]: AdminBannerQuery.reducer,
        [EvaluateQuery.reducerPath]: EvaluateQuery.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false, // Tắt immutableCheck
            serializableCheck: false,
        })
            .concat(DetailProducts.middleware)
            .concat(AddressQuery.middleware)
            .concat(VoucherQuery.middleware)
            .concat(CartQuery.middleware)
            .concat(OrderQuery.middleware)
            .concat(NotificationQuery.middleware)
            .concat(AdminCategoriesQuery.middleware)
            .concat(AdminBannerQuery.middleware)
            .concat(EvaluateQuery.middleware)

});

setupListeners(StoreRedux.dispatch);

export default StoreRedux;
export const persistor = persistStore(StoreRedux);