import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";

const StylesItemListCart = StyleSheet.create({
    container: {
        width: Responsive.wp(98),
        height: Responsive.hp(20),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        marginBottom: Responsive.hp(1),
        borderRadius: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    viewCheckbox: {
        width: Responsive.wp(10),
        height: Responsive.hp(20),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Responsive.wp(28),
        height: Responsive.hp(17),
    },
    viewItem: {
        width: Responsive.wp(80),
        height: Responsive.hp(18),
        justifyContent: 'space-around',
        marginLeft: Responsive.wp(2),
    },
    textNameProducts: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.9),
        color: COLOR.BLACK,
        width: Responsive.wp(58),
    },
    textPriceProducts: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.RED,
    },
    viewColor: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Responsive.wp(28),
        height: Responsive.hp(3.5),
        backgroundColor: COLOR.GRAYONE,
        borderRadius: 3,
    },
    textColorProducts: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.8),
        color: COLOR.BLACK,
        fontWeight: 'bold',
        marginLeft: Responsive.wp(3),
    },
    textChangeProducts: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(1.8),
        color: COLOR.RED,
        width: Responsive.wp(23),
        height: Responsive.hp(3),
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: COLOR.REDTWO,
        borderRadius: 3,
    },
    viewRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Responsive.wp(55),
    },
    viewQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Responsive.wp(18),
        height: Responsive.hp(3),
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        borderRadius: 3,
    },
    textQuantityProducts: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
    },
    viewDelete: {
        width: Responsive.wp(20),
        height: Responsive.hp(20),
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
})

export { StylesItemListCart }