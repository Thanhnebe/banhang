import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import StyleListCustomer from './StyleListCustomer'

import { CustomHeader } from '../../../../import/IndexComponent'
import { COLOR } from '../../../../constant/Colors'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'
import { Icon } from '../../../../constant/Icon'


const ListCustomer: React.FC = () => {

    useStatusBarConfig('dark-content', 'transparent', true)

    const navigation = useNavigation<NativeStackNavigationProp<any>>()


    return (
        <View style={StyleListCustomer.container}>
            <View style={StyleListCustomer.viewheader}>
                <View style={StyleListCustomer.headerTitle}>
                    <CustomHeader title='Danh sách khách hàng' color='red' />
                </View>
            </View>
            <View style={StyleListCustomer.containerBody}>

            </View>
        </View>
    )
}

export default ListCustomer