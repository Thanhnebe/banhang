import { View, Text, TouchableOpacity, Keyboard, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IndexStyles } from '../../../../import/IndexStyles'

import { Icon } from '../../../../constant/Icon';
import { PickerCustom, ImagePicker, InputCustom, Loading, CustomHeader } from '../../../../import/IndexComponent';

import DatePicker from 'react-native-date-picker'
import { FormatDate } from '../../../../utils/FormatDate'

import { useNavigation } from '@react-navigation/native'
import { UpdateUser } from '../../../../model/entity/IndexUsers.entity'
import { Update } from '../../../../redux/slices/Auth.Slice'
import { HandleUpdateUser } from '../../../../service/Api/IndexUser'

import ToastMessage from '../../../../utils/ToastMessage'
import { COLOR } from '../../../../constant/Colors'

import { useImagePicker } from '../../../../import/IndexFeatures';
import { useAppDispatch, useAppSelector } from '../../../../features/redux/ReduxHook'
import { Responsive } from '../../../../constant/Responsive';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfile: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { photoUrl, handleSelectPhoto, handleUploadPhoto } = useImagePicker();
  const users = useAppSelector(state => state.root.Auth.user)
  const [open, setOpen] = useState<boolean>(false)
  const [infor, setInfor] = useState<UpdateUser>({
    fullname: users.fullname,
    phone: users.phone,
    date_of_birth: users.date_of_birth ? new Date(users.date_of_birth) : new Date(),
    gender: users.gender || 'Chọn giới tính',
    photoUrl: users.photoUrl,
  })
  const [inputDisabled, setInputDisabled] = useState<{ [key: string]: boolean }>({
    fullname: true,
    phone: true,
    date_of_birth: true,
    gender: true,
    photoUrl: true,
  })

  const isInfoChanged = () => {
    return !inputDisabled.fullname
      || !inputDisabled.phone
      || !inputDisabled.date_of_birth
      || !inputDisabled.gender
      || !inputDisabled.photoUrl
  }
  const handleUpdate = async () => {
    try {
      if (!isInfoChanged()) {
        ToastMessage('error', 'Không có thay đổi để cập nhật')
        return;
      }
      const response = await HandleUpdateUser(users._id, infor)
      if (response.status === 200) {
        if (photoUrl) {
          const uploadPhoto = await handleUploadPhoto(users._id, photoUrl)
          if (uploadPhoto && uploadPhoto.status === 200) {
            const data = uploadPhoto.data.photoUrl
            dispatch(Update({ ...infor, photoUrl: data }))
            ToastMessage('success', 'Cập nhật thành công')
          }
        } else {
          dispatch(Update(infor))
          ToastMessage('success', 'Cập nhật thành công')
        }
      }
    } catch (error: any) {
      console.log("🚀 ~ handleUpdate ~ error:", error)
    }
  }


  return (
    <Pressable onPress={Keyboard.dismiss} style={IndexStyles.StyleEditProfile.container}>
      <View style={IndexStyles.StyleEditProfile.container}>
        <View style={IndexStyles.StyleEditProfile.viewheader}>
          <View style={IndexStyles.StyleEditProfile.headerTitle}>
            <CustomHeader title='Chỉnh sửa hồ sơ' color={COLOR.REDONE} fontSize={Responsive.RFPercentage(2.5)} />
            <TouchableOpacity
              onPress={handleUpdate}
              disabled={!isInfoChanged()}
              style={{ opacity: isInfoChanged() ? 1 : 0.5 }}
            >
              <Text style={{
                ...IndexStyles.StyleEditProfile.textHeader,
                color: isInfoChanged() ? COLOR.REDONE : COLOR.BLACK
              }}>
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
          <View style={IndexStyles.StyleEditProfile.containerBody}>
            {photoUrl ? (
              <ImagePicker
                localPhoto={photoUrl}
                handleSelectPhoto={() => {
                  handleSelectPhoto(), setInfor({ ...infor, photoUrl: photoUrl }), setInputDisabled({ ...inputDisabled, photoUrl: false })
                }} />
            ) : (
              <ImagePicker localPhoto={users.photoUrl} handleSelectPhoto={handleSelectPhoto} />
            )}
            <View>
              <View style={IndexStyles.StyleEditProfile.viewinput}>
                <Text style={IndexStyles.StyleEditProfile.textinput}>Họ và tên</Text>
                <InputCustom
                  placeholder='Nhập tên đầy đủ'
                  value={infor.fullname}
                  onChangeText={(text) => {
                    setInfor({ ...infor, fullname: text })
                    setInputDisabled({ ...inputDisabled, fullname: text === users.fullname })
                  }}
                  keyboardType='default'
                  placeholderTextColor='#000000'
                  color={COLOR.REDONE}
                  icon={<Icon.AvatarSVG width={25} height={25} fill={COLOR.REDONE} />}
                />
              </View>
              <View style={IndexStyles.StyleEditProfile.viewinput}>
                <Text style={IndexStyles.StyleEditProfile.textinput}>Email</Text>
                <InputCustom
                  placeholder='Nhập email'
                  value={users.email}
                  onChangeText={() => { }}
                  keyboardType='email-address'
                  placeholderTextColor={COLOR.BLACK}
                  color={COLOR.REDONE}
                  disabled={true}
                  icon={<Image source={Icon.EMAIL} style={{ width: 25, height: 25 }} />}
                />
              </View>
              <View style={IndexStyles.StyleEditProfile.viewinput}>
                <Text style={IndexStyles.StyleEditProfile.textinput}>Số điện thoại</Text>
                <InputCustom
                  placeholder='Nhập số điện thoại'
                  value={infor.phone}
                  onChangeText={(text) => {
                    setInfor({ ...infor, phone: text })
                    setInputDisabled({ ...inputDisabled, phone: text === users.phone })
                  }}
                  keyboardType='numeric'
                  placeholderTextColor={COLOR.BLACK}
                  color={COLOR.REDONE}
                  icon={<Image source={Icon.CALL} style={{ width: 23, height: 23 }} />}
                />
              </View>
              <View style={IndexStyles.StyleEditProfile.viewgender}>
                <Text style={IndexStyles.StyleEditProfile.textinput}>Giới tính</Text>
                <PickerCustom
                  onValueChange={(itemValue) => {
                    setInfor({ ...infor, gender: itemValue });
                    setInputDisabled({ ...inputDisabled, gender: itemValue === users.gender });
                  }}
                  selectedValue={infor.gender}
                  options={['Chọn giới tính', 'Nam', 'Nữ']}
                  icon={<Icon.GenderSVG width={25} height={25} fill={COLOR.REDONE} />}
                  color={COLOR.REDONE}
                />
              </View>
              <TouchableOpacity style={IndexStyles.StyleEditProfile.viewdatepicker} onPress={() => setOpen(true)}>
                <Text style={IndexStyles.StyleEditProfile.textinput}>Ngày sinh</Text>
                <InputCustom
                  value={FormatDate(infor.date_of_birth)}
                  placeholder="Chọn ngày sinh"
                  placeholderTextColor={COLOR.BLACK}
                  color={COLOR.REDONE}
                  disabled={true}
                  icon={<Icon.DateofBirthSVG width={25} height={25} fill={COLOR.REDONE} />}
                />
                <DatePicker
                  modal={true}
                  mode="date"
                  open={open}
                  date={infor.date_of_birth}
                  locale="vi-VN"
                  onConfirm={(selectedDate) => {
                    setOpen(false);
                    setInfor({ ...infor, date_of_birth: selectedDate });
                    setInputDisabled({ ...inputDisabled, date_of_birth: selectedDate === users.date_of_birth })
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Pressable>
  )
}

export default EditProfile