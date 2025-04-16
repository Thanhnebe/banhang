import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleViewAddRess = StyleSheet.create({
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.GRAYONE
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
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
        marginTop: Responsive.hp(6.2),
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
    containerItem: {
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
    },
    textAddressTitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        letterSpacing: 0.25,
        paddingHorizontal: Responsive.wp(2),
        marginTop: Responsive.hp(1),
        paddingBottom: Responsive.hp(1.5),
    },
    separator: {
        height: 1,
        backgroundColor: COLOR.GRAYONE,
        width: Responsive.wp(100),
    },
    moreAddress: {
        flexDirection: 'row',
        gap: Responsive.wp(2),
        width: Responsive.wp(100),
        height: Responsive.hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        borderRadius: Responsive.wp(2),
        marginTop: Responsive.hp(2),
    },
    textMoreAddress: {
        fontSize: Responsive.RFPercentage(2.3),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        letterSpacing: 0.25
    }
});

export { StyleViewAddRess }