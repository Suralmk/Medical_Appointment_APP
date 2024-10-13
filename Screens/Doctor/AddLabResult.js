import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'
const AddLabResult = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Lab Result'
    })
  }, [navigation])
  return (
    <ScrollView className={' bg-neutral '}>
      <View className={'flex-col p-3 pb-5  justify-between  '}>
        <Input label={'Lab Test'} placeholder={'Labratory Test Name'} />
        <Input
          label={'Lab Result'}
          multiple={true}
          numOfLine={5}
          placeholder={'Labratory Result'}
        />
        <Input label={'Normal Range'} placeholder={'Normal Range'} />
        <TouchableOpacity
          className={`bg-gray-200/50 w-full p-3 rounded-lg mt-5`}
          activeOpacity={0.8}
        >
          <CustomText className={'text-gray-400 text-start w-full text-[15px]'}>
            Birth Date
          </CustomText>
        </TouchableOpacity>
        <View className={'flex-1 '}>
          <TouchableOpacity
            className={`px-4 py-3 rounded-3xl w-full bg-primary mt-16 `}
            activeOpacity={0.8}
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-white text-center w-full text-[15px]'}
            >
              Save
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default AddLabResult
