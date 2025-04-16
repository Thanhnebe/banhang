import { StyleSheet } from "react-native";
import { COLOR } from "../../../constant/Colors";
import { FontsROBOTO } from "../../../constant/Fonts";
import { Responsive } from "../../../constant/Responsive";

const StyleItemListAddress = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        paddingBottom: Responsive.hp(2),
    },
    containerItem: {
        flexDirection: 'column',
        backgroundColor: COLOR.WHITE,
        borderRadius: Responsive.wp(2),
        paddingHorizontal: Responsive.wp(2),
        gap: Responsive.hp(0.5),
        marginTop: Responsive.hp(1),
    },
    viewUser: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: Responsive.wp(2),
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
        width: '100%',
        height: 1,
        backgroundColor: COLOR.GREY,
        marginTop: Responsive.hp(1),
    },
});

export { StyleItemListAddress }