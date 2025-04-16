import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, memo } from 'react'
import { CustomHeader } from '../../../../import/IndexComponent'

import { IndexStyles } from '../../../../import/IndexStyles'
import { useGetNotificationQuery, useDeleteNotificationMutation, useUpdateIsReadNotificationMutation } from '../../../../service/Api/Index.Notification'
import { useAppSelector } from '../../../../import/IndexFeatures'

import { FlashList } from '@shopify/flash-list'
import { Icon } from '../../../../constant/Icon'
import { FormatDate3 } from '../../../../utils/FormatDate'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ToastMessage from '../../../../utils/ToastMessage'


const Notification: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const user = useAppSelector(state => state.root.Auth.user._id)

    const { data, isLoading } = useGetNotificationQuery(user)

    const [updateIsReadNotification] = useUpdateIsReadNotificationMutation();

    const [deleteNotification] = useDeleteNotificationMutation()

    const notifications = useMemo(() => {
        return data?.data?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];
    }, [data]);


    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

    const handleSwipeableOpen = (itemId: string) => {
        Object.keys(swipeableRefs.current).forEach(refId => {
            if (refId !== itemId && swipeableRefs.current[refId]) {
                swipeableRefs.current[refId]?.close();
            }
        });
    };

    const handleNavigate = (item: any) => {
        if (item.data.orderId.status === 'Đã xác nhận') {
            console.log("🚀 ~ handleNavigate ~ item.data.orderId", item.data.orderId.status)
            const payment = 'Đơn hàng đã xác nhận, shop sẽ giao hàng trong thời gian sớm nhất.';
            navigation.navigate('StackMisc', { screen: 'DetailPendingDelivery', params: { id: item.data.orderId._id, payment: payment } });
        } else if (item.data.orderId.status === 'Chờ xác nhận') {
            console.log("🚀 ~ handleNavigate ~ item.data.orderId", item.data.orderId.status)
            const confirmStatus = "Đơn hàng đang chờ xác nhận, shop sẽ xác nhận trong thời gian sớm nhất.";
            navigation.navigate('StackMisc', { screen: 'DetailPendingDelivery', params: { id: item.data.orderId._id, payment: confirmStatus } });
        } else if (item.data.orderId.status === 'Đang giao') {
            console.log("🚀 ~ handleNavigate ~ item.data.orderId", item.data.orderId.status)
            const payment = 'Đơn hàng đang giao tới bạn, vui lòng chờ nhận hàng và kiểm tra hàng hóa trước khi thanh toán.';
            navigation.navigate('StackMisc', { screen: 'DetailPendingDelivery', params: { id: item.data.orderId._id, payment: payment } });
        } else if (item.data.orderId.status === 'Đã giao') {
            console.log("🚀 ~ handleNavigate ~ item.data.orderId", item.data.orderId.status)
            const payment = 'Giao hàng thành công, cảm ơn bạn đã mua hàng tại shop.';
            navigation.navigate('StackMisc', { screen: 'DetailStatusDelivered', params: { id: item.data.orderId._id, payment: payment } });
        } else if (item.data.orderId.status === 'Đã hủy') {
            console.log("🚀 ~ handleNavigate ~ item.data.orderId", item.data.orderId.status)
            const payment = 'Đơn hàng đã huỷ';
            navigation.navigate('StackMisc', { screen: 'DetailStatusCancelled', params: { id: item.data.orderId._id, payment: payment } });
        }
    };


    const handleUpdateIsReadNotification = async () => {
        try {
            const res = await updateIsReadNotification({ data: { userId: user } }).unwrap();
            if (res.data) {
                navigation.goBack();
                ToastMessage('success', 'Đã đọc')
            }
        } catch (error) {
            console.log("🚀 ~ handleUpdateIsReadNotification ~ error:", error)
            ToastMessage('error', 'Cập nhật thông báo thất bại')
        }
    }

    const handleDeleteNotification = async (id: string) => {
        try {
            if (id) {
                const res = await deleteNotification({ id }).unwrap();
                if (res.data) {
                    ToastMessage('success', 'Xóa thông báo thành công');
                    navigation.goBack();
                }
            }
            ToastMessage('success', 'Xóa thông báo thành công')
        } catch (error) {
            console.log("🚀 ~ handleDeleteNotification ~ error:", error)
            ToastMessage('error', 'Xóa thông báo thất bại')
        }
    }


    const renderRightActions = (id: string) => {
        return (
            <TouchableOpacity style={IndexStyles.StyleNotification.viewDelete} onPress={() => handleDeleteNotification(id)}>
                <Text style={IndexStyles.StyleNotification.textDelete}>Xóa</Text>
            </TouchableOpacity>
        );
    }

    if (isLoading) {
        return (
            <View style={IndexStyles.StyleNotification.containerLoading}>
                <ActivityIndicator size='large' color='red' />
            </View>
        )
    }

    const SwipeableNotificationItem = ({ item, onNavigate, onDelete }: any) => (
        <Swipeable
            ref={(ref) => { swipeableRefs.current[item._id] = ref; }}
            renderRightActions={() => renderRightActions(item._id)}
            onSwipeableWillOpen={() => handleSwipeableOpen(item._id)}>
            <TouchableOpacity
                style={[IndexStyles.StyleNotification.containerItem, { backgroundColor: item.isRead ? '#FFFFFF' : '#d6d6d6' }]}
                onPress={() => onNavigate(item)}>
                <View>
                    {item.data.orderId?.products[0]?.priceColor?.image ?
                        <FastImage
                            source={{
                                uri: item.data.orderId?.products[0]?.priceColor?.image,
                                priority: FastImage.priority.high,
                            }}
                            style={IndexStyles.StyleNotification.image}
                        />
                        :
                        <Icon.StoreSVG width={40} height={40} fill='red' />
                    }
                </View>
                <View style={IndexStyles.StyleNotification.viewText}>
                    <Text style={IndexStyles.StyleNotification.textTitle}>{item.title}</Text>
                    <Text style={IndexStyles.StyleNotification.textBody}>{item.body}</Text>
                    <Text style={IndexStyles.StyleNotification.textTime}>{FormatDate3(item.createdAt)}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );


    return (
        <View style={IndexStyles.StyleNotification.container}>
            <View style={IndexStyles.StyleNotification.viewheader}>
                <View style={IndexStyles.StyleNotification.headerTitle}>
                    <CustomHeader title='Thông báo' />
                    <TouchableOpacity onPress={handleUpdateIsReadNotification}>
                        <Icon.SelectAllSVG width={25} height={25} fill='red' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={IndexStyles.StyleNotification.containerBody}>
                <FlashList
                    data={notifications}
                    renderItem={({ item }) => (
                        <SwipeableNotificationItem
                            item={item}
                            onNavigate={handleNavigate}
                            onDelete={handleDeleteNotification}
                        />
                    )}
                    keyExtractor={item => item._id}
                    estimatedItemSize={300}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </View>
    )
}

export default Notification