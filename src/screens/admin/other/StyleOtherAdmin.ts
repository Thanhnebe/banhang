import { StyleSheet } from "react-native";
import { COLOR } from "../../../constant/Colors";
import { FontsROBOTO } from "../../../constant/Fonts";
import { Responsive } from "../../../constant/Responsive";

const StyleOtherAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        flexDirection: 'row',
        height: Responsive.hp(18),
        gap: Responsive.wp(3),
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(4),
        marginLeft: Responsive.wp(3.5),
        top: Responsive.hp(2),
    },
    image: {
        width: Responsive.wp(19.8),
        height: Responsive.hp(10),
        borderRadius: 50,
        marginTop: Responsive.hp(0.5),
    },
    textheader1: {
        color: COLOR.WHITE,
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        letterSpacing: 0.5,
    },
    textheader2: {
        color: COLOR.WHITE,
        fontSize: Responsive.RFPercentage(1.9),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        bottom: Responsive.hp(0.2),
        letterSpacing: 0.3,
    },
    textheader3: {
        color: COLOR.BLUE,
        fontSize: Responsive.RFPercentage(1.9),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        bottom: Responsive.hp(0.2),
        letterSpacing: 0.3,
    },
    containerBody: {
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(1),
    },
});

export default StyleOtherAdmin