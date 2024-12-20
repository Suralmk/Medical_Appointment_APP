import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation } from '@react-navigation/native'
const Tip = ({ tip }) => {
  const navigation = useNavigation()
  return (
    <View
      className={
        'bg-white rounded-xl w-full h-auto mb-8 shadow-lg shadow-black '
      }
    >
      <View className={'bg- rounded-xl p-3 flex flex-col space-y-3  w-full'}>
        <CustomText
          className={'text-xl'}
          style={{ fontFamily: 'NunitoSans-bold' }}
        >
          {tip.title}
        </CustomText>
        <CustomText className={'text-lg'}>
          {tip.content[0].content.substring(0, 100) +
            (tip.content[0].content.length > 100 ? '...' : '')}
        </CustomText>
        <TouchableOpacity
          onPress={() => navigation.navigate('TipDetail', { tip: tip })}
        >
          <CustomText className={'text-lg text-primary'}> Read More</CustomText>
        </TouchableOpacity>
        <CustomText className={'text-lg'}>Dr. {tip.doctor_name}</CustomText>
      </View>

      <Image
        className={'w-full min-h-[300px] rounded-xl object-contain'}
        source={{ uri: tip.image }}
      />
    </View>
  )
}

export default Tip
