import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '../../../../constant/Icon'
import { IndexStyles } from '../../../../import/IndexStyles';
import { HandleClearCache } from '../../../../utils/HandleClearCache';
import { CustomHeader } from '../../../../import/IndexComponent';
import { Responsive } from '../../../../constant/Responsive';

const Introduction: React.FC = () => {
    const navigation = useNavigation();

    const handleClearCache = () => {
        HandleClearCache.clearAsyncStorage();
        HandleClearCache.clearFastImageCache();
    }

    return (
        <View style={IndexStyles.StyleIntroduction.container}>
            <View style={IndexStyles.StyleIntroduction.viewheader}>
                <View style={IndexStyles.StyleIntroduction.headerTitle}>
                    <CustomHeader title='Giới thiệu' color='red' fontSize={Responsive.RFPercentage(2.5)}/>
                    <Icon.AboutSVG width={23} height={25} fill='red' />
                </View>
            </View>
            <View style={IndexStyles.StyleIntroduction.containerBody}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Icon.LogoAppleSVG width={150} height={100} fill={'red'} />
                    <Text style={IndexStyles.StyleIntroduction.text}>Apple Store</Text>
                    <Text style={IndexStyles.StyleIntroduction.text}>Phiên bản 1.0.0</Text>
                </View>
                <TouchableOpacity style={IndexStyles.StyleIntroduction.viewItem} onPress={handleClearCache}>
                    <Text style={IndexStyles.StyleIntroduction.text}>Xóa bộ nhớ đệm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Introduction  