import { View, ScrollView, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import DoctorList from '../Components/DoctorList'
//import doctorsData from '../Constants/doctors.json'
import useGlobal from '../Core/global'
import api from '../Core/api'
import DoctorSkeleton from '../Components/Skeletons/DcotorsSkeleton'
const Doctors = () => {
  const { tokens } = useGlobal()
  const [doctors, setDoctors] = useState([])
  const [refreshing, setRefreshing] = useState(true)

  const fetchDoctors = async () => {
    try {
      const res = await api.get('doctors/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setDoctors(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  //Reload

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      fetchDoctors()
      setRefreshing(false)
    }, 2000)
  }, [])
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className={'bg-neutral h-full  flex flex-col'}
    >
      <View className={'p-2'}>
        {refreshing ? (
          <>
            {[...Array(10).keys()].map(index => (
              <DoctorSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {doctors.map((doctor, index) => (
              <DoctorList key={index} doctor={doctor} />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default Doctors
