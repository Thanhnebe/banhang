import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '../../../../constant/Icon'
import { IndexStyles } from '../../../../import/IndexStyles';
import { CustomHeader } from '../../../../import/IndexComponent';
import { Responsive } from '../../../../constant/Responsive';

const ContactFeedback: React.FC = () => {
    const navigation = useNavigation();

    const openLink = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <View style={IndexStyles.StyleContactFeedback.container}>
            <View style={IndexStyles.StyleContactFeedback.viewheader}>
                <View style={IndexStyles.StyleContactFeedback.headerTitle}>
                    <CustomHeader title='Liên hệ và góp ý' color='red' fontSize={Responsive.RFPercentage(2.5)} />
                </View>
            </View>
            <View style={IndexStyles.StyleContactFeedback.containerBody}>
                <TouchableOpacity style={IndexStyles.StyleContactFeedback.viewContact} onPress={() => openLink('tel:0799542146')}>
                    <Image source={Icon.CALL} style={IndexStyles.StyleContactFeedback.icon} />
                    <View style={IndexStyles.StyleContactFeedback.viewText}>
                        <Text style={IndexStyles.StyleContactFeedback.textTitle}>Liên hệ với tôi</Text>
                        <Text style={IndexStyles.StyleContactFeedback.textname}>0799542146</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={IndexStyles.StyleContactFeedback.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.StyleContactFeedback.viewContact} onPress={() => openLink('mailto:xuanhoanggn@gmail.com')}>
                    <Image source={Icon.EMAIL} style={IndexStyles.StyleContactFeedback.icon} />
                    <View style={IndexStyles.StyleContactFeedback.viewText}>
                        <Text style={IndexStyles.StyleContactFeedback.textTitle}>Email</Text>
                        <Text style={IndexStyles.StyleContactFeedback.textname}>xuanhoanggn@gmail.com</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={IndexStyles.StyleContactFeedback.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.StyleContactFeedback.viewContact} onPress={() => openLink('https://www.applestore.com')}>
                    <Image source={Icon.WEBSITE} style={IndexStyles.StyleContactFeedback.icon} />
                    <View style={IndexStyles.StyleContactFeedback.viewText}>
                        <Text style={IndexStyles.StyleContactFeedback.textTitle}>Website</Text>
                        <Text style={IndexStyles.StyleContactFeedback.textname}>www.applestore.com</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={IndexStyles.StyleContactFeedback.iconright} />
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.StyleContactFeedback.viewContact} onPress={() => openLink('https://www.facebook.com/profile.php?id=100034854099513')}>
                    <Image source={Icon.FACEBOOK} style={IndexStyles.StyleContactFeedback.icon} />
                    <View style={IndexStyles.StyleContactFeedback.viewText}>
                        <Text style={IndexStyles.StyleContactFeedback.textTitle}>Facebook</Text>
                        <Text style={IndexStyles.StyleContactFeedback.textname}>facebook.com/HoangNguyen</Text>
                    </View>
                    <Image source={Icon.RIGHT} style={IndexStyles.StyleContactFeedback.iconright} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ContactFeedback  