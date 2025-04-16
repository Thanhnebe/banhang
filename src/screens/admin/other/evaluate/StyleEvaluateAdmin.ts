import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleEvaluateAdmin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    viewheader: {
        height: Responsive.hp(11),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 2,
        borderBottomColor: COLOR.GRAY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(6),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: 18,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        textAlign: 'center',
        left: Responsive.wp(10),
        letterSpacing: 0.25,
        marginLeft: Responsive.wp(9),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    imageAvatar: {
        width: Responsive.wp(14),
        height: Responsive.hp(7),
        borderRadius: 50,
    },
    textName: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        fontWeight: 'bold',
        left: Responsive.wp(1.5),
    },
    viewEvaluateProduct: {
        width: Responsive.wp(100),
        height: Responsive.hp(44),
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(3),
        alignSelf: 'center',
        marginVertical: Responsive.hp(1),
    },
    viewReview: {
        width: Responsive.wp(100),
        height: Responsive.hp(25),
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: Responsive.wp(3),
        alignSelf: 'center',
        marginVertical: Responsive.hp(1),
    },
    viewShop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(3),
        marginTop: Responsive.hp(1),
    },
    textReview: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
        fontWeight: 'bold',
    },
    viewProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Responsive.hp(1),
    },
    imageProduct: {
        width: Responsive.wp(15),
        height: Responsive.hp(10),
        borderRadius: 10,
    },
    textProduct: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        letterSpacing: 0.25,
    },
    decor: {
        width: Responsive.wp(100),
        height: 1,
        backgroundColor: COLOR.GREY,
        marginVertical: Responsive.hp(1),
    },
    viewProductDetail: {
        marginLeft: Responsive.wp(3),
    },
})

export default StyleEvaluateAdmin