import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackHomeTypeParam = {
    /*User*/
    TabHome: undefined;
    StackIndividual: undefined;
    AuthUser: undefined;
    Slashwellcome: undefined;
    TabStatusOrder: undefined;
    StackMisc: undefined;
    NotFound: undefined;
    ConnectInternet: undefined;

    /*Admin*/
    TabAdminManager: undefined;
    StackAdminManagerOrder: undefined;
    StackAdminManagerProduct: undefined;
    StackAdminManagerOther: undefined;
};

export type StackIndividualParams = {
    Customer: undefined;
    EditProfile: undefined;
    ViewAddRess: undefined;
    EditAddress: undefined;
    MoreAddress: undefined;
    ChooseAddress: undefined;
    ChangePassword: undefined;
    Favorites: undefined;
    ReviewInfor: undefined;
    ChatWithAdmin: undefined;
    DeleteAccount: undefined;
    ContactFeedback: undefined;
    Introduction: undefined;
    SearchOrder: undefined;
};

export type StackMiscParams = {
    SearchHome: undefined;
    Article: undefined;
    CategoryArticle: undefined;
    AllCategoryProduct: undefined;
    DetailArticle: undefined;
    PaymentOrders: undefined;
    SelectedAddress: undefined;
    VoucherCoupon: undefined;
    DetailVoucherCoupon: undefined;
    PaymentProvider: undefined;
    DetailOrder: undefined;
    DetailStatusCancelled: undefined;
    DetailPendingDelivery: undefined;
    DetailStatusDelivered: undefined;
    OrderSuccess: undefined;
    OrderFailed: undefined;
    Notification: undefined;
    EvaluateProducts: undefined;

}

export type StackAuthUserParams = {
    AuthLogin: undefined;
    AuthRegister: undefined;
    ForgotPassword: undefined;
    OtpPassword: undefined;
    CreatePassword: undefined;
};


/*ADMIN*/
export type StackAdminManagerOrderParams = {
    DetailManagerOrder: undefined;
    DetailOrderCancel: undefined;
    DetailOrderDelivered: undefined;
    DetailOrderDelivering: undefined;
    DetailOrderPending: undefined;
}

export type StackAdminManagerProductParams = {
    ListProducts: undefined;
    AddProducts: undefined;
    EditProducts: undefined;
    ListCategories: undefined;
    AddCategories: undefined;
    EditCategories: undefined;
    ListBanner: undefined;
    AddBanner: undefined;
    EditBanner: undefined;
    ListVouchers: undefined;
    AddVouchers: undefined;
    EditVouchers: undefined;
    SendNotifications: undefined;
    ListNotifications: undefined;
    ListCustomer: undefined;
}

export type StackAdminMangerOtherParams = {
    EditProfileAdmin: undefined;
    ManagerCustomerAdmin: undefined;
    EvaluateAdmin: undefined;
    ChangePasswordAdmin: undefined;
    ChatAdmin: undefined;
    ContactFeedbackAdmin: undefined;
    SearchOrderAdmin: undefined;
    ListCustomerChat: undefined;
}