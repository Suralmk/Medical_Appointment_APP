import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MedicalAppointments = ({ navigation }) => {
  const { tokens } = useGlobal()
  const [appointments, setAppointments] = useState([])

  const fetchAppointments = async () => {
    try {
      const res = await api.get('appointments/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setAppointments(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.message : err.message
      )
    }
  }
  useEffect(() => {
    fetchAppointments()
  }, [])
  return (
    <SafeAreaView
      className={'bg-neutral h-full flex flex-col justify-between '}
    >
      <View
        className={
          'w-full px-3 h-[50px] mt- bg-neutral  flex flex-row items-center justify-start space-x-3'
        }
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          className={' flex-col items-center justify-center bg-red'}
        >
          <AntDesign name='arrowleft' size={26} color={'black'} />
        </TouchableOpacity>
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-xl w-full text-start text-black'}
        >
          Appointments
        </CustomText>
      </View>
      {appointments?.length === 0 ? (
        <View className={' bg-neutral flex-1 p-3 items-center justify-center'}>
          <CustomText className={'text-2xl'}>No History</CustomText>
        </View>
      ) : (
        <ScrollView className={' bg-neutral flex-1 p-3'}>
          <View className={'flex-col space-y-5 rounded-xl '}>
            {appointments.map((appointment, index) => (
              <View
              key={index}
                className={
                  'flex flex-col bg-white p-2 shadow-md shadow-black/10 '
                }
              >
                <CustomText className={' text-lg'}>
                  {appointment.doctor}
                </CustomText>
                <CustomText className={' '}>{appointment.date}</CustomText>
                <CustomText className={' '}>{appointment.time}</CustomText>
                <CustomText className={' '}>{appointment?.caseInfo}</CustomText>
                <CustomText className={' '}>{appointment.status}</CustomText>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default MedicalAppointments
