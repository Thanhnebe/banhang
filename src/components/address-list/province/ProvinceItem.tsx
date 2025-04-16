import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { Responsive } from '../../../constant/Responsive';
import { COLOR } from '../../../constant/Colors';
import { FontsROBOTO } from '../../../constant/Fonts';

interface ProvinceItemProps {
    provinceItem: any;
    onPress: () => void;
    isLastItem: boolean;
}

const ProvinceItem = ({ provinceItem, onPress, isLastItem }: ProvinceItemProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.itemLocation}>
            <Text style={styles.itemText}>{provinceItem.name}</Text>
            {!isLastItem && <View style={styles.viewline}></View>}
        </TouchableOpacity>
    );
};

export default ProvinceItem;



const styles = StyleSheet.create({
    itemLocation: {
        flexDirection: 'column',
        gap: Responsive.hp(1),
    },
    viewline: {
        height: 1,
        backgroundColor: COLOR.GRAY,
        width: Responsive.wp(100),
        marginBottom: Responsive.hp(1.5),
    },
    itemText: {
        fontSize: 17,
        color: COLOR.BLACK,
        letterSpacing: 0.5,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
    },
});
