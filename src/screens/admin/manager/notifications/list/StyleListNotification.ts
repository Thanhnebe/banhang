import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleListNotification = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GREY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        elevation: 5,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(6.2),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: Responsive.RFPercentage(2.8),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        width: Responsive.wp(80),
        letterSpacing: 0.25
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
        marginTop: Responsive.hp(2),
    },
    image: {
        width: Responsive.wp(15),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    viewTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: Responsive.hp(15),
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        gap: Responsive.wp(5),
        paddingHorizontal: Responsive.wp(5),
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLUE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    textNumber: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    loading: {
        marginVertical: Responsive.hp(2),
    },
});

export default StyleListNotification