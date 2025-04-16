import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleEvaluateProducts = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewheader: {
        flexDirection: 'row',
        height: Responsive.hp(13),
        backgroundColor: COLOR.REDONE,
        shadowColor: COLOR.REDONE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(2),
        paddingHorizontal: Responsive.wp(5),
    },
    textHeader: {
        fontSize: Responsive.RFPercentage(2.5),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.WHITE,
    },
    containerBody: {
        marginTop: Responsive.hp(1),
        backgroundColor: COLOR.WHITE,
        flexDirection: 'column',
        gap: Responsive.hp(1),
    },
    viewProducts: {
        flexDirection: 'column',
        backgroundColor: COLOR.WHITE,
    },
    viewProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Responsive.wp(5),
    },
    imageProduct: {
        width: Responsive.wp(15),
        height: Responsive.hp(10),
    },
    viewProductDetail: {
        marginLeft: Responsive.wp(2),
    },
    textProduct: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
    },
    textPrice: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
    },
    line: {
        width: '100%',
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GRAYONE,
        marginTop: Responsive.hp(2),
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(5),
    },
    textRating: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
        width: Responsive.wp(28),
    },
    viewRating: {
        width: Responsive.wp(68),
        alignItems: 'center',
    },
    viewMedia: {
        flexDirection: 'column',
        paddingHorizontal: Responsive.wp(3),
    },
    textMedia: {
        fontSize: Responsive.RFPercentage(2.2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
    },
    Media: {
        marginTop: Responsive.hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewAddMedia: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLOR.REDONE,
        width: Responsive.wp(43),
        height: Responsive.hp(8),
        justifyContent: 'center',
        gap: Responsive.hp(0.5),
    },
    textAddMedia: {
        fontSize: Responsive.RFPercentage(2.1),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.REDONE,
        marginLeft: Responsive.wp(2),
    },
    viewImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLOR.REDONE,
        width: Responsive.wp(43),
        height: Responsive.hp(8),
        alignItems: 'center',
        gap: Responsive.hp(0.5),
    },
    viewReviews: {
        width: Responsive.wp(95),
        height: Responsive.hp(50),
        backgroundColor: COLOR.GRAYONE,
        alignSelf: 'center',
        marginTop: Responsive.hp(2),
        borderWidth: 1,
        borderColor: COLOR.GREY,
    },
    viewInput: {
        paddingHorizontal: Responsive.wp(2),
        width: Responsive.wp(95),
        
    },
    textReviews: {
        fontSize: Responsive.RFPercentage(2),
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
        color: COLOR.BLACK,
    },
    inputReviews: {
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
    },
    decor: {
        width: '100%',
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GREY,
        marginTop: Responsive.hp(2),
    },

});

export default StyleEvaluateProducts