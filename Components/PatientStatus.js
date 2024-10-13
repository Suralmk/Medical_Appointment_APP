import { View, Text } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
const PatientStatus = ({ status }) => {
  return (
    <View className={'flex flex-row justify-start'}>
      <CustomText
        className={`p-1 px-4 text-center text-white rounded-xl ${
          status == 'Pending'
            ? 'bg-orange-300'
            : status === 'Cancelled'
            ? 'bg-red-400'
            : status === 'Confirmed'
            ? 'bg-blue-400'
            : 'bg-green-500'
        }`}
      >
        {status}
      </CustomText>
    </View>
  )
}

export default PatientStatus
