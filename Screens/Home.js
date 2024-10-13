import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  RefreshControl
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import CustomText from '../Components/CustomText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import DoctorList from '../Components/DoctorList'
import CategroyList from '../Components/CategroyList'
//import doctorsData from '../Constants/doctors.json'
import api from '../Core/api'
import useGlobal from '../Core/global'
import CategorySkeleton from '../Components/Skeletons/CategroySkeleton'
import DoctorSkeleton from '../Components/Skeletons/DcotorsSkeleton'
export default function Home ({ navigation }) {
  const { tokens, user } = useGlobal()
  const [doctors, setDoctors] = useState([])
  const [specialization, setSpecialization] = useState([])
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
    }
  }
  const fetchSpecialization = async () => {
    try {
      const res = await api.get('specializations/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setSpecialization(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  useEffect(() => {
    fetchDoctors()
    fetchSpecialization()
    setRefreshing(false)
  }, [])
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex(prevIndex => (prevIndex + 1) % doctors.length)
    }, 1200000)
    return () => clearInterval(interval)
  }, [doctors.length])
  const currentDoctor = doctors[currentDoctorIndex]

  const colors = [
    '#FF5733',
    '#3498DB',
    '#8E44AD',
    '#1ABC9C',
    '#F1C40F',
    '#E74C3C',
    '#2ECC71',
    '#34495E',
    '#ECF0F1',
    '#95A5A6'
  ]

  //Reload

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      fetchDoctors()
      fetchSpecialization()
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ height: Dimensions.get('screen').height }}
      className={'bg-neutral p-3'}
    >
      <View className={'flex flex-row items-start mt-3 justify-between'}>
        <View className={'flex flex-col mb-[10px]'}>
          <CustomText className={' text-3xl'}>
            Welcome, {user.user.first_name}!
          </CustomText>
          <View className={'flex flex-row items-center'}>
            <EvilIcons name='location' size={20} />
            <CustomText className={''}>Dessie, Ethiopia</CustomText>
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
          onPress={() => navigation.navigate('Search')}
          className={
            'px-2 py-3 rounded-[10px] flex flex-row items-center bg-gray-200/70 space-x-2'
          }
        >
          <EvilIcons name='search' size={25} color={'#7e7f82'} />
          <CustomText className={'text-gray-500'}>
            Search Doctor, Specialization
          </CustomText>
        </TouchableOpacity>
      </View>
      <View
        className={
          'bg-secondary h-[180px] rounded-xl mt-5 overflow-hidden relatives '
        }
      >
        <Image
          source={require('../assets/banner.webp')}
          className={'w-full h-full'}
        />

        <View
          className={
            'absolute z-10 right-5 bottom-10 flex flex-col space-y-1 items-end'
          }
        >
          <CustomText className={'text-2xl text-black '}>
            {currentDoctor?.name}
          </CustomText>
          <CustomText className={'text-lg text-black '}>
            {currentDoctor?.specialization}
          </CustomText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Appointment', {
                doctor: currentDoctor
              })
            }
            className={'px-3 py-2 rounded-xl bg-primary w-[100px]'}
            activeOpacity={0.8}
          >
            <CustomText className={'text- text-neutral w-full text-center '}>
              Schedule
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <View className={'h-auto rounded-xl mt-5 flex felx-col space-y-3'}>
        <CustomText className={'text-lg'}>Specialization</CustomText>
        <View className={'mt-5 flex flex-row  '}>
          {refreshing ? (
            <>
              {[...Array(10).keys()].map(index => (
                <CategorySkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              <FlatList
                data={specialization}
                renderItem={({ item, index }) => (
                  <CategroyList specialization={item} color={colors[index]} />
                )}
                keyExtractor={item => item.specialization}
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </View>
      </View>
      <View className={' h-auto rounded-xl mt-5'}>
        <View
          className={'w-full flex flex-row items-center justify-between mb-3'}
        >
          <CustomText className={'text-lg'}>Popular Doctors</CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Doctors')}
            activeOpacity={0.8}
          >
            <CustomText className={'text-[15px] text-primary'}>
              Seel All
            </CustomText>
          </TouchableOpacity>
        </View>

        <View>
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
      </View>
    </ScrollView>
  )
}
