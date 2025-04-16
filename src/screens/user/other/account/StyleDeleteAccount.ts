import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleDeleteAccount = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY
    },
    viewheader: {
        height: Responsive.hp(12),
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
        top: Responsive.hp(6.2),
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
        backgroundColor: COLOR.WHITE,
    },
    viewdeleteAccount: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Responsive.wp(107),
        height: Responsive.hp(38),
        resizeMode: 'cover',
    },
    textdelete: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsOSANS.OSANS_SEMIBOLD,
        color: COLOR.BLACK,
        top: Responsive.hp(1),
        letterSpacing: 0.25,
        textAlign: 'justify',
        paddingHorizontal: Responsive.wp(2),
    },
    viewcheckbox: {
        marginTop: Responsive.hp(4),
        paddingHorizontal: Responsive.wp(4),
    },
    buttonConfirm: {
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: Responsive.wp(5),
        borderRadius: 8,
        top: Responsive.hp(21),
    },
    textbutton: {
        fontSize: Responsive.RFPercentage(2.3),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.WHITE,
        fontWeight: '700',
        letterSpacing: 0.25
    }

});

export { StyleDeleteAccount }