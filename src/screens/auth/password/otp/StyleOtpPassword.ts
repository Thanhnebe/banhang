import { StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Colors';
import { Responsive } from '../../../../constant/Responsive';
import { FontsROBOTO } from '../../../../constant/Fonts';

const StyleOtpPassword = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    containerHeader: {
        height: Responsive.hp(12),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
    },
    viewHeader: {
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
    viewname: {
        width: Responsive.wp(90),
        alignSelf: 'center',
        marginTop: Responsive.hp(5),
        flexDirection: 'column',
        gap: Responsive.hp(0.5)
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.3),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACKONE,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    },
    textname: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    },
    viewInput: {
        paddingHorizontal: Responsive.wp(5),
    },
    button: {
        marginTop: Responsive.hp(5),
        paddingHorizontal: Responsive.wp(5),
    },
    buttonResend: {
        backgroundColor: COLOR.REDONE,
        height: Responsive.hp(7),
        width: Responsive.wp(92),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textResend: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    },
    textSend: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    },
    viewResend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Responsive.hp(2),
    },
    textTime: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.25
    }
});

export default StyleOtpPassword;
