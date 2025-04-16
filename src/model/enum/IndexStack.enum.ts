export enum StackHomeEnum {
    TabHomePage = 'TabHome',
    StackIndividual = 'StackIndividual',
    AuthStackUser = 'AuthUser',
    slash = 'Slashwellcome',
    TabStatusOrder = 'TabStatusOrder',
    StackMisc = 'StackMisc',
    NotFound = 'NotFound',
    ConnectInternet = 'ConnectInternet',
    TabAdminManager = 'TabAdminManager',
    StackAdminManagerOrder = 'StackAdminManagerOrder',
    StackAdminManagerProduct = 'StackAdminManagerProduct',
    StackAdminManagerOther = 'StackAdminManagerOther',
}

export enum StackIndividualEnum {
    Customer = 'Customer',
    EditProfile = 'EditProfile',
    ViewAddRess = 'ViewAddRess',
    EditAddress = 'EditAddress',
    MoreAddress = 'MoreAddress',
    ChooseAddress = 'ChooseAddress',
    ChangePassword = 'ChangePassword',
    Favorites = 'Favorites',
    ReviewInfor = 'ReviewInfor',
    ChatWithAdmin = 'ChatWithAdmin',
    DeleteAccount = 'DeleteAccount',
    ContactFeedback = 'ContactFeedback',
    Introduction = 'Introduction',
    SearchOrder = 'SearchOrder',
}

export enum StackAuthUserEnum {
    AuthLogin = 'AuthLogin',
    AuthRegister = 'AuthRegister',
    ForgotPassword = 'ForgotPassword',
    OtpPassword = 'OtpPassword',
    CreatePassword = 'CreatePassword',
}

export enum StackMiscEnum {
    SearchHome = 'SearchHome',
    Article = 'Article',
    CategoryArticle = 'CategoryArticle',
    AllCategoryProduct = 'AllCategoryProduct',
    DetailArticle = 'DetailArticle',
    PaymentOrders = 'PaymentOrders',
    SelectedAddress = 'SelectedAddress',
    VoucherCoupon = 'VoucherCoupon',
    DetailVoucherCoupon = 'DetailVoucherCoupon',
    PaymentProvider = 'PaymentProvider',
    DetailOrder = 'DetailOrder',
    DetailStatusCancelled = 'DetailStatusCancelled',
    DetailPendingDelivery = 'DetailPendingDelivery',
    DetailStatusDelivered = 'DetailStatusDelivered',
    OrderSuccess = 'OrderSuccess',
    OrderFailed = 'OrderFailed',
    Notification = 'Notification',
    EvaluateProducts = 'EvaluateProducts',
}


/*ADMIN*/
export enum StackAdminManagerOrderEnum {
    DetailManagerOrder = 'DetailManagerOrder',
    DetailOrderCancel = 'DetailOrderCancel',
    DetailOrderDelivered = 'DetailOrderDelivered',
    DetailOrderDelivering = 'DetailOrderDelivering',
    DetailOrderPending = 'DetailOrderPending',
}

export enum StackAdminManagerProductEnum {
    ListProducts = 'ListProducts',
    AddProducts = 'AddProducts',
    EditProducts = 'EditProducts',
    ListCategories = 'ListCategories',
    AddCategories = 'AddCategories',
    EditCategories = 'EditCategories',
    ListBanner = 'ListBanner',
    AddBanner = 'AddBanner',
    EditBanner = 'EditBanner',
    ListVouchers = 'ListVouchers',
    AddVouchers = 'AddVouchers',
    EditVouchers = 'EditVouchers',
    ListCustomer = 'ListCustomer',
    SendNotifications = 'SendNotifications',
    ListNotifications = 'ListNotifications',
}

export enum StackAdminManagerOtherEnum {
    EditProfileAdmin = 'EditProfileAdmin',
    ManagerCustomerAdmin = 'ManagerCustomerAdmin',
    EvaluateAdmin = 'EvaluateAdmin',
    ChangePasswordAdmin = 'ChangePasswordAdmin',
    ChatAdmin = 'ChatAdmin',
    ContactFeedbackAdmin = 'ContactFeedbackAdmin',
    SearchOrderAdmin = 'SearchOrderAdmin',
    ListCustomerChat = 'ListCustomerChat',
}