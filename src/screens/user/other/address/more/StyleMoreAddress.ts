import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleMoreAddress = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GRAY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Responsive.hp(6),
        paddingHorizontal: Responsive.wp(5),
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
        backgroundColor: COLOR.GRAYONE,
    },
    viewinput: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: Responsive.hp(1.5),
    },
    textinput: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.BLACKONE,
        letterSpacing: 0.25,
        paddingHorizontal: Responsive.wp(2),
        marginBottom: Responsive.hp(1),
    },
    input1: {
        width: Responsive.wp(100),
        height: Responsive.hp(7),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
    },
    input2: {
        width: Responsive.wp(100),
        height: Responsive.hp(7),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        backgroundColor: COLOR.WHITE,
    },
    iconright: {
        width: 20,
        height: 20,
    },
    viewaddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(1),
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(7),
    },
    viewchooseAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(2),
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(10),
    },
    textchooseAddress: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    },
    textaddress: {
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.GREY,
        letterSpacing: 0.01,
        paddingHorizontal: Responsive.wp(2.6),
    },
    containerSetting: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: Responsive.hp(1),
    },
    containerViewtext: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(6),
        gap: 10,
        paddingHorizontal: Responsive.wp(1),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
    },
    containerViewdefault: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(6),
        gap: 10,
        paddingHorizontal: Responsive.wp(1),
    },
    viewhome: {
        width: Responsive.wp(20),
        height: Responsive.hp(4),
        backgroundColor: COLOR.GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 'auto',
    },
    viewoffice: {
        width: Responsive.wp(20),
        height: Responsive.hp(4),
        backgroundColor: COLOR.GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textsetting: {
        fontSize: 17,
        color: COLOR.BLACK,
        marginBottom: Responsive.hp(1),
        textAlignVertical: 'center',
        left: Responsive.wp(2),
    },
    textoptions: {
        fontSize: Responsive.RFPercentage(1.9),
        fontWeight: '700',
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.BLACK,
    },
    viewbutton: {
        width: Responsive.wp(95),
        height: Responsive.hp(7),
        alignSelf: 'center',
        backgroundColor: COLOR.REDONE,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Responsive.hp(5),
    },
    textbutton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
    },
    selected: {
        borderColor: COLOR.REDONE,
        borderWidth: 1,
        backgroundColor: COLOR.WHITE,
    },
    selectedText: {
        color: COLOR.REDONE,
    },
});

export { StyleMoreAddress }