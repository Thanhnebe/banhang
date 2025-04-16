import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleEditVouchers = StyleSheet.create({
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
        justifyContent: 'center',
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
    viewImage: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
        paddingVertical: Responsive.hp(2)
    },
    image: {
        width: Responsive.wp(14),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    imageLogo: {
        width: Responsive.wp(14),
        height: Responsive.hp(8),
        resizeMode: 'contain',
        tintColor: COLOR.REDONE
    },
    buttonImage: {
        width: Responsive.wp(50),
        height: Responsive.hp(5),
        backgroundColor: COLOR.GREY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: Responsive.hp(2)
    },
    textButtonImage: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    viewInput: {
        flexDirection: 'column',
        gap: Responsive.hp(2),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
        paddingVertical: Responsive.hp(2),
    },
    text: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    containerFooter: {
        justifyContent: 'flex-end',
        backgroundColor: COLOR.WHITE,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 8,
        elevation: 10,
        shadowColor: COLOR.BLACK,
    },
    button: {
        width: Responsive.wp(80),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    input: {
        width: Responsive.wp(90),
        height: Responsive.hp(6),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GREY,
    },
    dropdown: {
        height: Responsive.hp(6),
        width: Responsive.wp(94),
        borderColor: COLOR.GREY,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: Responsive.RFPercentage(2.5),
    },
    selectedTextStyle: {
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.BLACK,
    },
    inputSearchStyle: {
        height: 40,
        borderColor: COLOR.REDONE,
        fontSize: Responsive.RFPercentage(2.5),
    },
});

export default StyleEditVouchers