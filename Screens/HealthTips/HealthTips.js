import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Tip from '../../Components/Tip'
//import healthTips from '../../Constants/healthtips.json'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'
import useGlobal from '../../Core/global'
import TipSkeleton from '../../Components/Skeletons/TipSkeleton'
const HealthTips = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(true)
  const [tips, setTips] = useState([])
  const { user } = useGlobal()
  const fetchTips = async () => {
    try {
      const res = await api.get('healthtips/')
      setTips(res.data)
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
    fetchTips()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      fetchTips()
      setRefreshing(false)
    }, 2000)
  }, [])
  return (
    <>
      <View
        className={
          'w-full px-3 h-[45px] bg-white shadow-lg shadow-black flex flex-row items-center justify-between'
        }
      >
        <TouchableOpacity
          activeOpacity={0.5}
          className={' flex-col items-center justify-center px-2 rounded-3xl'}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' size={25} color={'#373839'} />
        </TouchableOpacity>
        {user.user.doctor && (
          <TouchableOpacity
            activeOpacity={0.5}
            className={' flex-col items-center justify-center px-2 rounded-3xl'}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name='plus' size={25} color={'#373839'} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: Dimensions.get('screen').height }}
        className={'bg-neutral p-0 flex flex-col '}
      >
        <View className={'flex w-ull flex-col items-start mt-2 '}>
          {refreshing ? (
            <>
              {[...Array(5).keys()].map(index => (
                <TipSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {tips.map((tip, index) => (
                <Tip key={index} tip={tip} />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </>
  )
}

export default HealthTips
