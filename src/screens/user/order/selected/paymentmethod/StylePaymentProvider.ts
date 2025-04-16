import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StylePaymentProvider = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY
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
        backgroundColor: COLOR.WHITE,
    },
    viewProtect: {
        paddingHorizontal: Responsive.wp(2),
        width: Responsive.wp(100),
        height: Responsive.hp(6),
        backgroundColor: COLOR.GRAY,
        justifyContent: 'center',
    },
    textProtect: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
    },
    viewPayment: {
        flexDirection: 'column',
        gap: Responsive.hp(1),
        padding: Responsive.wp(5),
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
        width: Responsive.wp(90),
        height: Responsive.hp(6),
    },
    textPayment: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
    },
    image: {
        width: Responsive.wp(8),
        height: Responsive.hp(5),
        resizeMode: 'contain',
    },
    containerFooter: {
        height: Responsive.hp(10),
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        width: Responsive.wp(90),
        height: Responsive.hp(6.5),
        backgroundColor: COLOR.RED,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
    },
});

export { StylePaymentProvider }