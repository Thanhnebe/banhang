import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useStatusBarConfig from '../../../../utils/UseStatusBarConfig'

import { Icon } from '../../../../constant/Icon'
import { FlashList } from '@shopify/flash-list'
import { ItemCategoryProduct, CustomHeader } from '../../../../import/IndexComponent'

import { IndexStyles } from '../../../../import/IndexStyles';
import { useAppSelector } from '../../../../import/IndexFeatures'
import { Loading } from '../../../../import/IndexComponent'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CategoryProduct: React.FC = () => {
  useStatusBarConfig('dark-content', 'transparent', true)

  const DataCategory = useAppSelector((state) => state.Category.data)

  const isLoading = useAppSelector((state) => state.Category.loading)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <View style={IndexStyles.StyleCategoryProduct.container}>
      <View style={IndexStyles.StyleCategoryProduct.viewheader}>
        <View style={IndexStyles.StyleCategoryProduct.headerSmall}>
          <CustomHeader title='Danh mục điện thoại' color='#fff' />
          <TouchableOpacity onPress={() => navigation.navigate('StackMisc', { screen: 'AllCategoryProduct' })}>
            <Icon.MenuSVG width={25} height={25} fill='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={IndexStyles.StyleCategoryProduct.containerProduct}>
        {isLoading && <Loading loading={isLoading} />}
        <FlashList
          data={DataCategory}
          renderItem={({ item }) => <ItemCategoryProduct item={item} navigation={navigation} />}
          keyExtractor={(item) => item._id}
          horizontal={false}
          numColumns={2}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default CategoryProduct