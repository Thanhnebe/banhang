import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../../constant/Fonts";
import { Responsive } from "../../../../../../constant/Responsive";


const StyleStatusCancelled = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY,
        marginTop: Responsive.hp(2),
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerItem: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: Responsive.wp(100),
        backgroundColor: COLOR.WHITE,
        padding: Responsive.hp(2),
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: Responsive.hp(2),
    },
    viewText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Responsive.wp(93),
    },
    viewIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    textShop: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.3),
        color: COLOR.BLACK,
    },
    textStatus: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.REDONE,
    },
    viewCart: {
        marginTop: Responsive.hp(1),
        flexDirection: 'row',
    },
    viewImagge: {
        width: Responsive.wp(23),
        height: Responsive.hp(15),
        resizeMode: 'contain',
        right: Responsive.wp(5),
    },
    image: {
        width: Responsive.wp(30),
        height: Responsive.hp(15),
        resizeMode: 'contain',
    },
    viewInfor: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    textInfor: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
        width: Responsive.wp(70),
    },
    textQuantity: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
        right: Responsive.wp(2),
    },
    textChangeProducts: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(1.85),
        color: COLOR.RED,
        width: Responsive.wp(38),
        height: Responsive.hp(3.3),
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: COLOR.REDTWO,
        borderRadius: 3,
    },
    textPrice: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.REDONE,
        right: Responsive.wp(2),
    },
    viewLengthCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Responsive.hp(1),
    },
    textLengthCart: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK
    },
    textTotal: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.RED,
    },
    viewPayment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.hp(1),
    },
    textPayment: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
        width: Responsive.wp(51),
        textAlign: 'justify'
    },
    textMoreProducts: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLUE,
        textAlign: 'center',
    },
    line: {
        width: Responsive.wp(93),
        height: 1,
        backgroundColor: COLOR.GRAY,
        marginTop: Responsive.hp(1),
        marginBottom: Responsive.hp(1),
    },
    viewButton: {
        width: Responsive.wp(40),
        height: Responsive.hp(5),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        left: Responsive.wp(2),
    },
    textButton: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.WHITE,
    }
});

export { StyleStatusCancelled }