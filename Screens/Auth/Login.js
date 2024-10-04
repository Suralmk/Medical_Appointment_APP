import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
  SafeAreaView
} from 'react-native'
import React, { useState, useRef } from 'react'
import CustomText from '../../Components/CustomText'
import Input from '../../Components/Input'
import api from '../../Core/api'
import useGlobal from '../../Core/global'

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current

  const [userinfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { login } = useGlobal()
  // Handle email input
  const handleChangeEmail = text => {
    setUserInfo(prev => ({ ...prev, email: text }))
    const emailPattern = /^\S+@\S+\.\S+$/
    if (!emailPattern.test(text)) {
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

  // Check if the form is valid (no errors and no empty fields)
  const isFormValid =
    !emailError && !passwordError && userinfo.email && userinfo.password

  const handleLogin = async () => {
    setLoading(true)
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true
    }).start()
    if (isFormValid) {
      try {
        const res = await api.post('login/', userinfo)
        if (res.status === 200) {
          login(userinfo, res.data)
        }
      } catch (err) {
        Alert.alert(
          'Error',
          err.response ? err.response.data.detail : err.message
        )
      }
      setLoading(false)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
  }
  const buttonBgClass = loading
    ? 'bg-primary/70'
    : isFormValid
    ? 'bg-primary'
    : 'bg-gray-300'
  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='h-full p-5 w-full bg-white flex flex-col '>
            <View
              className={'h-auto flex- flex-col items-center justify-center '}
            >
              <Image
                source={require('../../assets/logo.png')}
                style={{ width: 50, height: 50 }}
              />
              <CustomText
                style={{ fontFamily: 'NunitoSans-bold' }}
                className={'text-3xl w-full text-center mt-10'}
              >
                Login
              </CustomText>
            </View>

            <View className={'flex-col justify-between flex-1'}>
              <View className={''}>
                <Input
                  label={'Email'}
                  error={emailError}
                  action={handleChangeEmail}
                  placeholder={'you@self.com'}
                  value={userinfo.email}
                />
                <Input
                  isPass={true}
                  label={'Password'}
                  error={passwordError}
                  action={handleChangePassword}
                  placeholder={'Min 8 characters'}
                  value={userinfo.password}
                />
                <View className={'flex flex-row w-full justify-end mt-5'}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                    activeOpacity={0.8}
                  >
                    <CustomText className={'text-[15px]'}>
                      Forgot Password?
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <View
                className={
                  'flex flex-col w-full items-center space-y-5 mt-[70px]'
                }
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  className={`px-4 py-3 rounded-xl w-full ${buttonBgClass}`}
                  activeOpacity={0.8}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <ActivityIndicator size='small' color='#FFF' />
                  ) : (
                    <CustomText
                      style={{ fontFamily: 'NunitoSans-bold' }}
                      className={'text-white text-center w-full text-[15px]'}
                    >
                      Login
                    </CustomText>
                  )}
                </TouchableOpacity>

                <View className={'flex flex-row w-full mb-10 space-x-2'}>
                  <CustomText className={'text-[15px]'}>
                    Don't have an account?
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    activeOpacity={0.8}
                  >
                    <CustomText
                      className={'text-[15px] text-primary underline'}
                    >
                      Create new account
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

export default Login
