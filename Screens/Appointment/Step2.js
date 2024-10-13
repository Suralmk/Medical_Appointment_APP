import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'
import utils from '../../Core/utils'
const Step2 = ({
  formData,
  handleChange,
  handleNextStep,
  handlePreviousStep
}) => {
  const { selectedDoctor } = useGlobal()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  // Track selected date and time
  const [selectedDate, setSelectedDate] = useState(formData.date)
  const [selectedTime, setSelectedTime] = useState(formData.time)

  const onDateChange = (event, date) => {
    setShowDatePicker(false)
    setSelectedDate(date)
    handleChange('date', date)
  }

  const onTimeChange = (event, time) => {
    setShowTimePicker(false)
    setSelectedTime(time)
    handleChange('time', time)
  }

  const ValidateStep = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a Date')
      return false
    }
    if (!selectedTime) {
      Alert.alert('Error', 'Please select a Time')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (ValidateStep()) {
      handleNextStep()
    }
  }
  return (
    <View className={'w-full flex-1 flex-col p-3 pt-5 bg-neutral'}>
      <CustomText
        className={'text-2xl'}
        style={{ fontFamily: 'NunitoSans-bold' }}
      >
        Select Appointment Date
      </CustomText>
      <View className={'flex-1 flex flex-col space-y-5 mt-5'}>
        <View className={'flex flex-col space-y-3'}>
          <CustomText className={'text-lg'}>Select Appointment Date</CustomText>
          <TouchableOpacity
            activeOpacity={0.8}
            className={
              'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50 mb-3'
            }
            onPress={() => setShowDatePicker(true)}
          >
            <CustomText>
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
            </CustomText>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode='date'
              display='spinner'
              onChange={onDateChange}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </View>
        <View className={'flex flex-col space-y-3'}>
          <CustomText className={'text-lg'}>Select Appointment Time</CustomText>
          <TouchableOpacity
            activeOpacity={0.8}
            className={
              'bg-white rounded-lg flex flex-row items-center space-x-2 px-3 py-3 shadow-sm shadow-black/50 mb-3'
            }
            onPress={() => setShowTimePicker(true)}
          >
            <CustomText>
              {selectedTime ? selectedTime.toLocaleTimeString() : 'Select Time'}
            </CustomText>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode='time'
              display='spinner'
              onChange={onTimeChange}
            />
          )}
        </View>
      </View>
      <View className={'flex-col space-y-3 flex-1'}>
        <CustomText className={'w-full text-center text-lg'}>
          Work Time
        </CustomText>
        <CustomText className={'w-full text-center'}>
          {selectedDoctor.work_schedule?.time || 'N/A'}{' '}
          {/* Display 'N/A' if time is not available */}
        </CustomText>
        <View className={'w-full flex-row space-x-2 justify-center'}>
          {Array.isArray(selectedDoctor.work_schedule?.days) &&
          selectedDoctor.work_schedule.days.length > 0 ? (
            selectedDoctor.work_schedule.days.map((day, index) => (
              <CustomText key={index} className={'w-max text-center'}>
                {day.trim()}
              </CustomText>
            ))
          ) : (
            <CustomText className={'w-full text-center'}>
              No available days
            </CustomText>
          )}
        </View>
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
          onPress={handleNext}
          className={`px-3 py-2 rounded-xl w-[120px] ${
            selectedDate && selectedTime ? 'bg-primary' : 'bg-gray-300'
          } w-[120px}`}
          activeOpacity={0.8}
          disabled={!selectedDate || !selectedTime}
        >
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-neutral w-full text-center'}
          >
            Next
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Step2
