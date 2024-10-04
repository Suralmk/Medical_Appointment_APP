import { View, TouchableOpacity, Alert, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import CustomText from '../../Components/CustomText'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
const Step1 = ({ navigation, handleChange, handleNextStep }) => {
  const [doctors, setDoctors] = useState([])
  const { selectedDoctor, setSelectedDoctor } = useGlobal()
  const { tokens } = useGlobal()

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

  const handleDoctorSelect = doctor => {
    setSelectedDoctor(doctor)
    handleChange('doctor', doctor.id)
  }

  const ValidateStep = () => {
    if (!selectedDoctor) {
      Alert.alert('Error', 'Please select a doctor')
      return
    }
    handleNextStep()
  }

  return (
    <View className='bg-neutral p-3 pt-5 flex-1'>
      <CustomText
        className={'text-2xl'}
        style={{ fontFamily: 'NunitoSans-bold' }}
      >
        Select Doctor
      </CustomText>
      <ScrollView className='flex-1 '>
        <View className={'flex flex-col mt-5'}>
          {doctors.map(doctor => (
            <TouchableOpacity
              key={doctor.id}
              activeOpacity={0.8}
              onPress={() => handleDoctorSelect(doctor)}
              className={`w-full p-2 rounded-lg bg-white flex flex-row items-center  space-x-5 mb-3 shadow-gray-500/70 shadow-xl ${
                selectedDoctor?.id === doctor.id
                  ? 'border border-gray-300  bg-gray-300/20'
                  : ''
              }`}
            >
              <Image
                className='w-[50px] h-[50px] rounded-xl'
                source={{ uri: doctor.image }}
              />
              <View className='flex flex-col space-y-1 flex-1'>
                <CustomText className='text-xl text-black'>
                  {doctor.name}
                </CustomText>
                <CustomText>{doctor.specialization}</CustomText>
              </View>
              <TouchableOpacity
                className={
                  'bg-gray-200 p-2 rounded-full flex-row items-center justify-center'
                }
                onPress={() =>
                  navigation.navigate('DoctorDetail', { doctor: doctor })
                }
              >
                <SimpleLineIcons name='arrow-right' size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={ValidateStep}
        disabled={!selectedDoctor}
        className={`px-3 py-2 rounded-xl w-[150px] m-auto ${
          selectedDoctor ? 'bg-primary' : 'bg-gray-300'
        }`}
        activeOpacity={0.8}
      >
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className='text-neutral text-center'
        >
          Next
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default Step1
