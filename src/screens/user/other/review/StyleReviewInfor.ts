import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleReviewInfor = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
    },
    viewheader: {
        height: Responsive.hp(12),
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
        top: Responsive.hp(6.5),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: Responsive.RFPercentage(2.3),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
        left: Responsive.wp(14),
        letterSpacing: 0.25,
        marginLeft: Responsive.wp(9),
    },
    containerBody: {
        backgroundColor: COLOR.WHITE,
    },
    viewTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Responsive.hp(1.5),
        marginBottom: Responsive.hp(2),
    },
    viewRatedYet: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(1),
        borderBottomWidth: 2,
        borderBottomColor: COLOR.RED,
    },
    textCount: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
        width: Responsive.wp(5.5),
        textAlign: 'center',
        height: Responsive.hp(2.8),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTab: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.GREY,
        letterSpacing: 0.25,
    },
    textActive: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_BLACK_ITALIC,
        color: COLOR.RED,
        letterSpacing: 0.25,
        // borderBottomWidth: 2,
        // borderBottomColor: COLOR.RED,
        width: Responsive.wp(30),
        textAlign: 'center',
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
    viewProductDetail: {
        marginLeft: Responsive.wp(3),
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
    viewEvaluate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.hp(1),
    },
    viewButton: {
        backgroundColor: COLOR.ORANGEONE,
        width: Responsive.wp(30),
        height: Responsive.hp(5),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.WHITE,
        letterSpacing: 0.25,
    },
    imageAvatar: {
        width: Responsive.wp(10),
        height: Responsive.hp(5),
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
    }
});

export { StyleReviewInfor }