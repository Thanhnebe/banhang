import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleIntroduction = StyleSheet.create({
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
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(6.2),
        justifyContent: 'space-between',
        paddingHorizontal: Responsive.wp(4),
    },
    textHeader: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
        width: Responsive.wp(80),
        letterSpacing: 0.25
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.GRAY,
    },
    text: {
        fontSize: Responsive.RFPercentage(2.3),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    },
    viewItem: {
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Responsive.hp(10),
    }
});

export { StyleIntroduction }