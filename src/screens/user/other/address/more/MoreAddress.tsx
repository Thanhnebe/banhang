import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Icon } from '../../../../../constant/Icon'
import { InputCustom, CustomSwtich, CustomHeader } from '../../../../../import/IndexComponent'

import { StackIndividualParams } from '../../../../../model/param/IndexStack.Param'
import { SubdivisionsParams } from '../../../../../model/entity/IndexMap.entity';
import { IndexStyles } from '../../../../../import/IndexStyles';

import { AddressType } from '../../../../../model/entity/IndexAddress.entity';
import { UseAddress } from '../../../../../import/IndexFeatures'
import ToastMessage from '../../../../../utils/ToastMessage'

const MoreAddress: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackIndividualParams, 'ViewAddRess'>>();
    const route = useRoute<SubdivisionsParams['route']>()
    const { province, district, ward } = route.params ?? {}
    const { addressType, setAddressType, createAddress, data, setData } = UseAddress();
    const isPhonelength = data.phone.length === 10

    const handleCreateAddress = async () => {
        try {
            if (data.name === '' || data.phone === '' || data.houseNumber === '' || province === '' || district === '' || ward === '') {
                ToastMessage('error', 'Vui lòng nhập đầy đủ thông tin')
            } else if (!isPhonelength) {
                ToastMessage('error', 'Số điện thoại phải có 10 số')
            } else {
                const response = await createAddress({
                    ...data,
                    province: province,
                    district: district,
                    ward: ward,
                    addressType: addressType
                })
                if (response.data !== undefined) {
                    ToastMessage('success', 'Thêm địa chỉ thành công')
                    navigation.goBack()
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleCreateAddress ~ error:", error);
        }
    };

    return (
        <View style={IndexStyles.StyleMoreAddress.container}>
            <View style={IndexStyles.StyleMoreAddress.viewheader}>
                <View style={IndexStyles.StyleMoreAddress.headerTitle}>
                   <CustomHeader title='Địa chỉ mới' color='red'/>
                </View>
            </View>
            <View style={IndexStyles.StyleMoreAddress.containerBody}>
                <View style={IndexStyles.StyleMoreAddress.viewinput}>
                    <Text style={IndexStyles.StyleMoreAddress.textinput}>Liên hệ</Text>
                    <InputCustom
                        placeholder='Họ và tên'
                        placeholderTextColor='gray'
                        value={data.name}
                        onChangeText={(text) => setData({ ...data, name: text })}
                        style={IndexStyles.StyleMoreAddress.input1}
                        keyboardType='default'
                    />
                    <InputCustom
                        placeholder='Số điện thoại'
                        placeholderTextColor='gray'
                        value={data.phone}
                        onChangeText={(text) => setData({ ...data, phone: text })}
                        style={IndexStyles.StyleMoreAddress.input2}
                        keyboardType='numeric'
                    />
                </View>
                <View style={IndexStyles.StyleMoreAddress.viewinput}>
                    <Text style={IndexStyles.StyleMoreAddress.textinput}>Địa chỉ</Text>
                    {province && district && ward ?
                        <TouchableOpacity style={IndexStyles.StyleMoreAddress.viewchooseAddress} onPress={() => navigation.navigate('ChooseAddress', { previousScreen: 'MoreAddress' } as any)}>
                            <View>
                                <Text style={IndexStyles.StyleMoreAddress.textchooseAddress}>{province}</Text>
                                <Text style={IndexStyles.StyleMoreAddress.textchooseAddress}>{district}</Text>
                                <Text style={IndexStyles.StyleMoreAddress.textchooseAddress}>{ward}</Text>
                            </View>
                            <Image source={Icon.RIGHT} style={IndexStyles.StyleMoreAddress.iconright} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={IndexStyles.StyleMoreAddress.viewaddress}  onPress={() => navigation.navigate('ChooseAddress', { previousScreen: 'MoreAddress' } as any)}>
                            <Text style={IndexStyles.StyleMoreAddress.textaddress}>Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</Text>
                            <Image source={Icon.RIGHT} style={IndexStyles.StyleMoreAddress.iconright} />
                        </TouchableOpacity>
                    }
                    <InputCustom
                        placeholder='Tên đường, số nhà'
                        placeholderTextColor='gray'
                        value={data.houseNumber}
                        onChangeText={(text) => setData({ ...data, houseNumber: text })}
                        style={IndexStyles.StyleMoreAddress.input2}
                        keyboardType='default'
                    />
                </View>
                <View style={IndexStyles.StyleMoreAddress.containerSetting}>
                    <Text style={IndexStyles.StyleMoreAddress.textinput}>Cài đặt</Text>
                    <View style={IndexStyles.StyleMoreAddress.containerViewtext}>
                        <Text style={IndexStyles.StyleMoreAddress.textsetting}>Loại địa chỉ:</Text>
                        <TouchableOpacity style={[IndexStyles.StyleMoreAddress.viewhome, addressType === AddressType.HOME ? IndexStyles.StyleMoreAddress.selected : null]}
                            onPress={() => setAddressType(AddressType.HOME)}>
                            <Text style={[IndexStyles.StyleMoreAddress.textoptions, addressType === AddressType.HOME ? IndexStyles.StyleMoreAddress.selectedText : null]}>
                                Nhà Riêng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[IndexStyles.StyleMoreAddress.viewoffice, addressType === AddressType.OFFICE ? IndexStyles.StyleMoreAddress.selected : null]}
                            onPress={() => setAddressType(AddressType.OFFICE)}>
                            <Text style={[IndexStyles.StyleMoreAddress.textoptions, addressType === AddressType.OFFICE ? IndexStyles.StyleMoreAddress.selectedText : null]}>
                                Văn Phòng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={IndexStyles.StyleMoreAddress.containerViewdefault}>
                        <Text style={IndexStyles.StyleMoreAddress.textsetting}>Đặt làm địa chỉ mặc định</Text>
                        <CustomSwtich value={data.isDefault} onChange={(value) => setData({ ...data, isDefault: value })} />
                    </View>
                </View>
                <TouchableOpacity style={IndexStyles.StyleMoreAddress.viewbutton} onPress={handleCreateAddress}>
                    <Text style={IndexStyles.StyleMoreAddress.textbutton}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MoreAddress