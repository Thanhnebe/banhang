import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleDetailVoucherCoupon = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE
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
    viewImageBackground: {
        width: Responsive.wp(100),
        height: Responsive.hp(15),
        alignSelf: 'center',
    },
    imageBackground: {
        width: Responsive.wp(100),
        height: Responsive.hp(15),
        resizeMode: 'cover',
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(4),
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
        color: COLOR.BLACK,
        fontWeight: 'bold',
    },
    containerDetail: {
        bottom: Responsive.hp(8),
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
    viewDetail: {
        width: Responsive.wp(60),
        gap: Responsive.hp(1),
    },
    viewExpiration: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    viewConditionDetail: {
        flexDirection: 'column',
        gap: Responsive.hp(1),
    },
    viewCondition: {
        paddingVertical: Responsive.hp(0.5),
        paddingHorizontal: Responsive.wp(2),
        flexDirection: 'column',
        gap: Responsive.hp(0.5),
    },
    textCondition: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textConditionDetail: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        textAlign: 'justify',
    },
    textSpecidal: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textSpecidalDetail: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        textAlign: 'justify',
    },
    textPaymentProvider: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textPaymentProviderDetail: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    viewShipper: {
        flexDirection: 'column',
        gap: Responsive.hp(0.5),
        paddingHorizontal: Responsive.wp(1),
    },
    textShipperTitle: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textShipper: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(4),
        paddingVertical: Responsive.hp(1),
        backgroundColor: COLOR.REDTWO,
        height: Responsive.hp(6),
        width: Responsive.wp(95),
        alignItems: 'center',
        alignSelf: 'center',
        bottom: Responsive.hp(2),
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        letterSpacing: 0.25
    },
});

export { StyleDetailVoucherCoupon }