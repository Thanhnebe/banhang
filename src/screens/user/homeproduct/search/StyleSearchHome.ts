import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";

const StyleSearchHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewheader: {
        height: Responsive.hp(15),
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
    },
    headerSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Responsive.hp(7.3),
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonCancel: {
        position: 'absolute',
        right: Responsive.wp(1),
    },
    iconCancelsearch: {
        width: Responsive.wp(8),
        height: Responsive.hp(3),
        resizeMode: 'contain',
    },
    inputsearch: {
        width: Responsive.wp(79),
        height: Responsive.hp(5),
        borderRadius: 10,
        backgroundColor: COLOR.GRAY,
    },
    textTitle: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.WHITE,
        marginLeft: Responsive.wp(2),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewNoProduct: {
        flex: 1,
        alignItems: 'center',
        marginTop: Responsive.hp(20),
    },
    iconNoProduct: {
        width: Responsive.wp(50),
        height: Responsive.hp(35),
        resizeMode: 'contain',
    },
    textNoProduct: {
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.BLACK,

    },
});

export { StyleSearchHome }