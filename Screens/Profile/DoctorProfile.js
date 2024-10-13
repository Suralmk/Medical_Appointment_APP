import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'
const DoctorProfile = ({ navigation }) => {
  const { tokens } = useGlobal()
  const [doctor, setDoctor] = useState({})
  const fetchDoctor = async () => {
    try {
      const res = await api.get(`doctor/profile/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setDoctor(res.data)
    } catch (err) {
      console.log(err.response)
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }
  useEffect(() => {
    fetchDoctor()
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!doctor}
          onPress={() => {}}
          style={{ marginRight: 15 }}
        >
          <AntDesign name='edit' size={20} color='black' />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  return (
    <SafeAreaView
      className={'bg-neutral h-full  flex flex-col justify-between '}
    >
      <ScrollView className={' bg-neutral flex-2 p-3 space-y-3 flex-col'}>
        <View
          className={
            'w-full  rounded-xl h-max flex-row items-center space-x-10'
          }
        >
          <Image
            className={'w-[100px] h-[100px] rounded-full'}
            source={{ uri: doctor?.image }}
          />

          <View className={'flex flex-col space-y'}>
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-xl'}
            >
              {doctor.name}
            </CustomText>
            <CustomText className={'text-'}>{doctor.specialization}</CustomText>
            <CustomText className={'text-'}>ID {doctor.id}</CustomText>
          </View>
        </View>

        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-lg'}>Contact</CustomText>

          <View
            className={
              'w-full px-4 py-2 text-lg rounded-xl bg-gray-100 space-y-2'
            }
          >
            <CustomText className={'text-lg'}>
              +251-{doctor.contact?.phone}
            </CustomText>
            <CustomText className={'text-lg'}>
              @{doctor.contact?.telegram}
            </CustomText>
          </View>
        </View>

        {/* Contact */}
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-lg'}>Education</CustomText>

          <View
            className={
              'w-full px-4 py-2 text-lg rounded-xl bg-gray-100 space-y-2'
            }
          >
            <CustomText className={'text-lg'}>
              {doctor.education?.degree}
            </CustomText>
            <CustomText className={'text-lg'}>
              {doctor.education?.institution}
            </CustomText>
            <CustomText className={'text-lg'}>
              {doctor.education?.graduation_year} GC
            </CustomText>
          </View>
        </View>

        {/* Work Schedule */}
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-lg'}>Work Schedule</CustomText>

          <View
            className={
              'w-full px-4 py-2 text-lg rounded-xl bg-gray-100 space-y-2'
            }
          >
            <View className={'flex-row w-full text-start '}>
              {doctor.work_schedule?.days.map((day, index) => (
                <CustomText className={'text-lg'} key={index}>
                  {day}{' '}
                </CustomText>
              ))}
            </View>

            <CustomText className={'text-lg'}>
              {doctor.work_schedule?.time}
            </CustomText>
          </View>
        </View>

        <View className={'flex flex-col space-y-2 '}>
          <CustomText className={'text-lg'}>Location</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {doctor.location ? doctor.location : '-----'}
          </CustomText>
        </View>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-lg'}>Birth Date</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {doctor.birth_date ? doctor.birth_date : '-----'}
          </CustomText>
        </View>
        <View className={'flex flex-col space-y-2 mb-10'}>
          <CustomText className={'text-[15px]'}>About</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {doctor.about ? doctor.about : '-----'}
          </CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DoctorProfile
