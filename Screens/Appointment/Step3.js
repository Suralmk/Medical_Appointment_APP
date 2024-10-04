import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'
import useGlobal from '../../Core/global'
const Step3 = ({ handleChange, handleNextStep, handlePreviousStep }) => {
  const [phone_no, setPhoneNumber] = useState('')
  const [phoneNoError, setPhoneNoError] = useState('')

  const onPhoneNumberChange = text => {
    const filteredText = text.replace(/[^0-9]/g, '').slice(0, 9)
    setPhoneNumber(filteredText)
    handleChange('phone_no', filteredText)
  }

  const onCaseChange = text => {
    handleChange('caseInfo', text)
  }

  const ValidateStep = () => {
    const phoneRegex = /^\+?1?[79]\d{8}$/

    if (!phone_no) {
      setPhoneNoError('Please Enter Phone Number')
      return false
    } else if (!phoneRegex.test(phone_no)) {
      setPhoneNoError('Enter a valid Phone Number!')
      return false
    } else {
      setPhoneNoError('')
    }

    return true
  }

  const handleNext = () => {
    if (ValidateStep()) {
      handleNextStep()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={'w-full flex-1 flex-col p-3 pt-5 bg-neutral'}>
        <CustomText
          className={'text-2xl'}
          style={{ fontFamily: 'NunitoSans-bold' }}
        >
          Personal Information
        </CustomText>
        <View className={'flex-1 flex flex-col space-y-5 mt-5'}>
          <View className={'flex flex-col space-y-3'}>
            <View className={'flex flex-row items-center justify-between'}>
              <CustomText className={'text-lg'}>Phone Number</CustomText>
              {phoneNoError && (
                <CustomText className={'text-[15px] text-red-600'}>
                  {phoneNoError}
                </CustomText>
              )}
            </View>
            <View
              className={'flex items-center flex-row rounded-xl'}
              style={{
                borderWidth: 1,
                borderColor: '#ccc'
              }}
            >
              <CustomText
                style={{ textAlignVertical: 'center' }}
                className={'text-lg px-3 h-full bg-gray-200/80'}
              >
                +251
              </CustomText>
              <View className={'px-4 py-3 flex-1 '}>
                <TextInput
                  onChangeText={onPhoneNumberChange}
                  placeholder='Enter Phone Number'
                  keyboardType='phone-pad'
                  selectionColor={'black'}
                  maxLength={9}
                  className={'w-fill'}
                />
              </View>
            </View>
          </View>
          <View className={'flex flex-col space-y-3'}>
            <CustomText className={'text-lg'}>Case (optional)</CustomText>
            <View>
              <TextInput
                onChangeText={onCaseChange}
                placeholder='Case Information'
                multiline
                numberOfLines={5}
                selectionColor={'black'}
                className={'px-4 py-3 rounded-xl'}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  textAlignVertical: 'top'
                }}
              />
            </View>
          </View>
        </View>

        <View
          className={
            'flex flex-row items-center space-x-5 w-full justify-center'
          }
        >
          <TouchableOpacity
            onPress={handlePreviousStep}
            className={'px-3 py-2 rounded-xl bg-white w-[120px]'}
            activeOpacity={0.8}
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-primary w-full text-center'}
            >
              Back
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            className={`px-3 py-2 rounded-xl w-[120px] ${
              phone_no ? 'bg-primary' : 'bg-gray-300'
            }`}
            activeOpacity={0.8}
            disabled={!phone_no}
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-neutral w-full text-center'}
            >
              Next
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Step3
