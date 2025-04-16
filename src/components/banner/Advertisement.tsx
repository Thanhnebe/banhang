import React, { useState, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, View, Image, FlatList, Animated, TouchableOpacity, ImageSourcePropType, Text } from 'react-native';
import Paginations from './Paginations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import { useAppSelector } from '../../import/IndexFeatures';
import { TabHomePageListParam } from '../../model/param/IndexTab.Param';
import { Responsive } from '../../constant/Responsive';
import { COLOR } from '../../constant/Colors';


const BannerSlider = () => {
    const navigation = useNavigation<NativeStackNavigationProp<TabHomePageListParam>>();
    const data = useAppSelector(state => state.Banner.data);
    const banner = data.slice(0, 5) || [];
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const scrollx = useRef(new Animated.Value(0)).current;
    const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slideRef = useRef<FlatList<{ _id: string, title: string, images: ImageSourcePropType }>>(null);
    const viewableItemsChange = useRef(({ viewableItems }: any) => { setCurrentIndex(viewableItems[0].index) }).current;

    useEffect(() => {
        const interval = setInterval(() => {
            if (banner.length > 1) {
                if (currentIndex < banner.length - 1) {
                    slideRef?.current?.scrollToIndex({ index: currentIndex + 1 });
                } else {
                    slideRef?.current?.scrollToIndex({ index: 0 });
                }
            }
        }, 1500);
        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, banner]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollx } } }],
        { useNativeDriver: false },
    );



    return (
        <View style={styles.container}>
            <FlatList
                data={banner}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.viewimage}>
                        <FastImage
                            source=
                            {{
                                uri: item.images as string,
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.high,
                            }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item._id}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                horizontal={true}
                onViewableItemsChanged={viewableItemsChange}
                viewabilityConfig={viewconfig}
                ref={slideRef}
                pagingEnabled
                bounces={false}
                scrollEventThrottle={32}
            />
            <View>
                <Paginations data={data} scrollx={scrollx} />
            </View>
        </View>
    );
};

export default BannerSlider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewimage: {
        top: Responsive.hp(2),
        borderRadius: 15,
        shadowRadius: 4,
        height: Responsive.hp(25),
        alignSelf: 'center',
        width: Responsive.wp(100),
    },
    image: {
        width: Responsive.wp(90),
        height: Responsive.hp(25),
        borderRadius: 15,
        alignSelf: 'center',
    },
});
