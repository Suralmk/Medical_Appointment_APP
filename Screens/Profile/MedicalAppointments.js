import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  SafeAreaView,
  RefreshControl,
  Alert,
  ScrollView
} from 'react-native'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppointmentSkeletonLoader from '../../Components/Skeletons/AppointmentSkeleton'
const MedicalAppointments = ({ navigation }) => {
  const { tokens } = useGlobal()
  const [appointments, setAppointments] = useState([])
  const [refreshing, setRefreshing] = useState(true)
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
    } finally {
      setRefreshing(false)
    }
  }
  useEffect(() => {
    fetchAppointments()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      fetchAppointments()
      setRefreshing(false)
    }, 2000)
  }, [])
  return (
    <SafeAreaView
      className={'bg-neutral h-full flex flex-col justify-between '}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className={' bg-neutral flex-1 p-3'}
      >
        <View className={'flex-col space-y-5 rounded-xl '}>
          {refreshing ? (
            <>
              {[...Array(5).keys()].map(index => (
                <AppointmentSkeletonLoader key={index} />
              ))}
            </>
          ) : (
            <>
              {appointments?.length === 0 ? (
                <View
                  className={
                    ' bg-neutral flex-1 p-3 items-center justify-center'
                  }
                >
                  <CustomText className={'text-2xl'}>
                    No Appointment
                  </CustomText>
                </View>
              ) : (
                <>
                  {appointments.map((appointment, index) => (
                    <View
                      key={index}
                      className={
                        'flex flex-col bg-white p-2 shadow-md shadow-black/10 '
                      }
                    >
                      <CustomText className={' text-xl'}>
                        {appointment.doctor_name}
                      </CustomText>
                      <CustomText className={' '}>
                        Date: {appointment.date}
                      </CustomText>
                      <CustomText className={' '}>
                        {' '}
                        Time: {appointment.time}
                      </CustomText>
                      <CustomText className={' '}>
                        Case:{appointment?.caseInfo}
                      </CustomText>
                      <View
                        className={
                          'flex flex-row w-full items-center justify-end '
                        }
                      >
                        <CustomText
                          className={`p-1 px-4 text-center text-white rounded-xl ${
                            appointment.status == 'Pending'
                              ? 'bg-orange-300'
                              : appointment.status === 'Cancelled'
                              ? 'bg-red-400'
                              : appointment.status === 'Confirmed'
                              ? 'bg-blue-400'
                              : 'bg-green-500'
                          }`}
                        >
                          {appointment.status}
                        </CustomText>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MedicalAppointments
