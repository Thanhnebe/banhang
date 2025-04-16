import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../constant/Icon';
import { Responsive } from '../../../../constant/Responsive';
import { COLOR } from '../../../../constant/Colors';
import { FormatPriceVND2 } from '../../../../utils/FormatPrice';
import { useAppSelector } from '../../../../import/IndexFeatures';
import Shuffle from '../../../../utils/Shuffle';
import { FlashList } from '@shopify/flash-list';
import { ItemArticle } from '../../../../import/IndexComponent';

type OrderSuccessProps = {
    order: {
        totalAmount: number,
        status: string,
        paymentStatus: string,
        title: string,
    },
}

const OrderFailed: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<OrderSuccessProps, 'order'>>();
    const { paymentStatus, status, totalAmount, title } = route.params;
    const product = Shuffle(useAppSelector((state) => state.Product.data)).slice(0, 20);

    const order = `Đơn hàng của bạn chưa được thanh toán thành công với số tiền ${FormatPriceVND2(totalAmount)}. Vui lòng thanh toán lại đơn hàng của bạn đang có trạng thái ${status} và trạng thái thanh toán là ${paymentStatus}.`;

    return (
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <View style={styles.headerTitle}>
                    <Icon.BackSVG width={30} height={30} fill={COLOR.WHITE} onPress={() => navigation.navigate('TabHome', { screen: 'Trang chủ' })} />
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.viewBody}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.WHITE }}>{title}</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.textBody}>{order}</Text>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: Responsive.wp(5) }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabHome', { screen: 'Trang chủ' })}>
                        <Text style={{ fontSize: Responsive.RFPercentage(2.3), color: COLOR.WHITE }}>Quay lại trang chủ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabHome', { screen: 'Cá nhân' })}>
                        <Text style={{ fontSize: Responsive.RFPercentage(2.3), color: COLOR.WHITE }}>Đơn mua</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listProduct}>
                <Text style={styles.textProduct}>Sản phẩm liên quan</Text>
                <FlashList
                    data={product}
                    renderItem={({ item }) => <ItemArticle item={item} navigation={navigation} />}
                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={200}
                />
            </View>
        </View>
    );
}

export default OrderFailed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.ORANGEONE
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Responsive.hp(14),
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Responsive.wp(100),
        paddingHorizontal: Responsive.wp(5),
        top: Responsive.hp(2),
    },
    viewBody: {
        marginTop: Responsive.hp(2)
    },
    viewText: {
        marginHorizontal: Responsive.wp(5),
        marginTop: Responsive.hp(3),
    },
    textBody: {
        fontSize: Responsive.RFPercentage(2.3),
        color: COLOR.WHITE,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    button: {
        width: Responsive.wp(40),
        height: Responsive.hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: Responsive.hp(5),
        borderWidth: 1,
        borderColor: COLOR.WHITE,
    },
    listProduct: {
        flex: 1,
        marginTop: Responsive.hp(5),
        backgroundColor: COLOR.WHITE,
    },
    textProduct: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.WHITE,
        marginLeft: Responsive.wp(5),
        marginBottom: Responsive.hp(2),
    }
})

