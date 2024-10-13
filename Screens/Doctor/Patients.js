import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import PatientList from '../../Components/PatientList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import CustomText from '../../Components/CustomText'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet'
import api from '../../Core/api'
import useGlobal from '../../Core/global'
import SkeletonLoader from '../../Components/Skeletons/PatientListSkeleton'

const PatientFilterSheet = ({
  bottomSheetModalRef,
  onFilterSelect,
  selectedFilter
}) => {
  const snapPoints = useMemo(() => ['30%'], [])

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.5}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className={' w-full h-full p-3'}>
          <CustomText
            className={' text-xl w-full text-center'}
            style={{ fontFamily: 'NunitoSans-bold' }}
          >
            Filter Option
          </CustomText>

          <View
            className={
              'flex flex-row items-center space-x-2 justify-between my-5'
            }
          >
            {['All', 'Daily', 'Weekly'].map(option => (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                className={`flex-1 justify-center items-center px-4 py-4 rounded-2xl ${
                  selectedFilter === option
                    ? 'bg-blue-200/50'
                    : 'bg-gray-100/60'
                }`}
                onPress={() => onFilterSelect(option)}
              >
                <CustomText className={'text-xl'}>{option}</CustomText>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            className={`px-4 py-3 rounded-3xl w-full bg-primary `}
            activeOpacity={0.8}
            onPress={() => bottomSheetModalRef.current?.close()}
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-white text-center w-full text-[15px]'}
            >
              Apply
            </CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const Patients = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null)
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const { tokens } = useGlobal()

  const fetchPatients = async () => {
    try {
      const res = await api.get('doctor/patients/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setPatients(res.data)
      setFilteredPatients(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  const filterPatients = () => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000
    const oneWeek = 7 * oneDay

    let filtered = patients

    if (selectedFilter === 'Daily') {
      filtered = patients.filter(patient => {
        const appointmentDate = new Date(patient.date)
        return today - appointmentDate < oneDay
      })
    } else if (selectedFilter === 'Weekly') {
      filtered = patients.filter(patient => {
        const appointmentDate = new Date(patient.date)
        return today - appointmentDate < oneWeek
      })
    }

    setFilteredPatients(filtered)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    filterPatients()
  }, [selectedFilter, patients])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  //Reload
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      fetchPatients()
      setRefreshing(false)
    }, 2000)
  }, [])
  return (
    <View className={'bg-neutral flex-col flex-1'}>
      <View
        className={
          'w-full px-3 h-[45px] bg-white flex flex-row items-center justify-between'
        }
      >
        <TouchableOpacity
          activeOpacity={0.5}
          className={
            'flex-row items-center justify-center py-1 px-3 rounded-3xl space-x-2 bg-gray-200'
          }
          onPress={handlePresentModalPress}
        >
          <CustomText className={'text-[15px]'}>Filter</CustomText>
          <MaterialIcons name='keyboard-arrow-down' size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('DoctorSearch')}
        >
          <Feather name='search' size={25} color={'#7e7f82'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className={'w-full bg-neutral flex-col flex-1 py-3'}
      >
        {refreshing ? (
          <>
            {[...Array(10).keys()].map(index => (
              <SkeletonLoader key={index} />
            ))}
          </>
        ) : (
          <>
            {filteredPatients.map(patient => (
              <PatientList patient={patient} key={patient.id} />
            ))}
          </>
        )}
      </ScrollView>

      <PatientFilterSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onFilterSelect={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
    </View>
  )
}

const styles = {
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Patients
