import { View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import DoctorList from '../Components/DoctorList'
//import doctorsData from '../Constants/doctors.json'
import useGlobal from '../Core/global'
import api from '../Core/api'
const Doctors = () => {
  const { tokens } = useGlobal()
  const [doctors, setDoctors] = useState([])

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
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])
  return (
    <ScrollView className={'bg-neutral h-full  flex flex-col'}>
      <View className={'p-2'}>
        {doctors.map((doctor, index) => (
          <DoctorList key={index} doctor={doctor} />
        ))}
      </View>
    </ScrollView>
  )
}

export default Doctors
