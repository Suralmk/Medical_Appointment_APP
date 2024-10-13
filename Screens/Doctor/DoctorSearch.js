import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import PatientList from '../../Components/PatientList'
const DoctorSearch = ({ navigation }) => {
  const searchRef = useRef()
  const [searched, setSearched] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const { tokens } = useGlobal()

  const handleSearch = async () => {
    try {
      const res = await api.get(`doctor/patients/search/?search=${searched}`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setSearchResult(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])
  useEffect(() => {
    handleSearch()
  }, [searched])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={'bg-neutral h-full  flex flex-col justify-between p-3 py-2'}
      >
        <View className={'flex-row space-x-2 w-full '}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            className={' flex-col items-center justify-center px-2 rounded-3xl'}
          >
            <AntDesign name='arrowleft' size={19} color={'black'} />
          </TouchableOpacity>
          <View
            className={
              'flex flex-row flex-1 items-center space-x-2 px-4 py-1 bg-gray-200/70 border-[1px] rounded-xl border-gray-200/70'
            }
          >
            <EvilIcons name='search' size={25} color={'#7e7f82'} />

            <TextInput
              ref={searchRef}
              className={'bg-none flex-1 text-[13px]'}
              selectionColor={'black'}
              placeholder='Search Your Ptients'
              onChangeText={text => setSearched(text)}
            />
          </View>
        </View>
        <View className={' flex-1 flex items-center justify-center mt-3'}>
          {!searched ? (
            <View
              className={'flex fle-co items-center justify-center space-x-3'}
            >
              <EvilIcons name='search' size={120} color={'#7e7f82'} />

              <CustomText className={'text-2xl w-full text-center mb-10]'}>
                Search
              </CustomText>
            </View>
          ) : searchResult.length === 0 ? (
            <View
              className={'flex fle-co items-center justify-center space-x-3'}
            >
              <MaterialIcons
                name='error-outline'
                size={120}
                color={'#7e7f82'}
              />
              <CustomText className={'text-2xl w-full text-center mb-10]'}>
                No Result
              </CustomText>
            </View>
          ) : (
            <ScrollView className={'flex-1 w-full'}>
              {searchResult.map((patient, index) => (
                <PatientList key={index} patient={patient} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DoctorSearch
