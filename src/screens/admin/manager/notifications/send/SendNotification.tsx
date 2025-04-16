import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomHeader, InputCustom } from '../../../../../import/IndexComponent';

import StyleSendNotifications from './StyleSendNotification';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../../../../import/IndexFeatures';

import { Dropdown } from 'react-native-element-dropdown';
import { useCreateAdminNotificationMutation } from '../../../../../service/Api/Index.Notification';
import { HandleGetAllUser } from '../../../../../service/Api/IndexUser';

const SendNotifications: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [selectedValue, setSelectedValue] = useState<any>('');

  const [input, setInput] = useState<any>({
    title: '',
    body: '',
    data: {
      type: '',
      id: '',
      fcmToken: '',
    },
  });

  const [userCustomer, setUserCustomer] = useState<any>([]);

  const [createAdminNotification] = useCreateAdminNotificationMutation();

  const handleSendNotification = async () => {
    try {
      const body = {
        title: input.title,
        body: input.body,
        data: {
          type: input.data.type,
          id: input.data.id,
          userId: selectedValue.value,
          name: selectedValue.label,
        },
      };
      const response = await createAdminNotification({ body });
      console.log("🚀 ~ handleSendNotification ~ response:", response)
      if (response.data) {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async () => {
    try {
      const response = await HandleGetAllUser();
      const data = response.data.map((item: any) => {
        return {
          label: item.fullname,
          value: item._id,
        };
      }
      );
      setUserCustomer(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <View style={StyleSendNotifications.container}>
      <View style={StyleSendNotifications.viewheader}>
        <View style={StyleSendNotifications.headerTitle}>
          <CustomHeader title='Gửi thông báo' color='red' />
        </View>
      </View>
      <View style={StyleSendNotifications.containerBody}>
        <View style={StyleSendNotifications.containerInput}>
          <InputCustom
            placeholder='Tiêu đề'
            value={input.title}
            onChangeText={(text) => setInput({ ...input, title: text })}
            style={StyleSendNotifications.input}
          />
          <InputCustom
            placeholder='Nội dung'
            value={input.body}
            onChangeText={(text) => setInput({ ...input, body: text })}
            style={StyleSendNotifications.input}
          />
          <InputCustom
            placeholder='Loại thông báo'
            value={input.data.type}
            onChangeText={(text) => setInput({ ...input, data: { ...input.data, type: text } })}
            style={StyleSendNotifications.input}
          />
          <InputCustom
            placeholder='ID'
            value={input.data.id}
            onChangeText={(text) => setInput({ ...input, data: { ...input.data, id: text } })}
            style={StyleSendNotifications.input}
          />
          <Dropdown
            placeholder='Chọn người dùng'
            data={userCustomer}
            value={selectedValue}
            onChange={(value: any) => setSelectedValue(value)}
            labelField='label'
            valueField='value'
            style={StyleSendNotifications.dropdown}
            placeholderStyle={StyleSendNotifications.placeholderStyle}
            selectedTextStyle={StyleSendNotifications.selectedTextStyle}
            inputSearchStyle={StyleSendNotifications.inputSearchStyle}
          />
          <TouchableOpacity style={StyleSendNotifications.buttonImage} onPress={handleSendNotification}>
            <Text>Gửi thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendNotifications;
