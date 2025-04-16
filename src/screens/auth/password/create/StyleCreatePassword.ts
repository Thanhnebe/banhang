import { StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Colors';
import { Responsive } from '../../../../constant/Responsive';
import { FontsROBOTO } from '../../../../constant/Fonts';

const StyleCreatePassword = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    containerHeader: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
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
    input: {
        width: Responsive.wp(90),
        height: Responsive.hp(7),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        alignSelf: 'center',
        marginTop: Responsive.hp(2),
    },
    button: {
        width: Responsive.wp(92),
        height: Responsive.hp(7),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Responsive.hp(5),
    },
    text: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    containerInput: {
        flexDirection: 'column',
        gap: Responsive.hp(2),
    },
    viewInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconShowPassword: {
        position: 'absolute',
        right: Responsive.wp(6),
        top: Responsive.hp(3.3),
    },
});

export default StyleCreatePassword;
