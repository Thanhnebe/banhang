import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../constant/Icon';

import { CustomHeader, InputCustom, ItemArticle, ItemFavourites } from '../../../../import/IndexComponent';
import { Responsive } from '../../../../constant/Responsive';
import { IndexStyles } from '../../../../import/IndexStyles';

import { useAppSelector } from '../../../../import/IndexFeatures';
import { FlashList } from '@shopify/flash-list';

const Favorites: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [search, setSearch] = useState<string>('');
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const favourites = useAppSelector((state) => state.Favourites.items);
    const cartData = useAppSelector(state => state.root.CountCart.itemCount);
    const searchProduct = favourites.filter((item) => {
        return item.productId.name.toLowerCase().includes(search.toLowerCase());
    });

    const toggleSearch = () => {
        if (isSearchVisible) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsSearchVisible(false));
        } else {
            setIsSearchVisible(true);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const headerHeight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Responsive.hp(12), Responsive.hp(2.5)],
    });

    const inputOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View style={IndexStyles.StyleFavorites.container}>
            <Animated.View style={[IndexStyles.StyleFavorites.viewheader, { height: headerHeight, opacity: inputOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
                <View style={IndexStyles.StyleFavorites.headerTitle}>
                    {/* <Icon.BackSVG width={25} height={25} fill='red' onPress={() => navigation.goBack()} />
                    <Text style={IndexStyles.StyleFavorites.textHeader}>Lượt thích</Text> */}
                    <CustomHeader title='Lượt thích' color='red' />
                    <View style={IndexStyles.StyleFavorites.headerIcon}>
                        <TouchableOpacity onPress={toggleSearch}>
                            <Icon.SearchSVG width={23} height={25} fill='red' />
                        </TouchableOpacity>
                        <TouchableOpacity style={IndexStyles.StyleFavorites.viewCartIcon}
                            onPress={() => navigation.navigate('TabHome', { screen: 'Giỏ hàng' })}>
                            <Image source={Icon.CART} style={{ width: 25, height: 25, tintColor: 'red' }} />
                            <View style={IndexStyles.StyleFavorites.viewCountCart}>
                                <Text style={IndexStyles.StyleFavorites.textCountCart}>{cartData}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            {isSearchVisible && (
                <Animated.View style={[IndexStyles.StyleFavorites.viewSearch, { opacity: inputOpacity }]}>
                    <InputCustom
                        placeholder='Search'
                        value={search}
                        onChangeText={setSearch}
                        keyboardType='default'
                        style={IndexStyles.StyleFavorites.textInput}
                        icon={<Icon.SearchSVG width={19} height={19} fill='#E9515E' />}
                        autoFocus={true}
                    />
                    <TouchableOpacity onPress={toggleSearch}>
                        <Text style={IndexStyles.StyleFavorites.textRemove}>Thoát</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
            <View style={IndexStyles.StyleFavorites.containerBody}>
                {search.length === 0 ? (
                    <FlashList
                        data={favourites}
                        renderItem={({ item }) => <ItemFavourites item={item.productId} navigation={navigation} />}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        estimatedItemSize={Responsive.hp(50)}
                        showsVerticalScrollIndicator={false}
                    />
                ) : searchProduct.length > 0 ? (
                    <FlashList
                        data={searchProduct}
                        renderItem={({ item }) => <ItemFavourites item={item.productId} navigation={navigation} />}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        estimatedItemSize={Responsive.hp(50)}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={IndexStyles.StyleFavorites.viewNoProduct}>
                        <Image source={Icon.NotFoundProduct} style={IndexStyles.StyleFavorites.iconNoProduct} />
                        <Text style={IndexStyles.StyleFavorites.textNoProduct}>Không tìm thấy sản phẩm</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Favorites;