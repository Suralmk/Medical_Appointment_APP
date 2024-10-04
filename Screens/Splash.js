import { View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import CustomText from '../Components/CustomText'
const Splash = () => {
  return (
    <SafeAreaView
      className={
        'h-screen  flex flex-col items-center justify-center bg-neutral'
      }
    >
      <Image source={require('../assets/logo.png')} className={'w-[100px] h-[100px]'} />
      <CustomText className={'text-3xl text-primary mt-5'}>DocSync</CustomText>
    </SafeAreaView>
  )
}

export default Splash
