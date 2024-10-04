import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation } from '@react-navigation/native'

const DoctorList = ({ doctor }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DoctorDetail', { doctor: doctor })}
      className={
        'w-full p-2 rounded-lg bg-white flex flex-row items-center space-x-5 mb-3 shadow-sm shadow-black/50'
      }
    >
      <Image
        className={'w-[50px] h-[50px] rounded-xl'}
        source={{ uri: doctor.image }}
      />
      <View className={'flex flex-col space-y-1'}>
        <CustomText className={'text-xl text-black'}>{doctor.name}</CustomText>
        <CustomText>{doctor.specialization}</CustomText>
      </View>
    </TouchableOpacity>
  )
}

export default DoctorList
