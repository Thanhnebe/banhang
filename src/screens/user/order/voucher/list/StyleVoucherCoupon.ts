import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleVoucherCoupon = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        height: Responsive.hp(13),
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
    viewVoucher: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(4),
        paddingVertical: Responsive.hp(1.5),
        marginHorizontal: Responsive.wp(2),
        marginVertical: Responsive.hp(1),
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        elevation: 5,
        gap: Responsive.hp(1.5),
    },
    viewVoucherDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewDetail: {
        width: Responsive.wp(60),
        gap: Responsive.hp(1),
    },
    textVoucher: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    textPrice: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACKONE,
        letterSpacing: 0.25
    },
    textExpiration: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACKONE,
        letterSpacing: 0.25
    },
    viewImage: {
        width: Responsive.wp(21),
        height: Responsive.hp(11),
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Responsive.wp(12),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    textLogo: {
        fontSize: Responsive.RFPercentage(1.8),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
    },
    viewExpiration: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Responsive.wp(66),
    },
    viewCondition: {
        left: 'auto',
    },
    textCondition: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLUE,
        letterSpacing: 0.25,
    },
    checkbox: {
        width: Responsive.wp(5),
        height: Responsive.hp(2.6),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.REDONE,
    },
});

export { StyleVoucherCoupon }