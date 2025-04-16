import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";

const StyleSendNotifications = StyleSheet.create({
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
    containerInput: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
        paddingVertical: Responsive.hp(2),
        gap: Responsive.hp(2)
    },
    viewImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: Responsive.hp(40),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
    },
    image: {
        width: Responsive.wp(50),
        height: Responsive.hp(30),
        resizeMode: 'contain',
    },
    buttonImage: {
        width: Responsive.wp(50),
        height: Responsive.hp(7),
        backgroundColor: COLOR.GREY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: Responsive.hp(1)
    },
    textButtonImage: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(2),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        paddingHorizontal: Responsive.wp(5),
    },
    text: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        letterSpacing: 0.25
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
    button: {
        width: Responsive.wp(80),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDONE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        bottom: Responsive.hp(2),
    },
    buttonDelete: {
        width: Responsive.wp(80),
        height: Responsive.hp(6),
        backgroundColor: COLOR.REDTWO,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: Responsive.hp(2)
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Responsive.hp(2),
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
    input: {
        height: Responsive.hp(6),
        width: Responsive.wp(90),
        borderColor: COLOR.GREY,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: Responsive.RFPercentage(2.5),
    },
});

export default StyleSendNotifications