import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleChatAdmin = StyleSheet.create({
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
        backgroundColor: COLOR.GRAY,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    viewBody: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
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
})

export default StyleChatAdmin