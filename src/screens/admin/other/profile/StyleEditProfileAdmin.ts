import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";

const StyleEditProfileAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewheader: {
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1.8,
        borderBottomColor: COLOR.GRAYONE,
        height: Responsive.hp(10),
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(3),
        marginTop: Responsive.hp(1.5),
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: Responsive.hp(1.8),
    },
    textHeader: {
        fontSize: 18,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewinput: {
        width: Responsive.wp(95),
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        marginTop: Responsive.hp(4.5),
    },
    textinput: {
        color: COLOR.BLACK,
        fontSize: 18,
        paddingLeft: Responsive.wp(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        bottom: Responsive.hp(1),
    },
    viewgender: {
        width: Responsive.wp(95),
        alignSelf: 'center',
        marginTop: Responsive.hp(2.3),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        height: Responsive.hp(9),
    },
    textgender: {
        color: COLOR.RED,
        bottom: Responsive.hp(0.5),
        fontSize: 14,
        left: Responsive.wp(10),
    },
    viewdatepicker: {
        width: Responsive.wp(95),
        alignSelf: 'center',
        marginTop: Responsive.hp(4.5),
    },
});

export { StyleEditProfileAdmin }