import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleSelectedAddress = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GREY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        elevation: 5,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(6.2),
        paddingHorizontal: Responsive.wp(5),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
        marginTop: Responsive.hp(1.8),
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        gap: Responsive.wp(2),
    },
    containerItem: {
        flexDirection: 'column',
        gap: Responsive.hp(0.5),
        paddingVertical: Responsive.hp(1.8),
    },
    checkbox: {
        width: Responsive.wp(5),
        height: Responsive.hp(2.6),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.REDONE,
        marginLeft: Responsive.wp(2),
    },
    viewUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    textName: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
    },
    textPhone: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        width: Responsive.wp(55),
    },
    viewEdit: {
        marginLeft: 'auto',
        right: Responsive.wp(2),
    },
    textEdit: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
    },
    viewAddress: {
        flexDirection: 'column',
        gap: Responsive.hp(0.5),
    },
    textAddress: {
        fontSize: Responsive.RFPercentage(1.85),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACKONE,
    },
    viewShipper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
        top: Responsive.hp(0.5),
    },
    textLocation: {
        fontSize: Responsive.RFPercentage(1.8),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        width: Responsive.wp(22),
        height: Responsive.hp(2.7),
        borderWidth: 1,
        borderColor: COLOR.LIGHT_RED,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 1,
        fontWeight: 'bold',
    },
    textShipper: {
        fontSize: Responsive.RFPercentage(1.8),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.GREY,
        width: Responsive.wp(30),
        height: Responsive.hp(2.7),
        borderWidth: 1,
        borderColor: COLOR.GREY,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        width: Responsive.wp(90),
        alignSelf: 'center',
        top: Responsive.hp(1.8),
    },
    viewButton: {
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(8),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
    },
});

export { StyleSelectedAddress }