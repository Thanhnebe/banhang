import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Easing, ImageSourcePropType } from 'react-native';

import { COLOR } from '../../../../constant/Colors';
import { Icon } from '../../../../constant/Icon';
import { Responsive } from '../../../../constant/Responsive';
import { IndexStyles } from '../../../../import/IndexStyles';

import { FlashList } from '@shopify/flash-list';
import Shuffle from '../../../../utils/Shuffle';

import { DetailProductParams } from '../../../../model/entity/IndexProduct.entity';
import { FormatPrice, calculateDiscountedPrice } from '../../../../utils/FormatPrice';
import { CustomBackdrop, ItemArticle, ItemModelInfor } from '../../../../import/IndexComponent';

import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';

import { ShareItemDetail, UseBottomSheetModel, useAppSelector } from '../../../../import/IndexFeatures';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import IndexHandleDetails from '../../../../service/Api/IndexHandleDetails';

import { useCreateCartMutation } from '../../../../service/Api/IndexCart';
import { incountCrement } from '../../../../redux/slices/CountCartSlice';


type PropsProduct = {
    item: DetailProductParams,
    navigation?: any,
    userId?: string,
    dispatch?: any,
    countCart: number
}

const ItemDetailArticle: React.FC<PropsProduct> = ({ item, navigation, userId = '', dispatch, countCart }) => {
    const { onImageLoad, shareProduct, showDescription, ToggleDescription } = ShareItemDetail();
    const { selectedItem, bottomSheetModalRef, snapPoints, handlePresentModalPress, handleDismissModal } = UseBottomSheetModel({ item });
    const [selectedPrice, setSelectedPrice] = useState<{ price: number, color: string }>({
        price: item.priceColor[0].price,
        color: item.priceColor[0].color,
    });
    const [discountedPrice, setDiscountedPrice] = useState<number>(calculateDiscountedPrice(selectedPrice.price, item.discount.percentage));

    const product = Shuffle(useAppSelector((state) => state.Product.data).filter((product) => product._id !== item._id)).slice(0, 15);

    const animatedValue = useRef(new Animated.Value(0)).current;

    const favourites = useAppSelector((state) => state.Favourites.items);
    const isFavourite = favourites.some(favItem => favItem.productId._id === item._id);

    const [createCart] = useCreateCartMutation();

    return (
        <BottomSheetModalProvider >
            <View style={IndexStyles.StyleItemDetailArticle.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={IndexStyles.StyleItemDetailArticle.containerHeader}>
                        <LinearGradient colors={['#ffffff', '#e8e8e8']} style={IndexStyles.StyleItemDetailArticle.viewimage}>
                            <View style={IndexStyles.StyleItemDetailArticle.viewIcon}>
                                <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('TabHome')}>
                                    <Icon.BackSVG
                                        width={Responsive.wp(8)}
                                        height={Responsive.hp(8)}
                                        fill={COLOR.REDONE}
                                        style={IndexStyles.StyleItemDetailArticle.iconBack}
                                    />
                                </TouchableOpacity>
                                <View style={IndexStyles.StyleItemDetailArticle.viewIconHeader}>
                                    <TouchableOpacity onPress={() => shareProduct(item)}>
                                        <Icon.ShareSVG
                                            width={Responsive.wp(7)}
                                            height={Responsive.hp(7)}
                                            fill={COLOR.REDONE}
                                            style={IndexStyles.StyleItemDetailArticle.iconShare}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewCartIcon}
                                        onPress={() => navigation.navigate('TabHome', { screen: 'Giỏ hàng' })}>
                                        <Icon.ShoppingCartSVG
                                            width={Responsive.wp(7)}
                                            height={Responsive.hp(7)}
                                            fill={COLOR.REDONE}
                                            style={IndexStyles.StyleItemDetailArticle.iconCart}
                                        />
                                        {countCart > 0 &&
                                            <View style={IndexStyles.StyleItemDetailArticle.viewCountCart}>
                                                <Text style={IndexStyles.StyleItemDetailArticle.textCountCart}>{countCart}</Text>
                                            </View>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Carousel
                                data={item.images}
                                renderItem={({ item }) => (
                                    <Animated.Image
                                        source={{ uri: item as string }}
                                        style={IndexStyles.StyleItemDetailArticle.image}
                                        onLoad={onImageLoad}
                                    />
                                )}
                                width={Responsive.wp(100)}
                                height={Responsive.hp(48)}
                                scrollAnimationDuration={1000}
                                windowSize={10}
                                panGestureHandlerProps={{
                                    activeOffsetX: [-10, 10],
                                }}
                            />
                        </LinearGradient>
                    </View>
                    <View style={IndexStyles.StyleItemDetailArticle.containerBody}>
                        <View style={IndexStyles.StyleItemDetailArticle.containerText}>
                            <View style={IndexStyles.StyleItemDetailArticle.viewName}>
                                <Text style={IndexStyles.StyleItemDetailArticle.textname}>{item.name} {item.storage} {item.model}</Text>
                                {isFavourite ? (
                                    <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewHeart} onPress={() => IndexHandleDetails.handleRemoveFavourite(favourites.find(favItem => favItem.productId._id === item._id)?._id as string, dispatch, userId)} >
                                        <Icon.HeartCheckedSVG width={Responsive.wp(5)} height={Responsive.hp(3)} fill={COLOR.REDONE} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewHeart} onPress={() => IndexHandleDetails.handleAddFavourite(item, userId, navigation, dispatch)}>
                                        <Icon.HeartSVG width={Responsive.wp(5)} height={Responsive.hp(3)} fill={COLOR.BLACKONE} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Responsive.wp(2), paddingBottom: Responsive.hp(2) }}>
                                <Text style={IndexStyles.StyleItemDetailArticle.textPriceDiscount}>{FormatPrice(discountedPrice)}</Text>
                                <Text style={IndexStyles.StyleItemDetailArticle.textPrice}>{FormatPrice(selectedPrice.price)}</Text>
                                <Text style={IndexStyles.StyleItemDetailArticle.textDiscount}>Giảm {item.discount.percentage}%</Text>
                            </View>
                            <Text style={IndexStyles.StyleItemDetailArticle.textTilte}>Sản phẩm</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: Responsive.wp(1), paddingBottom: Responsive.hp(1) }}>
                                {item.priceColor.map((product, index) => (
                                    <TouchableOpacity key={index}
                                        style={[IndexStyles.StyleItemDetailArticle.viewPriceColor,
                                        selectedPrice.color === product.color ? { backgroundColor: COLOR.REDONE } : { backgroundColor: COLOR.ORANGE }]}
                                        onPress={() => IndexHandleDetails.handleSelectPrice(product.price, product.color, setSelectedPrice, setDiscountedPrice, item)} >
                                        <Text style={IndexStyles.StyleItemDetailArticle.textPirceColor}>{product.color}</Text>
                                        <Text style={IndexStyles.StyleItemDetailArticle.textPirceColor}>{FormatPrice(calculateDiscountedPrice(product.price, item.discount.percentage))}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={IndexStyles.StyleItemDetailArticle.containerShipper}>
                                <View style={IndexStyles.StyleItemDetailArticle.viewShipper}>
                                    <Icon.WaitShipperSVG width={Responsive.wp(7)} height={Responsive.hp(5)} fill={COLOR.REDONE} />
                                    <Text style={IndexStyles.StyleItemDetailArticle.textShipper}>Đảm báo nhận hàng trong vòng 2 - 3 ngày ở trong nội thành</Text>
                                </View>
                                <View style={IndexStyles.StyleItemDetailArticle.viewShipper}>
                                    <Icon.ProtectSVG width={Responsive.wp(7)} height={Responsive.hp(5)} fill={COLOR.REDONE} />
                                    <Text style={IndexStyles.StyleItemDetailArticle.textShipper}>Được đổi sản phẩm trong 7 ngày đầu (sản phẩm còn nguyên vẹn, seal, team, hộp sản phẩm, không trày)</Text>
                                </View>
                            </View>
                            <View style={IndexStyles.StyleItemDetailArticle.viewDetail}>
                                <Text style={IndexStyles.StyleItemDetailArticle.textTilte}>Chi tiết sản phẩm</Text>
                                <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewModel} onPress={handlePresentModalPress}>
                                    <Text style={IndexStyles.StyleItemDetailArticle.textTilte}>Thông tin sản phẩm</Text>
                                    <Image source={Icon.RIGHT} style={IndexStyles.StyleItemDetailArticle.iconRight} />
                                </TouchableOpacity>
                            </View>
                            <View style={IndexStyles.StyleItemDetailArticle.containerDescribe}>
                                <Text style={IndexStyles.StyleItemDetailArticle.textDescribe}>
                                    {showDescription ? item.description : item.description.slice(0, 500)}...
                                    <Text onPress={ToggleDescription} style={[IndexStyles.StyleItemDetailArticle.textDescribe, { color: COLOR.REDONE }]}>
                                        {showDescription ? 'Rút gọn' : 'Xem thêm'}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={IndexStyles.StyleItemDetailArticle.listProduct}>
                            <Text style={IndexStyles.StyleItemDetailArticle.textProduct}>Sản phẩm liên quan</Text>
                            <FlashList
                                data={product}
                                renderItem={({ item }) => <ItemArticle item={item} navigation={navigation} />}
                                keyExtractor={(item) => item._id}
                                horizontal={false}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                estimatedItemSize={200}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={IndexStyles.StyleItemDetailArticle.containerFooter}>
                    <View style={IndexStyles.StyleItemDetailArticle.viewChatCart}>
                        <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewChat} onPress={() => navigation.navigate('StackIndividual', { screen: 'ChatWithAdmin' })}>
                            <Icon.ChatSVG width={Responsive.wp(7)} height={Responsive.hp(4)} fill={COLOR.REDTWO} />
                            <Text style={IndexStyles.StyleItemDetailArticle.textChat}>Chat ngay</Text>
                        </TouchableOpacity>
                        <View style={IndexStyles.StyleItemDetailArticle.lineheight} />
                        <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewChat}
                            onPress={() => IndexHandleDetails.handleAddToCart(animatedValue, userId, selectedPrice, item, createCart, discountedPrice, dispatch, incountCrement)}>
                            <Animated.View style={[IndexStyles.StyleItemDetailArticle.viewCart, {
                                transform:
                                    [{
                                        translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, Responsive.wp(58)] }),
                                    }, {
                                        translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, Responsive.hp(-92)] }),
                                    }, {
                                        rotate: animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['1deg', '480deg'] }),
                                    }]
                            }]}>
                                <Icon.ShoppingCartSVG width={Responsive.wp(7)} height={Responsive.hp(4)} fill={COLOR.REDTWO} />
                            </Animated.View>
                            <Text style={IndexStyles.StyleItemDetailArticle.textCart}>Giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.viewTotal}
                        onPress={() => IndexHandleDetails.handleByCart(userId, selectedPrice, item, createCart, discountedPrice, dispatch, incountCrement, navigation)}>
                        <Text style={IndexStyles.StyleItemDetailArticle.textTotal}>Mua sản phẩm</Text>
                        <Text style={IndexStyles.StyleItemDetailArticle.textTotalPrice}>{FormatPrice(discountedPrice)}</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={(props) => <CustomBackdrop {...props} onClose={handleDismissModal} />}
                    footerComponent={() => (
                        <TouchableOpacity style={IndexStyles.StyleItemDetailArticle.footerButton} onPress={handleDismissModal}>
                            <Text style={IndexStyles.StyleItemDetailArticle.footerText}>Đồng ý</Text>
                        </TouchableOpacity>
                    )}
                >
                    <BottomSheetScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        <BottomSheetView style={IndexStyles.StyleItemDetailArticle.contentContainer}>
                            <ItemModelInfor item={selectedItem as DetailProductParams} />
                        </BottomSheetView>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

export default ItemDetailArticle;
