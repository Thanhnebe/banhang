import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabHomePageListParam, TabHomeType } from '../../model/param/IndexTab.Param';
import { TabHomeEnum } from '../../model/enum/IndexTab.enum';

import { Icon } from '../../constant/Icon';

import { Image, StyleSheet, Text } from 'react-native';
import { COLOR } from '../../constant/Colors';
import { Responsive } from '../../constant/Responsive';

import HomePage from '../../screens/user/homeproduct/home/HomePage';
import Cart from '../../screens/user/cart/Cart';
import CategoryProduct from '../../screens/user/category/list/CategoryProduct';
import Information from '../../screens/user/other/infor/Information';
import { useAppSelector } from '../../import/IndexFeatures';

const BottomTabHomePage = createBottomTabNavigator<TabHomePageListParam>();

const TabHomePage = () => {
    const cartData = useAppSelector(state => state.root.CountCart.itemCount);

    const tabHome: TabHomeType[] = [
        {
            component: HomePage,
            name: TabHomeEnum.HomePage,
            icon: Icon.HOME
        },
        {
            component: Cart,
            name: TabHomeEnum.Cart,
            icon: Icon.CART,
            badge: cartData
        },
        {
            component: CategoryProduct,
            name: TabHomeEnum.category,
            icon: Icon.CATEGORY
        },
        {
            component: Information,
            name: TabHomeEnum.Information,
            icon: Icon.INFOR
        },
    ]

    return (
        <BottomTabHomePage.Navigator
            screenOptions=
            {{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: COLOR.ORANGE,
                tabBarInactiveTintColor: COLOR.BLACK,
                tabBarStyle: styles.bottomBar,
            }}
        >
            {tabHome.map((item) => (
                <BottomTabHomePage.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={item.icon}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? COLOR.ORANGE : COLOR.RED
                                }}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? COLOR.ORANGE : COLOR.RED,
                                fontSize: 11.5,
                                fontWeight: 'bold',
                            }}>
                                {item.name}
                            </Text>
                        ),
                        tabBarBadge: item.badge === 0 ? undefined : item.badge
                    }}
                />
            ))}
        </BottomTabHomePage.Navigator>
    );
};

export default TabHomePage;


const styles = StyleSheet.create({
    bottomBar: {
        borderTopColor: COLOR.PRIMARY,
        height: Responsive.hp(6),
    },
});
