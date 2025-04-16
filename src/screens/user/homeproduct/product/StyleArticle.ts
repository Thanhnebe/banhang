import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleArticle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    headerContainer: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.REDONE,
        width: Responsive.wp(100),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Responsive.wp(3),
        marginTop: Responsive.hp(6),
    },
    textHeader: {
        fontFamily: FontsOSANS.OSANS_BOLD,
        fontSize: 20,
        color: COLOR.WHITE,
        marginLeft: Responsive.wp(20),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    loading: {
        marginVertical: Responsive.hp(2),
    },
});

export { StyleArticle }