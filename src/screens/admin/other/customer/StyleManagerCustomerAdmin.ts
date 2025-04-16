import { StyleSheet } from "react-native";
import { COLOR } from "../../../../constant/Colors";
import { FontsOSANS, FontsROBOTO } from "../../../../constant/Fonts";
import { Responsive } from "../../../../constant/Responsive";


const StyleManagerCustomerAdmin = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
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
    headerSmall: {
        justifyContent: 'center',
        gap: Responsive.wp(2),
        top: Responsive.hp(1.8),
        left: Responsive.wp(5),
    },
    containerBody: {
        flex: 1,
        backgroundColor: COLOR.GRAYONE,
    },
});

export default StyleManagerCustomerAdmin;