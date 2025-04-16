import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";

const StyleMangerOrder = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAY,
    },
    header: {
        height: Responsive.hp(14.5),
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GREY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: Responsive.hp(1),
        right: Responsive.wp(3),
    },
    headerText: {
        fontSize: Responsive.RFPercentage(2.7),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    containerBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: Responsive.hp(2),
        backgroundColor: COLOR.WHITE,
        height: Responsive.hp(8),
        width: '100%',
        alignItems: 'center',
        gap: Responsive.wp(6),
    },
    viewTabButton: {
        width: Responsive.wp(33),
        height: Responsive.hp(8),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewTabButton1: {
        width: Responsive.wp(39),
        height: Responsive.hp(8),
        backgroundColor: COLOR.REDONE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTab: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    },
    textActive: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BLACK_ITALIC,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
    },
    textActiveCancel: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_BLACK_ITALIC,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
    },
    viewOrder: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        backgroundColor: COLOR.WHITE,
        marginBottom: Responsive.hp(2),
        height: Responsive.hp(21),
    },
    viewOrderCancel: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        backgroundColor: COLOR.WHITE,
        marginBottom: Responsive.hp(2),
    },
    viewOrderText: {
        flexDirection: 'column',
    },
    viewOrderRight: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textOrder: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    },
    textProduct: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        letterSpacing: 0.25
    },
    viewOrderProduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Responsive.wp(3),
        paddingVertical: Responsive.hp(1),
        gap: Responsive.wp(10),
    },
    viewOrderProductText: {
        marginRight: 'auto',
    },
    imageOrder: {
        width: Responsive.wp(18),
        height: Responsive.hp(12.5),
        resizeMode: 'cover',
    },
    viewOrderButton: {
        backgroundColor: COLOR.REDONE,
        width: Responsive.wp(40),
        height: Responsive.hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: Responsive.hp(0.5),
    },
});

export default StyleMangerOrder;