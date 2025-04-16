import { View, Text, Animated, TouchableOpacity, Image, Keyboard, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';

import StyleChatAdmin from './StyleChatAdmin';
import { Responsive } from '../../../../../constant/Responsive';
import { Icon } from '../../../../../constant/Icon';

import { useAppSelector } from '../../../../../import/IndexFeatures';
import { ScrollView } from 'react-native-gesture-handler';
import { socket } from '../../../../../utils/Socket.io-client';

import { useRoute, RouteProp } from '@react-navigation/native';
import { MessageEntity } from '../../../../../model/entity/Index.Message.entity';

type Props = {
    username: string;
    room: string;
    role: string;
}

const EvaluateAdmin: React.FC = () => {

    const route = useRoute<RouteProp<Record<string, Props>, 'params'>>();

    const { room, role, username } = route.params;

    // const user = useAppSelector(state => state.root.Auth.user);

    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const iconOpacity = useRef(new Animated.Value(1)).current;

    const iconTranslateY = useRef(new Animated.Value(0)).current;

    const [messages, setMessages] = useState<MessageEntity[]>([]);

    const [message, setMessage] = useState('');

    const handleImagePress = () => {
        setKeyboardVisible(false);
        Animated.parallel([
            Animated.timing(iconOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(iconTranslateY, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(iconOpacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(iconTranslateY, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 80);
        });

    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('adminMessage', { room, message, username, role });
            setMessage(''); // Clear input after sending
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {

        socket.emit('joinRoom', { username, room, role });

        socket.on('adminMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('userMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('adminMessage');

            socket.off('userMessage');
        };
    }, []);


    return (
        <View style={StyleChatAdmin.container}>
            <View style={StyleChatAdmin.viewheader}>
                <View style={StyleChatAdmin.headerTitle}>
                    <CustomHeader title='Trò chuyện khách hàng' color='red' fontSize={Responsive.RFPercentage(2.4)} />
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={StyleChatAdmin.containerBody}>
                    <View style={StyleChatAdmin.viewBody}>
                        <FlatList
                            data={messages}
                            renderItem={({ item }) => (
                                <View style={StyleChatAdmin.viewItem}>
                                    <Text style={StyleChatAdmin.textMessage}>{item.message}</Text>
                                    <Text style={StyleChatAdmin.textName}>{item.username}</Text>
                                </View>
                            )}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={StyleChatAdmin.viewInputSend}>
                        {!isKeyboardVisible ? (
                            <>
                                <Animated.View
                                    style={{
                                        opacity: iconOpacity,
                                        transform: [{ translateY: iconTranslateY }],
                                    }}
                                >
                                    <TouchableOpacity>
                                        <Icon.CameraSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={'red'} />
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        opacity: iconOpacity,
                                        transform: [{ translateY: iconTranslateY }],
                                    }}
                                >
                                    <TouchableOpacity>
                                        <Icon.LibraryImageSVG width={Responsive.wp(7)} height={Responsive.hp(5)} fill={'red'} />
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        opacity: iconOpacity,
                                        transform: [{ translateY: iconTranslateY }],
                                    }}
                                >
                                    <TouchableOpacity>
                                        <Icon.MicSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={'red'} />
                                    </TouchableOpacity>
                                </Animated.View>
                            </>
                        ) : (
                            <TouchableOpacity onPress={handleImagePress}>
                                <Image
                                    source={Icon.RIGHT}
                                    style={{ width: Responsive.wp(6), height: Responsive.hp(5) }}
                                />
                            </TouchableOpacity>
                        )}
                        <InputCustom
                            placeholder="Nhập tin nhắn..."
                            value={message}
                            onChangeText={setMessage}
                            style={[
                                StyleChatAdmin.input,
                                { width: isKeyboardVisible ? Responsive.wp(75) : Responsive.wp(48) },
                            ]}
                        />
                        <TouchableOpacity onPress={sendMessage}>
                            <Icon.SendSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={'red'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EvaluateAdmin