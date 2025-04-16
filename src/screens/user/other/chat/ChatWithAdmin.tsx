import { View, Text, Image, Keyboard, TouchableOpacity, Animated, FlatList, TextInput, ImageSourcePropType } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndexStyles } from '../../../../import/IndexStyles';
import { Icon } from '../../../../constant/Icon';

import { CustomHeader, ItemMessageUser } from '../../../../import/IndexComponent';
import { Responsive } from '../../../../constant/Responsive';
import useStatusBarConfig from '../../../../utils/UseStatusBarConfig';

import { useAppSelector } from '../../../../import/IndexFeatures';
import { socket } from '../../../../utils/Socket.io-client';
import { ScrollView } from 'react-native-gesture-handler';

import ImageCropPicker from 'react-native-image-crop-picker';
import ToastMessage from '../../../../utils/ToastMessage';
import { PermissionVoice } from '../../../../utils/Permission';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Video, { VideoRef } from 'react-native-video';
import { MessageEntity } from '../../../../model/entity/Index.Message.entity';

const ChatWithAdmin: React.FC = () => {
    useStatusBarConfig('dark-content', 'transparent', true);

    const user = useAppSelector(state => state.root.Auth.user);

    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const iconOpacity = useRef(new Animated.Value(1)).current;

    const iconTranslateY = useRef(new Animated.Value(0)).current;

    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

    const [messages, setMessages] = useState<MessageEntity[]>([]);

    const [message, setMessage] = useState<string>('');

    const [isRecording, setIsRecording] = useState<boolean>(false);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);

    const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState<string | null>(null);

    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        socket.connect();

        const room = user.fullname;

        socket.emit('joinRoom', { username: user.fullname, room, role: user.role });

        socket.on('MessageWaitingUser', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('userMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('userImage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userAudio', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userVideo', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('loadMessages', (loadedMessages) => {
            loadedMessages.sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time).getTime() - new Date(b.time).getTime());
            setMessages(loadedMessages);
        });

        return () => {
            keyboardDidShowListener.remove();

            keyboardDidHideListener.remove();

            socket.off('MessageWaitingUser');

            socket.off('userMessage');

            socket.off('loadMessages');

            socket.off('userImage');

            socket.off('userAudio');

            socket.off('userVideo');

        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

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

    const handleSelectPhoto = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                includeBase64: true,
            });

            if ('data' in image) {
                const base64Image = `data:${image.mime};base64,${image.data}`;
                socket.emit('sendImage', {
                    username: user.fullname,
                    message: `${user.fullname} đã gửi ảnh`,
                    image: base64Image,
                    room: user.fullname,
                    role: user.role
                });
            } else {
                console.log('Selected media is not an image.');
            }
        } catch (error) {
            console.log('Error selecting image: ', error);
        }
    };

    const handleRecordVideo = async () => {
        try {
            const video = await ImageCropPicker.openCamera({
                mediaType: 'video',
                includeBase64: true,
                compressVideoPreset: 'MediumQuality',
                compressVideoMaxDuration: 60,
            });
            if (video && video.path) {
                // Gửi video tới server thông qua socket
                socket.emit('sendVideoMessage', {
                    username: user.fullname,
                    message: `${user.fullname} đã gửi một video`,
                    video: video.path,  // Đường dẫn của file video
                    room: user.fullname,
                    role: user.role,
                });
                console.log('Video recorded: ', video);
            }
        } catch (error) {
            console.log('Error recording video: ', error);
        }
    }

    const startRecording = async () => {
        try {
            const hasPermission = await PermissionVoice();
            if (hasPermission) {
                const path = await audioRecorderPlayer.startRecorder();
                setIsRecording(true);
            } else {
                ToastMessage('error', 'Ứng dụng cần quyền ghi âm để thực hiện chức năng này');
            }
        } catch (error) {
            console.log('Error starting recording: ', error);
        }
    };

    const stopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            if (result) {
                socket.emit('sendAudioMessage', {
                    username: user.fullname,
                    message: `${user.fullname} đã gửi một đoạn ghi âm`,
                    audio: result, // Đường dẫn của file âm thanh
                    room: user.fullname,
                    role: user.role,
                });
            }
        } catch (error) {
            console.log('Lỗi khi dừng ghi âm:', error);
        }
    };

    const startAudio = async (audio: string) => {
        try {
            await audioRecorderPlayer.startPlayer(audio);
            setIsPlaying(true);
            setPlayingMessageId(audio);
        } catch (error) {
            console.log('Lỗi khi phát âm thanh:', error);
        }
    };

    const stopAudio = async () => {
        try {
            await audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);
            setPlayingMessageId(null);
        } catch (error) {
            console.log('Lỗi khi dừng phát âm thanh:', error);
        }
    };

    const playVideo = (videoId: string) => {
        if (currentPlayingVideoId === videoId) {
            // Nếu video đang được phát, dừng nó
            setCurrentPlayingVideoId(null);
        } else {
            // Nếu phát video mới, đặt ID của video hiện tại
            setCurrentPlayingVideoId(videoId);
        }
    };

    const sendMessage = async () => {
        if (message.trim()) {
            socket.emit('sendMessage', { username: user.fullname, message, room: user.fullname, role: user.role });
            setMessage('');
        } else {
            ToastMessage('error', 'Vui lòng nhập tin nhắn');
        }
    };

    return (
        <View style={IndexStyles.StyleChatWithAdmin.container}>
            <View style={IndexStyles.StyleChatWithAdmin.viewheader}>
                <View style={IndexStyles.StyleChatWithAdmin.headerTitle}>
                    <CustomHeader title="Trò chuyện với tôi" color="red" fontSize={Responsive.RFPercentage(2.6)} />
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                ref={scrollRef}
            >
                <View style={IndexStyles.StyleChatWithAdmin.containerBody}>
                    <View style={IndexStyles.StyleChatWithAdmin.viewBody}>
                        <FlatList
                            data={messages}
                            renderItem={({ item }) => (
                                <ItemMessageUser
                                    item={item}
                                    user={user}
                                    currentPlayingVideoId={currentPlayingVideoId}
                                    setCurrentPlayingVideoId={setCurrentPlayingVideoId}
                                    isPlaying={isPlaying}
                                    playingMessageId={playingMessageId}
                                    startAudio={startAudio}
                                    stopAudio={stopAudio}
                                    playVideo={playVideo}
                                />
                            )}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={IndexStyles.StyleChatWithAdmin.viewInputSend}>
                {!isKeyboardVisible ? (
                    <>
                        <Animated.View
                            style={{
                                opacity: iconOpacity,
                                transform: [{ translateY: iconTranslateY }],
                            }}
                        >
                            <TouchableOpacity onPress={handleRecordVideo}>
                                <Icon.CameraSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={'red'} />
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View
                            style={{
                                opacity: iconOpacity,
                                transform: [{ translateY: iconTranslateY }],
                            }}
                        >
                            <TouchableOpacity onPress={handleSelectPhoto}>
                                <Icon.LibraryImageSVG width={Responsive.wp(7)} height={Responsive.hp(5)} fill={'red'} />
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View
                            style={{
                                opacity: iconOpacity,
                                transform: [{ translateY: iconTranslateY }],
                            }}
                        >
                            <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}  >
                                <Icon.MicSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={isRecording ? 'blue' : 'red'} />
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
                <TextInput
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChangeText={setMessage}
                    style={[
                        IndexStyles.StyleChatWithAdmin.input,
                        { width: isKeyboardVisible ? Responsive.wp(75) : Responsive.wp(48) },
                    ]}
                    onFocus={() => {
                        setTimeout(() => {
                            scrollRef.current?.scrollToEnd({ animated: true });
                        }, 100);
                    }}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Icon.SendSVG width={Responsive.wp(6)} height={Responsive.hp(5)} fill={'red'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatWithAdmin;