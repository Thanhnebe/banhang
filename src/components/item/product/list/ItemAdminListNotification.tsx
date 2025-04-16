import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useRef } from 'react'
import { FontsROBOTO } from '../../../../constant/Fonts'

import { COLOR } from '../../../../constant/Colors'
import { Responsive } from '../../../../constant/Responsive'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { FormatDate2 } from '../../../../utils/FormatDate'
import { NotificationEntity } from '../../../../model/entity/Index.Notification.entity'
import { Icon } from '../../../../constant/Icon'
import IndexHandleCart from '../../../../service/Api/IndexHandleCart'

type PropsProduct = {
    item: NotificationEntity,
    navigation: any,
    currentlyOpenSwipeable: any,
}

const ItemAdminListNotification = ({ item, navigation, currentlyOpenSwipeable }: PropsProduct) => {

    const swipeableRef = useRef<Swipeable | null>(null);

    // const renderRightActions = () => {
    //     return (
    //         <TouchableOpacity style={styles.viewDelete}>
    //             <Icon.EditSVG width={30} height={30} fill={COLOR.WHITE} />
    //         </TouchableOpacity>
    //     );
    // }

    return (
        <View style={styles.viewItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(5) }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Text style={styles.textBody}>{item.body}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(2) }}>
                        <Text style={styles.textBody}>Loại thông báo:</Text>
                        <Text style={styles.textBody}>{item.data.type}</Text>
                    </View>
                    {item.data.id ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(2) }}>
                            <Text style={styles.textBody}>Id thông báo:</Text>
                            <Text style={styles.textBody}>{item.data.id}</Text>
                        </View>
                    ) : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(2) }}>
                        <Text style={styles.textBody}>Người nhận:</Text>
                        <Text style={styles.textBody}>{item.data.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Responsive.wp(2) }}>
                        <Text style={styles.textBody}>Ngày tạo:</Text>
                        <Text style={styles.textBody}>{FormatDate2(item.createdAt)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemAdminListNotification

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'column',
        width: Responsive.wp(95),
        height: Responsive.hp(20),
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        margin: Responsive.wp(2),
        shadowColor: COLOR.BLACK,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: Responsive.wp(5),
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
    textTitle: {
        fontFamily: FontsROBOTO.ROBOTO_BOLD,
        fontSize: Responsive.RFPercentage(2.5),
        color: COLOR.REDONE,
        textAlign: 'justify'
    },
    textBody: {
        fontFamily: FontsROBOTO.ROBOTO_REGULAR,
        fontSize: Responsive.RFPercentage(2),
        color: COLOR.BLACK,
        textAlign: 'justify'
    },
})