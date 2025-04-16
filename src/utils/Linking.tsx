import { HOST } from "../constant/Host";

const config = {
    screens: {
        NotFound: '*',
        StackMisc: {
            path: 'StackMisc',
            screens: {
                DetailArticle: {
                    path: 'getdetail/:_id'
                },
                OrderSuccess: {
                    path: 'order/success',
                },
                OrderFailed: {
                    path: 'order/failed',
                },
                VoucherCoupon: {
                    path: 'order/voucher',
                },
                Notification: {
                    path: 'Notification',
                }
            },
        },
        TabHomePage: {
            path: 'TabHome',
            screens: {
                HomePage: { path: 'Trang chủ' },
            },
        },
        StackAdminManagerOther: {
            path: 'StackAdminManagerOther',
            screens: {
                ChatAdmin: {
                    path: 'ChatAdmin/:username',
                },
            }
        },
        StackIndividual: {
            path: 'StackIndividual',
            screens: {
                ChatWithAdmin: {
                    path: 'ChatWithAdmin',
                },
            }
        },
    },
};

const ConfigLinking: any = {
    prefixes: [HOST.DOMAIN],
    config,
};

export default ConfigLinking;
