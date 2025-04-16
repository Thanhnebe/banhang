import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import { CustomHeader } from '../../../../../import/IndexComponent';

import StyleListCustomerChat from './StyleListCustomerChat';
import { Responsive } from '../../../../../constant/Responsive';
import { useAppSelector } from '../../../../../import/IndexFeatures';

import { ScrollView } from 'react-native-gesture-handler';
import { socket } from '../../../../../utils/Socket.io-client';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../../constant/Icon';

const ListCustomerChat: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const user = useAppSelector(state => state.root.Auth.user);

    const [waitingUsers, setWaitingUsers] = useState<any[]>([]);

    useEffect(() => {

        socket.on('newMessageFromUser', (data) => {
            setWaitingUsers(prev => [...prev, data]);
        });


        // Cleanup khi component unmount
        return () => {
            socket.off('newMessageFromUser');
        };

    }, []);

    const handleSelectUser = (room: string) => {
        socket.emit('joinRoom', { username: user.fullname, room, role: user.role });
        navigation.navigate('StackAdminManagerOther', { screen: 'ChatAdmin', params: { room, username: user.fullname, role: user.role } });
    };

    return (
        <View style={StyleListCustomerChat.container}>
            <View style={StyleListCustomerChat.viewheader}>
                <View style={StyleListCustomerChat.headerTitle}>
                    <CustomHeader title='Tin nhắn khách hàng' color='red' fontSize={Responsive.RFPercentage(2.4)} />
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={StyleListCustomerChat.containerBody}>
                    <FlatList
                        data={waitingUsers}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={StyleListCustomerChat.viewItem}
                                onPress={() => handleSelectUser(item.room)}
                            >
                                <Icon.AvatarSVG width={Responsive.wp(10)} height={Responsive.hp(5)} fill='red' />
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={StyleListCustomerChat.textName}>{item.name}</Text>
                                        <Text style={StyleListCustomerChat.textTime}>{item.time}</Text>
                                    </View>
                                    <View>
                                        <Text style={StyleListCustomerChat.textMessage}>{item.message?.slice(0, 38)}...</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ListCustomerChat