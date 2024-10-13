import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Header = ({ navigation }) => {
  return (
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
    </View>
  )
}

export default Header
