import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleChangePasswordAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    viewheader: {
        height: Responsive.hp(11),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 2,
        borderBottomColor: COLOR.GRAY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(6),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: 18,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
        left: Responsive.wp(10),
        letterSpacing: 0.25,
        marginLeft: Responsive.wp(9),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        flexDirection: 'column',
        gap: Responsive.hp(2),
    },
    textinput: {
        width: Responsive.wp(90),
        height: Responsive.hp(7),
        marginTop: Responsive.hp(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GRAY,
        paddingLeft: Responsive.wp(2),
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Responsive.wp(90),
        height: Responsive.hp(7),
        marginTop: Responsive.hp(2),
    },
    viewConfirm: {
        width: Responsive.wp(90),
        height: Responsive.hp(7),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Responsive.hp(5),
    },
    textVerification: {
        fontSize: 16,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        right: Responsive.wp(20),
        top: Responsive.hp(1),
    },
    textConfirm: {
        fontSize: 18,
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    }
})

export default StyleChangePasswordAdmin