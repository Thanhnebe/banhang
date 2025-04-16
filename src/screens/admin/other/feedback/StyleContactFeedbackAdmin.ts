import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleContactFeedbackAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY
    },
    viewheader: {
        height: Responsive.hp(11),
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
        top: Responsive.hp(6),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: Responsive.RFPercentage(2.3),
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
        marginTop: Responsive.hp(1),
    },
    viewContact: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Responsive.hp(1),
        paddingHorizontal: Responsive.wp(5),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        backgroundColor: COLOR.WHITE,
    },
    viewText: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: Responsive.wp(5),
    },
    icon: {
        width: Responsive.wp(7),
        height: Responsive.hp(7),
        resizeMode: 'contain',
    },
    iconright: {
        width: Responsive.wp(5),
        height: Responsive.hp(5),
        resizeMode: 'contain',
        marginLeft: 'auto'
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsOSANS.OSANS_MEDIUM,
        color: COLOR.BLACK,
        letterSpacing: 0.1
    },
    textname: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.GREY,
        letterSpacing: 0.25,
    }
});

export default StyleContactFeedbackAdmin