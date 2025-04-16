import { View, Text } from 'react-native'
import React from 'react'
import { IndexStyles } from '../../import/IndexStyles'

const NotFound: React.FC = () => {
    return (
        <View style={IndexStyles.StyleNotFound.container}>
            <Text>NotAvailable</Text>
        </View>
    )
}

export default NotFound