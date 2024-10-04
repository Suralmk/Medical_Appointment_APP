import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import api from '../../Core/api'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PersonalDetail = ({ navigation }) => {
  const { user } = useGlobal()

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
          Personal Details
        </CustomText>
      </View>
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
    </SafeAreaView>
  )
}

export default PersonalDetail
