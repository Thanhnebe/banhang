import { View, Text } from 'react-native'
import React from 'react'
import StyleManagerCustomerAdmin from '../customer/StyleManagerCustomerAdmin';

import { CustomHeader } from '../../../../import/IndexComponent';

const ManagerCustomerAdmin: React.FC = () => {
    return (
        <View style={StyleManagerCustomerAdmin.container}>
            <View style={StyleManagerCustomerAdmin.viewheader}>
                <View style={StyleManagerCustomerAdmin.headerSmall}>
                    <CustomHeader title='Quản lý khách hàng' color='white' />
                </View>
            </View>
            <View style={StyleManagerCustomerAdmin.containerBody}>

            </View>
        </View>
    )
}

export default ManagerCustomerAdmin