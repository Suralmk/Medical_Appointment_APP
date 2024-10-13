import { View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PersonalDetail = ({ navigation }) => {
  const { user, logout } = useGlobal()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!user.user}
          onPress={() => {
            Alert.alert('Coming Soon', 'This feature will be added soon.')
          }}
          style={{ marginRight: 15 }}
        >
          <AntDesign name='edit' size={20} color='black' />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  return (
    <SafeAreaView className={'bg-neutral  flex-1 flex-col justify-between  '}>
      <View className={' bg-neutral flex-1 p-3'}>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Full Name</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {user.user.first_name} {user.user.last_name}
          </CustomText>
        </View>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Email</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {user.user.email}
          </CustomText>
        </View>

        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Last Login</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {new Date(user.user.last_login).toLocaleString()}
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => logout()}
        className={
          'bg-white rounded-2xl flex flex-row items-center space-x-2 px-7 py-2 shadow-sm shadow-black/50 w-full m-auto mb-5'
        }
      >
        <MaterialIcons name='logout' size={20} color='red' />
        <CustomText className={'text-lg text-red-600 '}>Logout</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PersonalDetail
