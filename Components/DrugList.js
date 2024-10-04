import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation } from '@react-navigation/native'

const DrugList = ({ drug }) => {
  const navigation = useNavigation()
  const days_left = drug.expiry_status.days_left
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DrugDetail', { drug: drug })}
      className={
        'w-full p-2 relative rounded-xl bg-white flex flex-row items-center space-x-3 mb-3 h-auto shadow-sm shadow-black/50'
      }
    >
      <Image
        className={'w-[70px] h-[70px] rounded-xl'}
        source={{ uri: drug.image }}
      />

      <View className={'flex flex-col space-y-0 flex-1'}>
        <CustomText className={'text-xl text-black'}>
          {drug.drug_name}
        </CustomText>
        <CustomText>
          {drug.category.substring(0, 30) +
            (drug.category.length > 30 ? '...' : '')}
        </CustomText>
        <CustomText className={'text-wrap'}>
          {drug.description.substring(0, 70) +
            (drug.description.length > 70 ? '...' : '')}
        </CustomText>
      </View>

      <View
        className={`absolute h-[20px] w-[15px] right-0 top-0  rounded-b-lg ${
          days_left === 0
            ? 'bg-red-600'
            : days_left < 30 && days_left > 0
            ? 'bg-orange-600'
            : days_left < 150 && days_left > 30
            ? 'bg-orange-400'
            : days_left < 365 && days_left > 150
            ? 'bg-[#808000]'
            : days_left > 365
            ? 'bg-green-700'
            : ''
        } `}
      ></View>
    </TouchableOpacity>
  )
}

export default DrugList
