import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackHomeTypeParam } from '../../../../model/param/IndexStack.Param';
import { useAppSelector, useAppDispatch } from '../../../../import/IndexFeatures';
import { Logout } from '../../../../redux/slices/Auth.Slice';

import { Icon } from '../../../../constant/Icon'
import { CustomCheckBox, CustomHeader } from '../../../../import/IndexComponent'
import { IndexStyles } from '../../../../import/IndexStyles';
import { HandleDeleteUser } from '../../../../service/Api/IndexUser'
import ToastMessage from '../../../../utils/ToastMessage';
import { setItemCount } from '../../../../redux/slices/CountCartSlice';


const DeleteAccount: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackHomeTypeParam, 'AuthUser'>>()
    const [checked, setChecked] = useState<boolean>(false);
    const id = useAppSelector(state => state.root.Auth.user._id)
    const dispatch = useAppDispatch()

    const HandleDeleteAccount = async () => {
        try {
            const response = await HandleDeleteUser(id)
            ToastMessage('success', 'Xóa tài khoản thành công')
            navigation.navigate('AuthUser')
            dispatch(Logout())
            dispatch(setItemCount(0))
            console.log("🚀 ~ HandleDeleteAccount ~ response", response)
        } catch (error) {
            console.log("🚀 ~ HandleDeleteAccount ~ error", error)
        }
    }

    return (
        <View style={IndexStyles.StyleDeleteAccount.container}>
            <View style={IndexStyles.StyleDeleteAccount.viewheader}>
                <View style={IndexStyles.StyleDeleteAccount.headerTitle}>
                    <CustomHeader title='Xóa tài khoản' color='red' />
                </View>
            </View>
            <View style={IndexStyles.StyleDeleteAccount.containerBody}>
                <View style={IndexStyles.StyleDeleteAccount.viewdeleteAccount}>
                    <Image source={Icon.DELETEACCOUNT} style={IndexStyles.StyleDeleteAccount.image} />
                    <View style={{ paddingHorizontal: 5 }}>
                        <Text style={IndexStyles.StyleDeleteAccount.textdelete}>
                            Thật buồn khi biết bạn sắp rời khỏi đây.
                            Tất cả thông tin và đặt hàng hay đơn hàng của bản kể cả
                            thông tin liên lạc số điện thoại, tài khoản đăng nhập đều sẽ bị xóa.
                        </Text>
                        <Text style={IndexStyles.StyleDeleteAccount.textdelete}>
                            Tôi mong bạn đã có những trải nghiệm tuyệt vời tại đây sau khi sử dụng dịch vụ của chúng tôi.
                            Và hãy chắc chắn rằng bạn thật sự muốn xóa tài khoản của mình.
                        </Text>
                    </View>
                </View>
                <View style={IndexStyles.StyleDeleteAccount.viewcheckbox}>
                    <CustomCheckBox
                        title='Xác nhận xóa tài khoản'
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />
                </View>
                <TouchableOpacity
                    style={[IndexStyles.StyleDeleteAccount.buttonConfirm, { opacity: checked ? 1 : 0.5 }]}
                    disabled={!checked} onPress={HandleDeleteAccount}>
                    <Text style={IndexStyles.StyleDeleteAccount.textbutton}>Xóa tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default DeleteAccount  