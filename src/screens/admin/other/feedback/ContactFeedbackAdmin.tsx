import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '../../../../constant/Icon'

import { CustomHeader } from '../../../../import/IndexComponent';
import { Responsive } from '../../../../constant/Responsive';
import StyleContactFeedbackAdmin from './StyleContactFeedbackAdmin';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const ContactFeedbackAdmin: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const openLink = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <View style={StyleContactFeedbackAdmin.container}>
            <View style={StyleContactFeedbackAdmin.viewheader}>
                <View style={StyleContactFeedbackAdmin.headerTitle}>
                    <CustomHeader title='Liên hệ và góp ý' color='red' fontSize={Responsive.RFPercentage(2.5)} />
                </View>
            </View>
            <View style={StyleContactFeedbackAdmin.containerBody}>
                <TouchableOpacity style={StyleContactFeedbackAdmin.viewContact} onPress={() => openLink('tel:0799542146')}>
                    <Image source={Icon.CALL} style={StyleContactFeedbackAdmin.icon} />
                    <View style={StyleContactFeedbackAdmin.viewText}>
                        <Text style={StyleContactFeedbackAdmin.textTitle}>Liên hệ với tôi</Text>
                        <Text style={StyleContactFeedbackAdmin.textname}>0799542146</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={StyleContactFeedbackAdmin.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={StyleContactFeedbackAdmin.viewContact} onPress={() => openLink('mailto:xuanhoanggn@gmail.com')}>
                    <Image source={Icon.EMAIL} style={StyleContactFeedbackAdmin.icon} />
                    <View style={StyleContactFeedbackAdmin.viewText}>
                        <Text style={StyleContactFeedbackAdmin.textTitle}>Email</Text>
                        <Text style={StyleContactFeedbackAdmin.textname}>xuanhoanggn@gmail.com</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={StyleContactFeedbackAdmin.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={StyleContactFeedbackAdmin.viewContact} onPress={() => openLink('https://www.applestore.com')}>
                    <Image source={Icon.WEBSITE} style={StyleContactFeedbackAdmin.icon} />
                    <View style={StyleContactFeedbackAdmin.viewText}>
                        <Text style={StyleContactFeedbackAdmin.textTitle}>Website</Text>
                        <Text style={StyleContactFeedbackAdmin.textname}>www.applestore.com</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={StyleContactFeedbackAdmin.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={StyleContactFeedbackAdmin.viewContact} onPress={() => openLink('https://www.facebook.com/profile.php?id=100034854099513')}>
                    <Image source={Icon.FACEBOOK} style={StyleContactFeedbackAdmin.icon} />
                    <View style={StyleContactFeedbackAdmin.viewText}>
                        <Text style={StyleContactFeedbackAdmin.textTitle}>Facebook</Text>
                        <Text style={StyleContactFeedbackAdmin.textname}>facebook.com/HoangNguyen</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={StyleContactFeedbackAdmin.iconright} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ContactFeedbackAdmin  