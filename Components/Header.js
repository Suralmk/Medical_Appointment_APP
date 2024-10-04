import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Header = ({ navigation }) => {
  return (
    <View
      className={
        'w-full px-3 h-[45px] bg-neutral shadow-sm shadow-black flex flex-row items-center justify-between'
      }
    >
      <TouchableOpacity
        activeOpacity={0.5}
        className={'rounded-full'}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='arrow-back' size={30} color={'#373839'} />
      </TouchableOpacity>
    </View>
  )
}

export default Header
