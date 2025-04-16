import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";

const StylesItemDetailUpdateCart = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
    },
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 100,
        bottom: 0,
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(50),
        elevation: 8,
        flex: 1,
    },
    containerBody: {},
    lineHeight: {
        width: Responsive.wp(100),
        height: Responsive.hp(0.1),
        backgroundColor: COLOR.BLACKONE,
        marginTop: Responsive.hp(1.5),
        marginBottom: Responsive.hp(1),
    },
    containerText: {
        width: Responsive.wp(100),
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(3),
        paddingBottom: Responsive.hp(1),
    },
    textTilte: {
        fontFamily: FontsOSANS.OSANS_BOLD,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.RED,
        paddingBottom: Responsive.hp(1),
    },
    textname: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.ORANGEONE,
        marginTop: Responsive.hp(1),
    },
    textstock: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.BLACK,
        marginTop: Responsive.hp(1),
    },
    textPriceDiscount: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD_ITALIC,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.REDONE,
    },
    textPrice: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.3),
        color: COLOR.BLACK,
        textDecorationLine: 'line-through',
    },
    textDiscount: {
        width: Responsive.wp(23),
        height: Responsive.hp(3.3),
        backgroundColor: COLOR.ORANGEONE,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.9),
        color: COLOR.WHITE,
        marginLeft: Responsive.wp(10),
    },
    viewPriceColor: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Responsive.hp(1.5),
        flexDirection: 'column',
        width: Responsive.wp(29),
        height: Responsive.hp(5.3),
        backgroundColor: COLOR.ORANGEONE,
        borderRadius: 5,
    },
    textPirceColor: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.9),
        color: COLOR.WHITE,
    },
    viewTotal: {
        width: Responsive.wp(100),
        height: Responsive.hp(7),
        backgroundColor: COLOR.REDTWO,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTotal: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.WHITE,
    },
    textTotalPrice: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.WHITE,
    },
    iconClose: {
        left: Responsive.wp(65),
    },
    containerQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Responsive.hp(1),
    },
    containerQuantityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Responsive.wp(25),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLOR.GREY,
    },
    viewQuantity: {
        width: Responsive.wp(7),
        height: Responsive.hp(3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: COLOR.GREY,
    },
    textQuantity: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.3),
        color: COLOR.BLACK,
    },
})

export { StylesItemDetailUpdateCart }