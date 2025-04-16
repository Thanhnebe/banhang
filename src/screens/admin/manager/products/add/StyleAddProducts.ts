import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleAddProducts = StyleSheet.create({
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
        backgroundColor: COLOR.GRAYONE,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Responsive.wp(2),
        paddingVertical: Responsive.hp(2),
        backgroundColor: COLOR.WHITE,
    },
    inputWrapper: {
        flex: 1,
        paddingHorizontal: Responsive.wp(2),
    },
    viewDropdown: {
        backgroundColor: COLOR.WHITE,
        marginRight: 10,
        width: Responsive.wp(100),
        paddingHorizontal: Responsive.wp(2),
    },
    label: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLUE,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    image: {
        width: Responsive.wp(15),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLUE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        gap: Responsive.wp(5),
        paddingVertical: Responsive.hp(2),
    },
    textImage: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'center',
        marginTop: Responsive.hp(1),
    },
    input: {
        width: Responsive.wp(93),
        height: Responsive.hp(6),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GREY,
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(1),
        alignSelf: 'center',
        flexDirection: 'row',
    },
    viewIcon: {
        position: 'absolute',
        right: Responsive.wp(5),
        top: Responsive.hp(5.2),
    },
    addPriceColorButton: {
        width: Responsive.wp(45),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    priceColorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        gap: Responsive.wp(5),
        paddingVertical: Responsive.hp(2),
    },
    button: {
        width: Responsive.wp(100),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25,
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

export default StyleAddProducts