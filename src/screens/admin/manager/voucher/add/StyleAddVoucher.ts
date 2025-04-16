import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleAddVouchers = StyleSheet.create({
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
        marginTop: Responsive.hp(2),
    },
    viewImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
    },
    imageLogo: {
        width: Responsive.wp(14),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    image: {
        width: Responsive.wp(14),
        height: Responsive.hp(8),
        resizeMode: 'contain',
        tintColor: COLOR.REDONE
    },
    buttonImage: {
        flexDirection: 'row',
        width: Responsive.wp(40),
        height: Responsive.hp(5),
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.REDONE,
    },
    textButtonImage: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    iconButtonImage: {
        width: Responsive.wp(5),
        height: Responsive.hp(3),
        resizeMode: 'contain',
        tintColor: COLOR.REDONE
    },
    viewInput: {
        paddingHorizontal: Responsive.wp(5),
        backgroundColor: COLOR.WHITE,
        paddingVertical: Responsive.hp(2),
        flexDirection: 'column',
        gap: Responsive.hp(1),
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
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
    buttonSave: {
        width: Responsive.wp(90),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: Responsive.hp(2),
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        elevation: 10,
    },
    textButtonSave: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    dropdown: {
        height: Responsive.hp(6),
        width: Responsive.wp(90),
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

export default StyleAddVouchers