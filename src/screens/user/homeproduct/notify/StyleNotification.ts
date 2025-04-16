import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleNotification = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        backgroundColor: COLOR.WHITE,
    },
    containerItem: {
        width: Responsive.wp(100),
        backgroundColor: COLOR.WHITE,
        marginVertical: Responsive.hp(1),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewText: {
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    textBody: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        width: Responsive.wp(85),
    },
    textTime: {
        fontSize: Responsive.RFPercentage(1.8),
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.GREY,
        letterSpacing: 0.25
    },
    image: {
        width: Responsive.wp(15),
        height: Responsive.hp(8),
    },
    viewDelete: {
        width: Responsive.wp(15),
        height: Responsive.hp(10),
        backgroundColor: COLOR.REDTWO,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDelete: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.WHITE,
        textAlign: 'center',
    },
});

export { StyleNotification }