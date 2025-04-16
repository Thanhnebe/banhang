
import { StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Colors';
import { Responsive } from '../../../../constant/Responsive';
import { FontsROBOTO } from '../../../../constant/Fonts';

const StyleBottomSheetModelDetail = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        paddingBottom: Responsive.hp(2),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textitle: {
        fontSize: Responsive.RFPercentage(2.5),
        fontWeight: 'bold',
        color: COLOR.BLACK,
        letterSpacing: 0.25
    },
    line: {
        width: Responsive.wp(10),
        height: Responsive.hp(0.5),
        backgroundColor: COLOR.GRAY,
        marginTop: Responsive.hp(3),
        alignSelf: 'center',
    },
    containerModel: {
        marginTop: Responsive.hp(2),
        flexDirection: 'column',
        gap: Responsive.hp(2),
    },
    viewModel: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Responsive.wp(5),
    },
    textModel: {
        width: Responsive.wp(50),
        fontSize: Responsive.RFPercentage(2.25),
        color: COLOR.BLACK,
        fontFamily: FontsROBOTO.ROBOTO_MEDIUM,
    },
    
});

export default StyleBottomSheetModelDetail;
