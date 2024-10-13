import { View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Input from '../Components/Input'
import CustomText from '../Components/CustomText'
const Support = () => {
  const [message, setMessage] = useState()

  const [messageError, setMessageError] = useState()

  const handleChnage = text => {
    setUserInfo({ ...prev, email: text })
  }

  return (
    <View className={'bg-neutral h-full  flex flex-col justify-between'}>
      <View className={'p-5'}>
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-2xl w-full text-center mb-10]'}
        >
          How Can We help?
        </CustomText>
      </View>
      <View className={'p-5  pt-0 flex flex-col justify-between flex-1'}>
        <View className={' mt-10 flex flex-col space-y-5 flex-1'}>
          <Input
            label={'Message'}
            error={messageError && messageError}
            action={handleChnage}
            multiple={true}
            numOfLine={10}
          />

          <CustomText className={' text-start w-full text-[15px]'}>
            We will Respond to you with in 12-24 hours in Monday-Friday Via
            Email,
          </CustomText>
        </View>

        <TouchableOpacity
          className={'px-4 py-3 rounded-xl bg-primary w-full'}
          activeOpacity={0.8}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-white text-center w-full text-[15px]'}
          >
            Submit
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Support
