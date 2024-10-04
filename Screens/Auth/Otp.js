import { View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'

const Otp = ({ navigation }) => {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  // Handle email input
  const handleChangeOTP = text => {
    setOtp(text)

    if (!otp) {
      setOtpError('OTP is required!')
    } else {
      setOtpError('')
    }
  }

  // Check if the form is valid (no errors and no empty fields)
  const isFormValid = !otpError && otp
  const handleVerifyOTP = () => {
    if (isFormValid) {
      console.log('Opt verification successful:')
      // Add your login logic here
    }
  }

  return (
    <View className={'bg-neutral h-screen  flex flex-col justify-start'}>
      <View className={'p-5'}>
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-3xl w-full text-center mt-10'}
        >
          Verify OTP
        </CustomText>
      </View>
      <View className={'p-5 pt-0 flex flex-col justify-between '}>
        <View className={' mt-5 flex flex-col space-y-10 '}>
          <Input
            label={'OTP'}
            error={otpError && otpError}
            action={handleChangeOTP}
            placeholder={'otp code'}
          />
        </View>

        <TouchableOpacity
          onPress={handleVerifyOTP}
          className={`px-4 py-3 mt-10 rounded-xl w-full ${
            isFormValid ? 'bg-primary' : 'bg-gray-300'
          }`}
          activeOpacity={0.8}
          disabled={!isFormValid}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-white text-center w-full text-[15px]'}
          >
            Verify
          </CustomText>
        </TouchableOpacity>
        <CustomText className={' mt-5 text-start w-full'}>
          Enter the password send to your email. It will expire after two
          minuites
        </CustomText>
      </View>
    </View>
  )
}

export default Otp
