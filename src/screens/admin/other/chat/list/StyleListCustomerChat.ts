import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleListCustomerChat = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    viewheader: {
        height: Responsive.hp(12),
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
        top: Responsive.hp(6.5),
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
        letterSpacing: 0.25,
        fontWeight: 'bold'
    },
    textTime: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        marginLeft: 'auto'
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GRAY,
        gap: Responsive.wp(3)
    },
    iconRight: {
        width: Responsive.wp(5),
        height: Responsive.hp(3),
        marginLeft: 'auto'
    },
})

export default StyleListCustomerChat