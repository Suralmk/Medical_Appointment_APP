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
      <View
        className={
          'w-full px-3 h-[50px] mt- bg-neutral  flex flex-row items-center justify-start space-x-3'
        }
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          className={' flex-col items-center justify-center bg-red'}
        >
          <AntDesign name='arrowleft' size={26} color={'black'} />
        </TouchableOpacity>
        <CustomText
          style={{ fontFamily: 'NunitoSans-bold' }}
          className={'text-xl w-full text-start text-black'}
        >
          Health Records
        </CustomText>
      </View>
      <View className={' bg-neutral flex-1 p-3 items-center justify-center'}>
        <CustomText className={'text-2xl'}>No Records</CustomText>
      </View>
    </SafeAreaView>
  )
}

export default HealthRecords
