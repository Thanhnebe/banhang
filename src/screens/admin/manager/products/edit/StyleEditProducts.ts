import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleEditProducts = StyleSheet.create({
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
    image: {
        width: Responsive.wp(15),
        height: Responsive.hp(8),
        resizeMode: 'contain',
    },
    viewTab: {

        height: Responsive.hp(7),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
    },
    textTitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLUE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    row: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Responsive.hp(2),
        paddingHorizontal: Responsive.wp(5),
    },
    viewInput: {
        flexDirection: 'column',
        gap: Responsive.hp(1),
        justifyContent: 'center',
    },
    quantityButton: {
        position: 'absolute',
        right: Responsive.wp(4),
        top: Responsive.hp(5),
    },
    inputWrapper: {
        width: Responsive.wp(90),
        height: Responsive.hp(6),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GREY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Responsive.wp(3),
    },
    button: {
        width: Responsive.wp(90),
        height: Responsive.hp(6),
        backgroundColor: COLOR.BLUE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Responsive.hp(2),
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StyleEditProducts