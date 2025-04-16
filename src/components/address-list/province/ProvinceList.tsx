import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ProvinceMapEntity } from '../../../model/entity/IndexMap.entity'
import ProvinceItem from './ProvinceItem'
import { HandleLocationAddress } from '../../../utils/HandleLocationAddress'
import { Responsive } from '../../../constant/Responsive'
import { FontsROBOTO } from '../../../constant/Fonts'
import { COLOR } from '../../../constant/Colors'

interface ProvinceListProps {
    item: string;
    groupedProvinces: any;
    setSelectedProvince: any;
    setSelectedDistrict: any;
    setSelectedWard: any;
}

const ProvinceList = ({ item, groupedProvinces, setSelectedProvince, setSelectedDistrict, setSelectedWard }: ProvinceListProps) => {
    return (
        <View style={styles.viewProvince}>
            <Text style={styles.alphabetHeader}>{item}</Text>
            <View>
                {groupedProvinces[item].map((provinceItem: ProvinceMapEntity, itemIndex: number) => (
                    <ProvinceItem
                        key={provinceItem.province_id}
                        provinceItem={provinceItem}
                        onPress={() => HandleLocationAddress.handleSelectProvince(provinceItem, setSelectedProvince, setSelectedDistrict, setSelectedWard)}
                        isLastItem={itemIndex === groupedProvinces[item].length}
                    />
                ))}
            </View>
        </View>
    );
}

export default ProvinceList

const styles = StyleSheet.create({
    viewProvince: {
        flexDirection: 'row',
        gap: Responsive.wp(4),
        paddingHorizontal: Responsive.wp(3),
    },
    alphabetHeader: {
        fontSize: 17,
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