import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleInformation = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY,
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
    containerbody: {
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(1),
    },
    containerorder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Responsive.wp(2),
        marginVertical: Responsive.hp(2),
    },
    vieworder1: {
        flexDirection: 'row',
        gap: Responsive.wp(2),
    },
    vieworder2: {
        flexDirection: 'row',
        gap: Responsive.wp(2),
        left: Responsive.wp(2),
    },
    textOrder1: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        letterSpacing: 0.5,
        textAlignVertical: 'center',
        color: COLOR.BLACK,
    },
    textOrder2: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_ITALIC,
        letterSpacing: 0.5,
        textAlignVertical: 'center',
    },
    containerConfirm: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: Responsive.hp(1.2),
        marginBottom: Responsive.hp(2),
    },
    decor: {
        width: '100%',
        height: Responsive.hp(1.2),
        backgroundColor: COLOR.GRAY,
        alignSelf: 'center',
        marginBottom: Responsive.hp(1.5),
    },
    viewconfirm1: {
        flexDirection: 'column',
        gap: Responsive.wp(2),
        alignItems: 'center',
    },
    viewconfirm2: {
        flexDirection: 'column',
        gap: Responsive.wp(2),
        alignItems: 'center',
    },
    viewinfor1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Responsive.wp(4),
        marginVertical: Responsive.hp(1),
    },
});

export { StyleInformation }