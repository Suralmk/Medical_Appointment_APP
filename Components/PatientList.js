import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation } from '@react-navigation/native'

const PatientList = ({ patient }) => {
  const navigation = useNavigation()

  const palceholderImageMale =
    'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq.jpg'
  const placeHolderImaeFemale =
    'https://cdn.vectorstock.com/i/1000x1000/98/45/person-gray-photo-placeholder-woman-vector-23519845.webp'
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PatientDetail', { patient: patient })}
      className={
        'w-full p-3 px-4 rounded-lg bg-white flex flex-row items-center space-x-5 mb-3 shadow-sm shadow-black/50'
      }
    >
      <Image
        className={'w-[60px] h-[60px] rounded-xl'}
        source={{ uri: placeHolderImaeFemale }}
      />
      <View className={'flex flex-col space-y-'}>
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-xl text-black'}
        >
          {patient.name}
        </CustomText>
        <CustomText>+251 {patient.phone_no}</CustomText>
        <CustomText>{patient.date}, {patient.time}</CustomText>
      </View>
    </TouchableOpacity>
  )
}

export default PatientList
