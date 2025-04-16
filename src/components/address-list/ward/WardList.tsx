import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { WardMapEntity } from '../../../model/entity/IndexMap.entity'
import WardItem from './WardItem'
import { HandleLocationAddress } from '../../../utils/HandleLocationAddress'
import { Responsive } from '../../../constant/Responsive'
import { FontsROBOTO } from '../../../constant/Fonts'
import { COLOR } from '../../../constant/Colors'

interface WardListProps {
    item: string;
    groupedWards: any;
    setSelectedWard: any;
    navigation: any;
    district: any;
    province: any;
    previousScreen: string,
}

const WardList = ({ item, groupedWards, setSelectedWard, district, province, navigation, previousScreen }: WardListProps) => {
    return (
        <View style={styles.viewward}>
            <Text style={styles.alphabetHeader}>{item}</Text>
            <View>
                {groupedWards[item].map((wardItem: WardMapEntity, itemIndex: number) => (
                    <WardItem
                        key={wardItem.ward_id}
                        wardItem={wardItem}
                        onPress={() => HandleLocationAddress.handleSelectWard(wardItem, setSelectedWard, district, province, navigation, previousScreen)}
                        isLastItem={itemIndex === groupedWards[item].length}
                    />
                ))}
            </View>
        </View>
    );
}

export default WardList

const styles = StyleSheet.create({
    viewward: {
        flexDirection: 'row',
        gap: Responsive.wp(4),
        paddingHorizontal: Responsive.wp(3),
    },
    alphabetHeader: {
        fontSize: 14,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.GREY,
    },
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
})