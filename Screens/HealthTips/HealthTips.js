import { View, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tip from '../../Components/Tip'
//import healthTips from '../../Constants/healthtips.json'
import Header from '../../Components/Header'
import api from '../../Core/api'
const HealthTips = ({ navigation }) => {
  const [tips, setTips] = useState([])
  const fetchTips = async () => {
    try {
      const res = await api.get('healthtips/')
      setTips(res.data)
    } catch (err) {
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  useEffect(() => {
    fetchTips()
  }, [])
  return (
    <>
      <Header navigation={navigation} />
      <ScrollView
        style={{ height: Dimensions.get('screen').height }}
        className={'bg-neutral p-3 flex flex-col '}
      >
        <View className={'flex w-ull flex-col items-start mt-2 '}>
          {tips.map((tip, index) => (
            <Tip key={index} tip={tip} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default HealthTips
