import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomText from './CustomText'
import Feather from 'react-native-vector-icons/Feather'

const Input = ({
  isPass,
  action,
  error,
  label,
  multiple,
  numOfLine,
  placeholder
}) => {
  const [showPass, setShowPass] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={'mt-5'}>
      <View className={'flex flex-row items-center justify-between mb-1'}>
        <CustomText className={' text-[15px]'}>{label}</CustomText>
        {error && (
          <CustomText className={'text-red-600 text-[15px]'}>
            {error}
          </CustomText>
        )}
      </View>
      <View
        className={`flex flex-row items-center justify-between bg-gray-200/50 w-full p-3 rounded-lg ${
          isFocused
            ? 'border-[1px] border-gray-500/50'
            : error
            ? 'border-[1px] border-red-600'
            : 'border border-transparent'
        }`}
      >
        <TextInput
          secureTextEntry={showPass ? true : false}
          className={'flex-1 placeholder:text-[15px]'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor='black'
          multiline={multiple ? true : false}
          numberOfLines={multiple && numOfLine ? numOfLine : 1}
          style={{ textAlignVertical: 'top', fontFamily: 'NunitoSans-regular' }}
          placeholder={placeholder}
          onChangeText={text => action(text)}
        />
        {isPass && (
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass)
            }}
          >
            <Feather
              size={23}
              name={showPass ? 'eye' : 'eye-off'}
              color={'gray'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Input
