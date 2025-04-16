import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DistrictMapEntity } from '../../../model/entity/IndexMap.entity'
import { DistrictItem } from '../../../import/IndexComponent'
import { HandleLocationAddress } from '../../../utils/HandleLocationAddress'
import { Responsive } from '../../../constant/Responsive'
import { FontsROBOTO } from '../../../constant/Fonts'
import { COLOR } from '../../../constant/Colors'

interface DictrictListProps {
    item: string;
    groupedDistricts: any;
    setSelectedDistrict: any;
    setSelectedWard: any;
}

const DistrictList = ({ item, groupedDistricts, setSelectedDistrict, setSelectedWard }: DictrictListProps) => {
    return (
        <View style={styles.viewdistrict}>
            <Text style={styles.alphabetHeader}>{item}</Text>
            <View>
                {groupedDistricts[item].map((districtItem: DistrictMapEntity, itemIndex: number) => (
                    <DistrictItem
                        key={districtItem.district_id}
                        districtItem={districtItem}
                        onPress={() => HandleLocationAddress.handleSelectDistrict(districtItem, setSelectedDistrict, setSelectedWard)}
                        isLastItem={itemIndex === groupedDistricts[item].length}
                    />
                ))}
            </View>
        </View>
    );
}

export default DistrictList

const styles = StyleSheet.create({
    viewdistrict: {
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