import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'
import api from '../../Core/api'
import utils from '../../Core/utils'
import useGlobal from '../../Core/global'
const Register = ({ navigation }) => {
  const [userinfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })
  const { login } = useGlobal()
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle Name input
  const handleChangeFirstName = text => {
    setUserInfo(prev => ({ ...prev, first_name: text }))
    if (text.length === 0 || !text) {
      setFirstNameError('First Name is required!')
    } else {
      setFirstNameError('')
    }
  }
  const handleChangeLastName = text => {
    setUserInfo(prev => ({ ...prev, last_name: text }))
    if (text.length === 0 || !text) {
      setLastNameError('Last Name is required!')
    } else {
      setLastNameError('')
    }
  }

  // handle email input
  const handleChangeEmail = text => {
    setUserInfo(prev => ({ ...prev, email: text }))
    const emailPattern = /^\S+@\S+\.\S+$/
    if (!text || text.length === 0) {
      setEmailError('Email is required!')
    } else if (!emailPattern.test(text)) {
      setEmailError('Invalid email format!')
    } else {
      setEmailError('')
    }
  }

  // Handle password input
  const handleChangePassword = text => {
    setUserInfo(prev => ({ ...prev, password: text }))
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters!')
    } else {
      setPasswordError('')
    }
  }

  const isFormValid = () => {
    const isEmpty =
      !userinfo.first_name ||
      !userinfo.last_name ||
      !userinfo.email ||
      !userinfo.password
    const hasErrors =
      firstNameError || lastNameError || emailError || passwordError
    return !(isEmpty || hasErrors)
  }

  const handleRegister = async () => {
    setLoading(true)
    try {
      const res = await api.post('register/', userinfo)
      if (res.status === 201) {
        login(userinfo, res.data)
      }
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.message[0] : err.message
      )
    } finally {
      setLoading(false)
    }
  }
  const buttonBgClass = loading
    ? 'bg-primary/70'
    : isFormValid()
    ? 'bg-primary'
    : 'bg-gray-300'
  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='h-full p-5 w-full bg-white flex flex-col justify-between'>
            <View
              className={'h-auto flex-1 flex-col items-center justify-center '}
            >
              <Image
                source={require('../../assets/logo.png')}
                style={{ width: 50, height: 50 }}
              />
              <CustomText
                style={{ fontFamily: 'NunitoSans-bold' }}
                className={'text-3xl w-full text-center mt-10'}
              >
                Create Account
              </CustomText>
            </View>

            <View className={''}>
              <View className={'mt-5'}>
                <Input
                  label={'First Name'}
                  error={firstNameError}
                  action={handleChangeFirstName}
                  placeholder={'First name'}
                />
                <Input
                  label={'Last Name'}
                  error={lastNameError}
                  action={handleChangeLastName}
                  placeholder={'Last name'}
                />
                <Input
                  label={'Email'}
                  error={emailError}
                  action={handleChangeEmail}
                  placeholder={'you@self.com'}
                />
                <Input
                  isPass={true}
                  label={'Password'}
                  error={passwordError}
                  action={handleChangePassword}
                  placeholder={'create a password'}
                />
              </View>
              <View
                className={
                  'flex flex-col w-full items-center space-y-5 mt-[70px]'
                }
              >
                <TouchableOpacity
                  className={`px-4 py-3 rounded-xl ${buttonBgClass} w-full`}
                  activeOpacity={0.8}
                  onPress={isFormValid() ? handleRegister : null}
                  disabled={!isFormValid()}
                >
                  {loading ? (
                    <ActivityIndicator size='small' color='#FFF' />
                  ) : (
                    <CustomText
                      style={{ fontFamily: 'NunitoSans-bold' }}
                      className={'text-white text-center w-full text-[15px]'}
                    >
                      Create Account
                    </CustomText>
                  )}
                </TouchableOpacity>
                <View className={'flex flex-row w-full mb-10 space-x-2'}>
                  <CustomText className={'text-[15px]'}>
                    Already have an account?
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.8}
                  >
                    <CustomText
                      className={'text-[15px] text-primary underline'}
                    >
                      Login
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const homestyle = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }
})
export default Register
