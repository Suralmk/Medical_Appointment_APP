import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DrugList from '../Components/DrugList'
//import drugs from '../Constants/medicalDrugs.json'
import useGlobal from '../Core/global'
import api from '../Core/api'
const Pharmacy = ({ navigation }) => {
  const { tokens } = useGlobal()
  const [drugs, setDrugs] = useState([])

  const [searched, setSearched] = useState('')

  const fetchDrugs = async () => {
    try {
      const res = await api.get('/pharmacy/drugs/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setDrugs(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  useEffect(() => {
    fetchDrugs()
  }, [])

  const filteredDrugs = drugs.filter(drug =>
    drug.drug_name.toLowerCase().includes(searched.toLowerCase())
  )

  return (
    <SafeAreaView className={'flex-1'}>
      <View
        className={'w-full flex flex-row items-center space-x-3 p-3 bg-neutral'}
      >
        <View
          className={
            'flex flex-row  flex-1 items-center space-x-2 px-4 py-2 bg-gray-200/70 border-[1px] rounded-xl border-gray-200/70'
          }
        >
          <EvilIcons name='search' size={25} color={'#7e7f82'} />

          <TextInput
            className={'bg-none flex-1'}
            selectionColor={'black'}
            placeholder='Search Drugs'
            onChangeText={text => setSearched(text)}
          />
        </View>
        <TouchableOpacity
          className={'px-3 py-3 rounded-xl bg-primary w-max'}
          activeOpacity={0.8}
        >
          <Ionicons name='filter-outline' color={'white'} size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ height: Dimensions.get('screen').height }}
        className={'bg-neutral p-3 pt-0'}
      >
        <View className={'flex flex-col items-start mt-3 justify-between'}>
          <View className={''}>
            {filteredDrugs.map((drug, index) => (
              <DrugList key={index} drug={drug} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Pharmacy
