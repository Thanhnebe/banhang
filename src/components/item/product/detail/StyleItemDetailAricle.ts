import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleItemDetailArticle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
    },
    containerHeader: {},
    viewimage: {
        width: Responsive.wp(100),
        height: Responsive.hp(50),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: Responsive.hp(1),
        borderColor: COLOR.ORANGEONE,
    },
    image: {
        width: Responsive.wp(60),
        height: Responsive.hp(50),
        resizeMode: 'contain',
        alignSelf: 'center',
        top: Responsive.hp(3),
    },
    containerBody: {},
    containerText: {
        width: Responsive.wp(100),
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(3),
        paddingBottom: Responsive.hp(1),
    },
    viewName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerShipper: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: Responsive.hp(1),
        width: Responsive.wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    viewShipper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.hp(1),
        gap: Responsive.wp(2),
    },
    textShipper: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
    },
    viewDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewModel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Responsive.wp(0.5),
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
    viewHeart: {
        top: Responsive.hp(0.5),
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
    viewIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Responsive.wp(3),
        position: 'absolute',
        width: Responsive.wp(100),
        zIndex: 1,
    },
    viewIconHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Responsive.wp(20),
        alignItems: 'center',
    },
    iconBack: {
        marginTop: Responsive.hp(4.5),
        left: Responsive.wp(2),
    },
    iconCart: {
        marginTop: Responsive.hp(4.5),
    },
    iconShare: {
        marginTop: Responsive.hp(4.5),
    },
    iconRight: {
        width: Responsive.wp(6),
        height: Responsive.hp(6),
        resizeMode: 'contain',
        tintColor: COLOR.REDONE,
        bottom: Responsive.hp(0.35),
    },
    containerDescribe: {
        width: Responsive.wp(94),
        backgroundColor: COLOR.WHITE,
        paddingBottom: Responsive.hp(1),
    },
    textDescribe: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2.28),
        color: COLOR.BLACK,
        textAlign: 'justify',
        lineHeight: Responsive.hp(3),
        letterSpacing: 0.25,
    },
    containerFooter: {
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Responsive.hp(7),
    },
    viewChatCart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Responsive.wp(43),
        height: Responsive.hp(7),
        backgroundColor: COLOR.WHITE,
    },
    viewChat: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCart: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineheight: {
        width: Responsive.wp(0.2),
        height: Responsive.hp(7),
        backgroundColor: COLOR.BLACK,
    },
    viewTotal: {
        width: Responsive.wp(53),
        height: Responsive.hp(7),
        backgroundColor: COLOR.REDTWO,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textChat: {
        fontFamily: FontsROBOTO.ROBOTO_BLACK,
        fontSize: Responsive.RFPercentage(1.8),
        color: COLOR.BLACK,
    },
    textCart: {
        fontFamily: FontsROBOTO.ROBOTO_BLACK,
        fontSize: Responsive.RFPercentage(1.8),
        color: COLOR.BLACK,
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
    contentContainer: {
        // flexGrow: 1,
        // paddingBottom: Responsive.hp(7),
    },
    footerButton: {
        backgroundColor: COLOR.REDTWO,
        height: Responsive.hp(6),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Responsive.wp(3),
        bottom: Responsive.hp(1),
        borderRadius: 5,
    },
    footerText: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.4),
        color: COLOR.WHITE,
    },
    listProduct: {
        height: 'auto'
    },
    textProduct: {
        fontFamily: FontsOSANS.OSANS_BOLD,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.RED,
        paddingBottom: Responsive.hp(1),
        paddingHorizontal: Responsive.wp(3),
    },
    viewCartIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCountCart: {
        width: Responsive.wp(5),
        height: Responsive.hp(2.5),
        backgroundColor: COLOR.REDTWO,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Responsive.hp(5.3),
        left: Responsive.wp(3),
    },
    textCountCart: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.5),
        color: COLOR.WHITE,
    },
});

export { StyleItemDetailArticle }