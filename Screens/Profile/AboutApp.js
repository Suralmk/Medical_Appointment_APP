import { View, Linking, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../Components/CustomText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'

const AboutApp = () => {
  const handleTelegram = () => {
    Linking.openURL('https://t.me/Surafel_is_here').catch(err =>
      console.error('Failed to open URL: ', err)
    )
  }

  const handleGithub = () => {
    Linking.openURL('https://github.com/Suralmk').catch(err =>
      console.error('Failed to open URL: ', err)
    )
  }

  const handleLinkedIn = () => {
    Linking.openURL(
      'https://www.linkedin.com/in/surafel-melaku-298421235/'
    ).catch(err => console.error('Failed to open URL: ', err))
  }

  const handleEmail = () => {
    Linking.openURL('mailto:surafelmelaku940@gmail.com').catch(err =>
      console.error('Failed to open email: ', err)
    )
  }

  return (
    <View className={'flex flex-col flex-1 bg-neutral'}>
      <View className={'flex flex-col items-center p-3 space-y-4'}>
        <View>
          <Image
            source={require('../../assets/me.webp')}
            className={'w-[150px] h-[150px] rounded-full'}
          />
        </View>

        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-xl text-center'}
        >
          Hello, I’m Surafel Melaku, the developer of this application.
        </CustomText>
        <CustomText className={'text-center text-[15px]'}>
          I welcome any suggestions or feedback you may have. Please feel free
          to reach out to me through the following links. Thank you for taking
          the time to check my project!
        </CustomText>
      </View>
      <View className={'flex flex-col space-y-3 w-full'}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleGithub}
          className={
            'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50'
          }
        >
          <AntDesign size={25} name='github' />
          <CustomText className={'text-lg'}>Suralmk</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLinkedIn}
          className={
            'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50'
          }
        >
          <AntDesign name='linkedin-square' size={25} color='#0077B5' />
          <CustomText className={'text-lg'}>Surafel Melaku</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleTelegram}
          className={
            'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50 '
          }
        >
          <Fontisto name='telegram' size={25} color='#0088CC' />
          <CustomText className={'text-lg'}>@Surafel_is_here</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleEmail}
          className={
            'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50 '
          }
        >
          <AntDesign name='mail' size={25} color='#DB4437' />
          <CustomText className={'text-lg'}>
            Email: surafelmelaku940@gmail.com
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AboutApp
