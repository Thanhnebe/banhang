import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleChatWithAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY
    },
    viewheader: {
        height: Responsive.hp(13),
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
        top: Responsive.hp(7),
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
        backgroundColor: COLOR.REDONE,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    viewBody: {
        width: Responsive.wp(100),
        // justifyContent: 'flex-end',
        // alignItems: 'flex-start',
        padding: Responsive.wp(2),
        backgroundColor: COLOR.GRAY,
    },
    viewItem: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        marginTop: Responsive.hp(2),
        padding: Responsive.wp(3),
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        elevation: 5,
    },
    textMessage: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textName: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    textAudio: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    }, 
    textTime: {
        fontSize: Responsive.RFPercentage(1.8),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    },
    viewInputSend: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Responsive.wp(100),
        height: Responsive.hp(8),
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(3),
    },
    input: {
        width: Responsive.wp(50),
        height: Responsive.hp(5),
        backgroundColor: COLOR.GRAY,
        borderRadius: 10,
        paddingHorizontal: Responsive.wp(2),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        fontSize: Responsive.RFPercentage(2.1),
        color: COLOR.BLACK,
    }
});

export { StyleChatWithAdmin }