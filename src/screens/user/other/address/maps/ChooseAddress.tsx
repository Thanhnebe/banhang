import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '../../../../../constant/Icon';

import { InputCustom, ProvinceList, WardList, DistrictList } from '../../../../../import/IndexComponent';

import Province from '../../../../../data/Province.json';
import District from '../../../../../data/Districts.json';
import Ward from '../../../../../data/Wards.json';

import { FlashList } from '@shopify/flash-list';

import { DistrictMapEntity, ProvinceMapEntity, WardMapEntity, TypeEditAddressParmas } from '../../../../../model/entity/IndexMap.entity';
import { Responsive } from '../../../../../constant/Responsive';

import { groupByAlphabet } from '../../../../../utils/GroupByAlphabet';
import { IndexStyles } from '../../../../../import/IndexStyles';


const ChooseAddress: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<TypeEditAddressParmas['route']>();
    const { previousScreen } = route.params ?? {};

    const [province, setProvince] = useState<ProvinceMapEntity[]>(Province || []);
    const [district, setDistrict] = useState<DistrictMapEntity[]>(District || []);
    const [ward, setWard] = useState<WardMapEntity[]>(Ward || []);

    const [selectedProvince, setSelectedProvince] = useState<ProvinceMapEntity | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictMapEntity | null>(null);
    const [selectedWard, setSelectedWard] = useState<WardMapEntity | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProvinces = groupByAlphabet(province.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    const filteredDistricts = groupByAlphabet(district.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.province_id === selectedProvince?.province_id));
    const filteredWards = groupByAlphabet(ward.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.district_id === selectedDistrict?.district_id));

    return (
        <View style={IndexStyles.StyleChooseAddress.container}>
            <View style={IndexStyles.StyleChooseAddress.viewheader}>
                <View style={IndexStyles.StyleChooseAddress.headerTitle}>
                    <Icon.BackSVG width={25} height={25} fill='red' onPress={() => navigation.goBack()} />
                    <InputCustom
                        placeholder='Tìm Quận Huyện, Phường Xã...'
                        placeholderTextColor='gray'
                        style={IndexStyles.StyleChooseAddress.input}
                        keyboardType='default'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        icon={<Icon.SearchSVG width={15} height={15} fill='gray' />}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={IndexStyles.StyleChooseAddress.textExit}>Xóa</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {selectedProvince && (
                <View style={IndexStyles.StyleChooseAddress.selectedArea}>
                    <View style={IndexStyles.StyleChooseAddress.selectedTitleArea}>
                        <Text style={IndexStyles.StyleChooseAddress.selectedTitle}>Địa chỉ bạn chọn</Text>
                        <TouchableOpacity onPress={() => { setSelectedProvince(null); setSelectedDistrict(null); setSelectedWard(null) }}>
                            <Text style={IndexStyles.StyleChooseAddress.selectedTitle}>Thiết lập lại</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={IndexStyles.StyleChooseAddress.selectedProvince} onPress={() => setSelectedProvince(null)}>
                        <View style={IndexStyles.StyleChooseAddress.viewborder}></View>
                        <Text style={IndexStyles.StyleChooseAddress.selectedText}>{selectedProvince?.name}</Text>
                    </TouchableOpacity>
                    {selectedDistrict && (
                        <TouchableOpacity style={IndexStyles.StyleChooseAddress.selectedDistrict} onPress={() => setSelectedDistrict(null)}>
                            <View style={IndexStyles.StyleChooseAddress.viewborder}></View>
                            <Text style={IndexStyles.StyleChooseAddress.selectedText}>{selectedDistrict?.name}</Text>
                        </TouchableOpacity>
                    )}
                    {selectedWard && (
                        <TouchableOpacity style={IndexStyles.StyleChooseAddress.selectedWard} onPress={() => setSelectedWard(null)}>
                            <View style={IndexStyles.StyleChooseAddress.viewborder}></View>
                            <Text style={IndexStyles.StyleChooseAddress.selectedText}>{selectedWard?.name}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <View style={IndexStyles.StyleChooseAddress.containerBody}>
                <View style={IndexStyles.StyleChooseAddress.containerProvince}>
                    <Text style={IndexStyles.StyleChooseAddress.textlocation}>Tỉnh/Thành Phố</Text>
                    {!selectedProvince && (
                        <FlashList
                            data={Object.keys(filteredProvinces)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <ProvinceList item={item}
                                    groupedProvinces={filteredProvinces}
                                    setSelectedProvince={setSelectedProvince}
                                    setSelectedDistrict={setSelectedDistrict}
                                    setSelectedWard={setSelectedWard}
                                />)}
                            estimatedItemSize={200}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
                {selectedProvince && !selectedDistrict && (
                    <View style={IndexStyles.StyleChooseAddress.containerLocation}>
                        <Text style={IndexStyles.StyleChooseAddress.textlocation}>Quận/Huyện</Text>
                        <FlashList
                            data={Object.keys(filteredDistricts)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <DistrictList item={item}
                                    groupedDistricts={filteredDistricts}
                                    setSelectedDistrict={setSelectedDistrict}
                                    setSelectedWard={setSelectedWard}
                                />)}
                            estimatedItemSize={70}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: Responsive.hp(5) }}
                        />
                    </View>
                )}
                {selectedDistrict && !selectedWard && (
                    <View style={IndexStyles.StyleChooseAddress.containerLocation}>
                        <Text style={IndexStyles.StyleChooseAddress.textlocation}>Phường/Xã</Text>
                        <FlashList
                            data={Object.keys(filteredWards)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) =>
                            (<WardList item={item} groupedWards={filteredWards}
                                setSelectedWard={setSelectedWard}
                                navigation={navigation} district={selectedDistrict} province={selectedProvince}
                                previousScreen={previousScreen}
                            />)}
                            estimatedItemSize={70}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: Responsive.hp(13) }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

export default ChooseAddress;
