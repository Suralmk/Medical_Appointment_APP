import React from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'

const HealthRecords = ({ navigation }) => {
  return (
    <SafeAreaView
      className={'bg-neutral h-full flex flex-col justify-between '}
    >
      <View className={' bg-neutral flex-1 p-3 items-center justify-center'}>
        <CustomText className={'text-2xl'}>No Records</CustomText>
      </View>
    </SafeAreaView>
  )
}

export default HealthRecords
