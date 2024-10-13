import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'
const AddHealthRecord = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Health Record'
    })
  }, [navigation])
  return (
    <ScrollView className={'flex-1 bg-neutral '}>
      <View className={'flex-col p-3 pb-5'}>
        <Input
          label={'Symptoms'}
          multiple={true}
          numOfLine={5}
          placeholder={'Patient Symptoms'}
        />
        <Input
          label={'Diagnosis'}
          multiple={true}
          numOfLine={5}
          placeholder={'Diagnosis'}
        />
        <Input
          label={'Treatment Plan'}
          multiple={true}
          numOfLine={5}
          placeholder={'Treatment Plan'}
        />
        <TouchableOpacity
          className={`bg-gray-200/50 w-full p-3 rounded-lg mt-5`}
          activeOpacity={0.8}
        >
          <CustomText className={'text-gray-400 text-start w-full text-[15px]'}>
            Mecdication Drugs
          </CustomText>
        </TouchableOpacity>
        <Input label={'Dosage'} placeholder={'Medication Dosage'} />
        <TouchableOpacity
          className={`bg-gray-200/50 w-full p-3 rounded-lg mt-5`}
          activeOpacity={0.8}
        >
          <CustomText className={'text-gray-400 text-start w-full text-[15px]'}>
            Next Appointment Date
          </CustomText>
        </TouchableOpacity>
        <Input
          label={'Notes'}
          multiple={true}
          numOfLine={5}
          placeholder={'Notes'}
        />

        <TouchableOpacity
          className={`px-4 py-3 rounded-3xl w-full bg-primary mt-10 `}
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
    </ScrollView>
  )
}

export default AddHealthRecord
