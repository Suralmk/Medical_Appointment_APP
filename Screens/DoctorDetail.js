import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native'
import React from 'react'
import CustomText from '../Components/CustomText'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native'
import useGlobal from '../Core/global'
const DoctorDetail = ({ navigation }) => {
  const route = useRoute()
  const { setSelectedDoctor } = useGlobal()
  const { doctor } = route.params
  const openTelegram = () => {
    const telegramUrl = 'tg://resolve?domain=surafel_is_here'

    Linking.canOpenURL(telegramUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(telegramUrl)
        } else {
          Alert.alert('Telegram is not installed')
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  const openPhoneApp = () => {
    const phoneNumber = 'tel:+251914719859'

    Linking.openURL(phoneNumber).catch(err =>
      Alert.alert('Error', 'Failed to show Phone number')
    )
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      />
      <ScrollView
        style={{ height: Dimensions.get('screen').height }}
        className={'bg-neutral'}
      >
        <View className={'relative'}>
          <Image
            className={'w-full h-[400px]'}
            source={{ uri: doctor.image }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className={
              'absolute bg-white px-3 py-2 rounded-full top-7 left-3 z-10'
            }
            style={{ position: 'absolute' }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='arrow-back' size={22} color={'black'} />
          </TouchableOpacity>
        </View>

        <View
          className={'p-3 py-5 bg-neutral h-auto -top-[20px] rounded-t-3xl'}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-[25px] text-black'}
          >
            {doctor.name}
          </CustomText>
          <CustomText className={'text-lg'}>{doctor.specialization}</CustomText>

          <View className={'mt-5 flex flex-col space-y-1'}>
            <View className={'flex flex-row space-x-2 items-center'}>
              <FontAwesome name='graduation-cap' size={20} color={'black'} />
              <CustomText className={'text-lg text-black'}>
                Education
              </CustomText>
            </View>
            <CustomText className={'text-[15px]'}>
              {doctor.education.degree} from {doctor.education.institution}.
            </CustomText>
            <CustomText className={'text-[15px]'}>
              Year: {doctor.education.graduation_year}
            </CustomText>
          </View>

          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>Work Time</CustomText>
            <CustomText className={'text-[15px]'}>
              {doctor.work_schedule.days.join(', ')}
            </CustomText>
            <CustomText className={'text-[15px]'}>
              {doctor.work_schedule.time}
            </CustomText>
          </View>

          <View className={'mt-5 flex flex-row space-x-5 items-center'}>
            <TouchableOpacity
              onPress={openPhoneApp}
              className={
                'px-[15px] py-3 rounded-[50px] bg-[#409d38] w-max  flex items-center justify-center flex-row'
              }
              activeOpacity={0.8}
            >
              <FontAwesome name='phone' size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openTelegram}
              className={
                'px-3 py-3 rounded-[50px] bg-[#24A1DE] w-max flex items-center justify-center flex-row'
              }
              activeOpacity={0.8}
            >
              <FontAwesome name='paper-plane' color={'white'} size={20} />
            </TouchableOpacity>
          </View>

          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>About</CustomText>
            <CustomText className={'text-[15px]'}>{doctor.about}</CustomText>
          </View>

          <TouchableOpacity
            className={'px-4 py-3 rounded-xl bg-primary w-full mt-5'}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedDoctor(doctor)
              navigation.navigate('Appointment', { doctor: doctor })
            }}
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-white text-center w-full text-[15px]'}
            >
              Schedule Appointment
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

export default DoctorDetail
