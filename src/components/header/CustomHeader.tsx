import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Icon } from '../../constant/Icon'
import { COLOR } from '../../constant/Colors'
import { Responsive } from '../../constant/Responsive'
import { FontsROBOTO } from '../../constant/Fonts'

interface CustomHeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    color?: string;
    fontSize?: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, showBackButton = true, onBackPress, color ,fontSize}) => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress()
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.viewheader}>
            {showBackButton && (
                <TouchableOpacity onPress={handleBackPress}>
                    <Icon.BackSVG width={25} height={25} fill={color || COLOR.BLACK} />
                </TouchableOpacity>
            )}
            {/* chỉnh fontsize */}
            <Text style={[styles.headerTitle, { color: color || COLOR.BLACK, fontSize: fontSize || Responsive.RFPercentage(2.8) }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewheader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: Responsive.RFPercentage(2.8),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        width: Responsive.wp(78),
    },
})

export default CustomHeader
