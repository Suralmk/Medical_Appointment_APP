import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import CustomText from '../../Components/CustomText'
import api from '../../Core/api'
import useGlobal from '../../Core/global'
import utils from '../../Core/utils'
const Step4 = ({
  formData,
  handlePreviousStep,
  navigation,
  setCurrentStep
}) => {
  const { tokens, selectedDoctor } = useGlobal()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.post('appointments/', formData, {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })

      if (res.status === 201) {
        Alert.alert(
          'Success',
          'Appointment successfully created! \n \n Check and follow up from your Profile.'
        )
        navigation.navigate('Home')
        setCurrentStep(1)
      }
    } catch (err) {
      utils.log(err)
      const errorMessage =
        err.response?.data?.message[0] ||
        err.message ||
        'An unknown error occurred'
      Alert.alert('Error', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const [doctor, setDoctor] = useState('')
  const fetchDoctor = async () => {
    try {
      const res = await api.get(`doctors/${formData.doctor}`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`
        }
      })
      setDoctor(res.data)
    } catch (err) {
      console.log(err.response)
      Alert.alert(
        'Error',
        err.response ? err.response.data.detail : err.message
      )
    }
  }

  useEffect(() => {
    // fetchDoctor()
  }, [formData.doctor])

  return (
    <View className={'w-full flex-1 flex-col p-3 pt-5 bg-neutral'}>
      <CustomText
        className={'text-2xl'}
        style={{ fontFamily: 'NunitoSans-bold' }}
      >
        Confirm Appointment
      </CustomText>
      <View className={'flex-1 flex flex-col space-y-5 mt-5'}>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Doctor</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-[15px] rounded-xl bg-gray-100'}
          >
            {selectedDoctor?.name}
          </CustomText>
        </View>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Date and Time</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-[15px] rounded-xl bg-gray-100'}
          >
            {formData.date ? new Date(formData.date).toDateString() : 'N/A'} ,{' '}
            {formData.time.toLocaleTimeString()}
          </CustomText>
        </View>
        <View className={'flex flex-col space-y-2'}>
          <CustomText className={'text-[15px]'}>Phone Number</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-[15px] rounded-xl bg-gray-100'}
          >
            +251{formData.phone_no}
          </CustomText>
        </View>

        {formData?.caseInfo && (
          <View className={'flex flex-col space-y-2'}>
            <CustomText className={'text-[15px]'}>Case</CustomText>
            <CustomText
              className={'w-full px-4 py-2 text-[15px] rounded-xl bg-gray-100'}
            >
              {formData.caseInfo}
            </CustomText>
          </View>
        )}
      </View>

      <View
        className={'flex flex-row items-center space-x-5 w-full justify-center'}
      >
        <TouchableOpacity
          onPress={handlePreviousStep}
          className={'px-3 py-2 rounded-xl bg-white w-[120px]'}
          activeOpacity={0.8}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-primary w-full text-center'}
          >
            Back
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className={`px-3 py-2 rounded-xl w-[120px] ${
            loading ? 'bg-primary/70' : 'bg-primary'
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-neutral w-full text-center'}
          >
            {loading ? (
              <ActivityIndicator size='small' color='#FFF' />
            ) : (
              <CustomText
                style={{ fontFamily: 'NunitoSans-bold' }}
                className={'text-white text-center w-full text-[15px]'}
              >
                confirm
              </CustomText>
            )}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Step4
