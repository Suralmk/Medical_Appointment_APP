import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../Components/CustomText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import api from '../../Core/api'
import useGlobal from '../../Core/global'
import PatientsChart from '../../Components/PatientsChart'

function DoctorHome ({ navigation }) {
  const { tokens, user } = useGlobal()
  const [patients, setPatients] = useState([])
  const fetchPatients = async () => {
    try {
      const res = await api.get('doctor/patients/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setPatients(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const pendingPatients = patients.filter(
    patient => patient.status === 'Pending'
  )
  const confirmedPatients = patients.filter(
    patient => patient.status === 'Confirmed'
  )
  const cancelledPatients = patients.filter(
    patient => patient.status === 'Cancelled'
  )
  const completedPatients = patients.filter(
    patient => patient.status === 'Completed'
  )

  return (
    <ScrollView
      style={{ height: Dimensions.get('screen').height }}
      className={'bg-neutral p-3'}
    >
      <View className={'flex flex-row items-start mt-3 justify-between'}>
        <View className={'flex flex-col mb-[10px]'}>
          <CustomText className={' text-3xl'}>
            Welcome, Dr {user.user.first_name}!
          </CustomText>
          <View className={'flex flex-row items-center'}>
            <EvilIcons name='location' size={20} />
            <CustomText className={''}> Ethiopia</CustomText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Support')}
          className={'p-1 rounded-[10px]'}
        >
          <AntDesign name='customerservice' size={25} />
        </TouchableOpacity>
      </View>
      <View className={'w-full '}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('DoctorSearch')}
          className={
            'px-2 py-3 rounded-[10px] flex flex-row items-center bg-gray-200/70 space-x-2'
          }
        >
          <EvilIcons name='search' size={25} color={'#7e7f82'} />
          <CustomText className={'text-gray-500'}>Search Patients</CustomText>
        </TouchableOpacity>
      </View>
      <View>
        <PatientsChart confirmedPatients={confirmedPatients} />
        <View
          className={
            'flex flex-col space-y-3 items-center justify-between mt-5 pb-10'
          }
        >
          <View
            className={
              'p-2 h-[70px] bg-white w-full rounded-xl flex flex-row items-center space-x-3'
            }
          >
            <View
              className={
                'w-[60px] h-[60px] rounded-full bg-primary/10 flex flex-col items-center justify-center'
              }
            >
              <AntDesign name='like2' size={35} color='#3361dd' />
            </View>
            <View className={'flex-1'}>
              <CustomText className={'text-black text-xl'}>
                Confirmed Patients
              </CustomText>
              <CustomText className={'text-black '}>
                {confirmedPatients.length}
              </CustomText>
            </View>
          </View>
          <View
            className={
              'p-2 h-[70px] bg-white w-full rounded-xl flex flex-row items-center space-x-3'
            }
          >
            <View
              className={
                'w-[60px] h-[60px] rounded-full bg-orange-600/10 flex flex-col items-center justify-center'
              }
            >
              <AntDesign name='hourglass' size={35} color='#dd8533' />
            </View>
            <View className={'flex-1'}>
              <CustomText className={'text-black text-xl'}>
                Pedning Patients
              </CustomText>
              <CustomText className={'text-black '}>
                {pendingPatients.length}
              </CustomText>
            </View>
          </View>
          <View
            className={
              'p-2 h-[70px] bg-white w-full rounded-xl flex flex-row items-center space-x-3'
            }
          >
            <View
              className={
                'w-[60px] h-[60px] rounded-full bg-red-600/10 flex flex-col items-center justify-center'
              }
            >
              <AntDesign name='close' size={35} color='#dd3333' />
            </View>
            <View className={'flex-1'}>
              <CustomText className={'text-black text-xl'}>
                Cancelled Patients
              </CustomText>
              <CustomText className={'text-black '}>
                {cancelledPatients.length}
              </CustomText>
            </View>
          </View>
          <View
            className={
              'p-2 h-[70px] bg-white w-full rounded-xl flex flex-row items-center space-x-3'
            }
          >
            <View
              className={
                'w-[60px] h-[60px] rounded-full bg-green-600/10 flex flex-col items-center justify-center'
              }
            >
              <AntDesign name='check' size={35} color='#2e7c27' />
            </View>
            <View className={'flex-1'}>
              <CustomText className={'text-black text-xl'}>
                Completed Patients
              </CustomText>
              <CustomText className={'text-black '}>
                {completedPatients.length}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default DoctorHome
