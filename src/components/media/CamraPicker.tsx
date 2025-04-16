import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { COLOR } from '../../constant/Colors'
import { Icon } from '../../constant/Icon'
import { Responsive } from '../../constant/Responsive'
import { FontsROBOTO } from '../../constant/Fonts'

type CameraPickerProps = {
    localPhoto: string;
    handleSelectPhoto: () => void;

};

const ImagePicker: React.FC<CameraPickerProps> = ({ localPhoto, handleSelectPhoto }) => {
    return (
        <View style={styles.container}>
            {localPhoto ? (
                <TouchableOpacity onPress={handleSelectPhoto}>
                    <Image source={{ uri: localPhoto }} style={styles.Image} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.containerImage} onPress={handleSelectPhoto}>
                    <Icon.AvatarSVG width={70} height={70} fill={COLOR.WHITE} />
                    <Text style={styles.placeholderText}>Chọn ảnh</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: Responsive.wp(28),
        height: Responsive.wp(28),
        resizeMode: 'contain',
        borderRadius: Responsive.wp(13.5),
    },
    placeholderText: {
        color: COLOR.WHITE,
        textAlign: 'center',
        fontSize: Responsive.hp(2.2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        letterSpacing: 0.5,
    },
    containerImage: {
        marginTop: Responsive.hp(0.3),
        flexDirection: 'column',
        gap: Responsive.hp(1),
        width: Responsive.wp(100),
        height: Responsive.wp(40),
        justifyContent: 'center',
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
    },
    Image: {
        width: Responsive.wp(100),
        height: Responsive.wp(60),
        resizeMode: 'cover',
    },
    avatar: {
        flexDirection: 'column',
        gap: Responsive.hp(1),
    },
})

export default ImagePicker
