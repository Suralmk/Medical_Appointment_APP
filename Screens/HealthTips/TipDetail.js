import { View, ScrollView, Dimensions, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import { useRoute } from '@react-navigation/native'
const TipDetail = ({ navigation }) => {
  const route = useRoute()

  const { tip } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: tip.title
    })
  }, [navigation, tip.title])

  return (
    <ScrollView style={{ flex: 1 }} className={'bg-neutral '}>
      <View className={'flex flex-col items-start justify-between p-5 '}>
        <Image
          source={{ uri: tip.image }}
          className={'w-full h-[350px] rounded-xl mb-5'}
        />
        <CustomText
          className={'text-2xl'}
          style={{ fontFamily: 'NunitoSans-bold' }}
        >
          {tip.title}
        </CustomText>
        <CustomText className={'text-[15px]'}>{tip.doctor_name}</CustomText>
        <View className={'flex flex-col space-y-5 mt-5 '}>
          {tip.content.map((tip, index) => (
            <CustomText className={'text-lg'} key={index}>
              {tip.content}
            </CustomText>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default TipDetail
