import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'

const categoryMapping = {
  Dentist: <FontAwesome6 name='teeth' size={32} />,
  Internist: <Fontisto name='doctor' size={32} />,
  Dermatologist: <Fontisto name='doctor' size={32} />,
  Pediatrician: <FontAwesome6 name='baby' size={32} />,
  Gynacologist: <FontAwesome6 name='person-pregnant' size={32} />,
  ophtalmologist: <Ionicons name='glasses-outline' size={32} />,
  Oncologist: <FontAwesome6 name='heart-pulse' size={32} />
}
const CategroyList = ({ navigation, specialization, color }) => {
  return (
    <View
      className={
        'p-2 mr-3 bg-white flex flex-col items-center justify-center gap-1 h-[120px] w-[130px] rounded-xl shadow-sm shadow-black/50'
      }
    >
      <View
        style={{
          backgroundColor: `${color}20`
        }}
        className={'p-3 rounded-xl'}
      >
        <Fontisto name='doctor' size={32} color={color} />
      </View>

      <CustomText style={{ fontFamily: 'NunitoSans-bold' }}>
        {specialization.specialization}
      </CustomText>
    </View>
  )
}

export default CategroyList
