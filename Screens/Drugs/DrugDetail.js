import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import CustomText from '../../Components/CustomText'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native'
const DrugDetail = ({ navigation }) => {
  const route = useRoute()
  const { drug } = route.params
  const days_left = drug.expiry_status.days_left
  return (
    <>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      />

      <ScrollView
        style={{ height: Dimensions.get('screen').height }}
        className={'bg-neutral '}
      >
        <View className={'relative'}>
          <View className={'w-full h-[400px] object-contain'}>
            <Image
              style={{ objectFit: 'contain' }}
              className={'w-full h-full'}
              source={{ uri: drug.image }}
            />
          </View>

          {/* Back Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            className={
              'absolute bg-white px-3 py-2 rounded-full top-7 left-3 z-10'
            }
            style={{ position: 'absolute' }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='arrow-back' size={22} color={'black'} />
          </TouchableOpacity>
        </View>

        <View
          className={
            'p-3 py-5 bg-neutral  h-auto -top-[20px] rounded-t-3xl relative  overflow-hidden'
          }
        >
          <View
            className={
              'flex flex-col items-start justify-between space-y-2 flex-wrap'
            }
          >
            <CustomText
              style={{ fontFamily: 'NunitoSans-bold' }}
              className={'text-[25px] text-black'}
            >
              {drug.drug_name}
            </CustomText>
            <View
              className={`absolute h-[40px] w-[25px] right-0 top-0  rounded-b-lg ${
                days_left === 0
                  ? 'bg-red-600'
                  : days_left < 30 && days_left > 0
                  ? 'bg-orange-600'
                  : days_left < 150 && days_left > 30
                  ? 'bg-orange-400'
                  : days_left < 365 && days_left > 150
                  ? 'bg-[#808000]'
                  : days_left > 365
                  ? 'bg-green-700'
                  : ''
              } `}
            ></View>
          </View>

          <View className={'flex flex-col items-start space-y-2 flex-wrap'}>
            <CustomText className={'text-lg'}>{drug.category},</CustomText>
            <CustomText className={'text-lg'}>
              {drug.manufacturing_country}
            </CustomText>
          </View>
          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>
              Description
            </CustomText>
            <CustomText className={'text-[15px]'}>
              {drug.description}
            </CustomText>
          </View>

          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>
              Instruction
            </CustomText>
            <CustomText className={'text-[15px]'}>
              {drug.instructions}
            </CustomText>
          </View>

          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>Best Use</CustomText>
            <CustomText className={'text-[15px]'}>{drug.best_use}</CustomText>
          </View>
          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>Dates</CustomText>
            <CustomText className={'text-[15px]'}>
              Manufacturing date: {drug.manufacturing_date}
            </CustomText>
            <CustomText className={'text-[15px]'}>
              Expiry date: {drug.expiry_date}
            </CustomText>
            <CustomText className={'text-[15px]'}>
              Days Left {drug.expiry_status.days_left}
            </CustomText>
          </View>
          <View className={'mt-5 flex flex-col space-y-1'}>
            <CustomText className={'text-lg text-black'}>
              Information
            </CustomText>
            <CustomText className={'text-[15px]'}>
              Manufacturing date: {drug.brand}
            </CustomText>
            <CustomText className={'text-[15px]'}>
              Expiry date: {drug.batch_no}
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default DrugDetail
