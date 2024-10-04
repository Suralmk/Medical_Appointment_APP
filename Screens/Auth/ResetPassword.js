import { View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [emailError, setEmailError] = useState('')

  // Handle email input
  const handleChangeEmail = text => {
    setEmail(text)
    const emailPattern = /^\S+@\S+\.\S+$/
    if (!emailPattern.test(text)) {
      setEmailError('Invalid email format!')
    } else {
      setEmailError('')
    }
  }

  // Check if the form is valid (no errors and no empty fields)
  const isFormValid = !emailError && email
  const handleResetPassword = () => {
    if (isFormValid) {
      console.log('Opt Send successful:')
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
          Reset Password
        </CustomText>
      </View>
      <View className={'p-5 pt-0 flex flex-col justify-between '}>
        <View className={' mt-5 flex flex-col space-y-10 '}>
          <Input
            label={'Email'}
            error={emailError && emailError}
            action={handleChangeEmail}
            placeholder={'you@self.com'}
          />
        </View>

        <TouchableOpacity
          onPress={handleResetPassword}
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
            Send OTP
          </CustomText>
        </TouchableOpacity>
        <CustomText className={' mt-5 text-start w-full'}>
          Enter the email associated with you account!
        </CustomText>
      </View>
    </View>
  )
}

export default ResetPassword
