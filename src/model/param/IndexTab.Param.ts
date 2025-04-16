import { ImageSourcePropType } from "react-native";
import { TabHomeEnum, TabOrderStatusEnum, TabAdminManagerEnum } from "../enum/IndexTab.enum";
import { SvgProps } from 'react-native-svg';

export type TabHomePageListParam = {
    [TabHomeEnum.HomePage]: undefined;
    [TabHomeEnum.Cart]: undefined;
    [TabHomeEnum.category]: undefined;
    [TabHomeEnum.Information]: undefined;
};


export type TabOrderStatusListParams = {
    [TabOrderStatusEnum.PendingConfirmation]: undefined;
    [TabOrderStatusEnum.PendingDelivery]: undefined;
    [TabOrderStatusEnum.Delivered]: undefined;
    [TabOrderStatusEnum.Cancelled]: undefined;
}

export type TabOrderStatusType = {
    component: React.FC;
    name: keyof TabOrderStatusListParams;
};

export type TabHomeType = {
    component: React.FC;
    name: keyof TabHomePageListParam;
    icon: ImageSourcePropType;
    badge?: number;
};


/* Admin Manager */

export type TabAdminManagerListParam = {
    [TabAdminManagerEnum.Order]: undefined;
    [TabAdminManagerEnum.Manager]: undefined;
    [TabAdminManagerEnum.Statistic]: undefined;
    [TabAdminManagerEnum.Other]: undefined;
}

export type TabAdminManagerType = {
    component: React.FC;
    name: keyof TabAdminManagerListParam;
    icon: any;
    badge?: number;
    isSvg?: boolean;
};

