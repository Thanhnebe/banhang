import { Modal } from "react-native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../constant/Fonts";
import { Responsive } from "../../constant/Responsive";

interface TypeCustomModalConfirm {
    title: string;
    message: string;
    isVisible: boolean;
    onPressCancel: () => void;
    onPressConfirm: () => void;
}

const CustomModalConfirm: React.FC<TypeCustomModalConfirm> = ({ title, message, isVisible, onPressCancel, onPressConfirm }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            statusBarTranslucent={true}
        >
            <View style={StyleCustomModalConfirm.container}>
                <View style={StyleCustomModalConfirm.view}>
                    <Text style={StyleCustomModalConfirm.title}>{title}</Text>
                    <Text style={StyleCustomModalConfirm.message}>{message}</Text>
                    <View style={StyleCustomModalConfirm.viewButton}>
                        <TouchableOpacity style={StyleCustomModalConfirm.buttonCancel} onPress={onPressCancel}>
                            <Text style={StyleCustomModalConfirm.textButton}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleCustomModalConfirm.buttonConfirm} onPress={onPressConfirm}>
                            <Text style={StyleCustomModalConfirm.textButton}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModalConfirm;

const StyleCustomModalConfirm = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    view: {
        width: Responsive.wp(80),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        padding: Responsive.hp(2),
    },
    title: {
        fontSize: 18,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACKONE,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: Responsive.hp(1),
    },
    message: {
        fontSize: 16,
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.BLACKONE,
        textAlign: 'center',
        marginBottom: Responsive.hp(1),
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCancel: {
        width: Responsive.wp(35),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonConfirm: {
        width: Responsive.wp(35),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 16,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.WHITE,
        fontWeight: 'bold',
    },
})