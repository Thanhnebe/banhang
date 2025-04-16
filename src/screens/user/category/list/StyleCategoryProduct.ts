import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleCategoryProduct = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    viewheader: {
        width: Responsive.wp(100),
        height: Responsive.hp(13),
        backgroundColor: COLOR.REDONE,
    },
    headerSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Responsive.wp(3),
        gap: Responsive.wp(3),
        top: Responsive.hp(5),
    },
    textheader: {
        fontFamily: FontsOSANS.OSANS_BOLD,
        fontSize: Responsive.RFPercentage(2.3),
        color: COLOR.WHITE,
    },
    containerProduct: {
        height: Responsive.hp(88),
    },
});

export { StyleCategoryProduct }