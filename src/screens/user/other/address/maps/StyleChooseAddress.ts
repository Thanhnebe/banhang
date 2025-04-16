import { StyleSheet } from "react-native";
import { COLOR } from "../../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../../constant/Fonts";
import { Responsive } from "../../../../../constant/Responsive";


const StyleChooseAddress = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE
    },
    viewheader: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1.5,
        borderBottomColor: COLOR.GRAY,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: Responsive.hp(5),
        paddingHorizontal: Responsive.wp(3),
    },
    input: {
        width: Responsive.wp(80),
        height: Responsive.hp(5),
        backgroundColor: COLOR.GRAY,
        left: Responsive.wp(4),
    },
    textExit: {
        fontSize: 14,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: 'bold',
        right: Responsive.wp(9),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        marginTop: Responsive.hp(0.4),
    },
    containerProvince: {
        flex: 1,
        flexDirection: 'column',
        gap: Responsive.hp(1),
        paddingHorizontal: Responsive.wp(3),
    },
    containerLocation: {
        height: Responsive.hp(100),
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(2),
    },
    textlocation: {
        fontSize: 16,
        fontFamily: FontsOSANS.OSANS_REGULAR,
        color: COLOR.GREY,
    },
    selectedArea: {
        height: Responsive.hp(12),
        backgroundColor: COLOR.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GRAY,
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(2),
    },
    selectedTitleArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: Responsive.hp(1.5),
    },
    selectedTitle: {
        fontSize: 15,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.REDONE,
        fontWeight: '700',
    },
    selectedProvince: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    selectedDistrict: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    selectedWard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    selectedText: {
        fontSize: 17,
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        color: COLOR.BLACK,
    },
    viewborder: {
        width: Responsive.wp(2.8),
        height: Responsive.hp(1.5),
        backgroundColor: COLOR.GRAY,
        borderRadius: Responsive.wp(5),
    },
});

export { StyleChooseAddress }