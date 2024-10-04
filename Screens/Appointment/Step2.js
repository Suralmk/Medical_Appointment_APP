import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import CustomText from '../../Components/CustomText'
import useGlobal from '../../Core/global'

const Step2 = ({ handleChange, handleNextStep, handlePreviousStep }) => {
  const { selectedDoctor, formData, setSelectedDoctor } = useGlobal()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  // Track selected date and time
  const [selectedDate, setSelectedDate] = useState(formData.date || new Date())
  const [selectedTime, setSelectedTime] = useState(formData.time || new Date())

  const onDateChange = (event, date) => {
    setShowDatePicker(false)
    if (date) {
      setSelectedDate(date)
      handleChange('date', date)
    }
  }

  const onTimeChange = (event, time) => {
    setShowTimePicker(false)
    if (time) {
      setSelectedTime(time)
      handleChange('time', time)
    }
  }

  // Helper function to convert time (12-hour format with AM/PM) to 24-hour format
  const convertTo24HourFormat = time12h => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')

    if (hours === '12') {
      hours = '00'
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12
    }

    return `${hours}:${minutes}`
  }

  // Function to check if the selected date is in the doctor's working days
  const isDateInSchedule = () => {
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long'
    })
    return selectedDoctor.work_schedule.days.includes(dayOfWeek)
  }

  // Function to check if the selected time is within the doctor's working hours
  const isTimeInSchedule = () => {
    const [startTime, endTime] = selectedDoctor.work_schedule.time.split(' - ')
    const start24 = convertTo24HourFormat(startTime)
    const end24 = convertTo24HourFormat(endTime)

    const selectedHour = selectedTime.getHours()
    const selectedMinute = selectedTime.getMinutes()
    const selected24 = `${selectedHour}:${
      selectedMinute < 10 ? '0' : ''
    }${selectedMinute}`

    return selected24 >= start24 && selected24 <= end24
  }

  const ValidateStep = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a Date')
      return false
    }

    if (!isDateInSchedule()) {
      Alert.alert('Error', "Selected date is not in doctor's working schedule")
      return false
    }

    if (!selectedTime) {
      Alert.alert('Error', 'Please select a Time')
      return false
    }

    if (!isTimeInSchedule()) {
      Alert.alert('Error', "Selected time is not within doctor's working hours")
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
        {/* Date Selection */}
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

        {/* Time Selection */}
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

        {/* Doctor's Working Schedule */}
        <View className={'flex-col space-y-3'}>
          <CustomText className={'w-full text-center text-lg'}>
            Work Time
          </CustomText>
          <CustomText className={'w-full text-center'}>
            {selectedDoctor.work_schedule.time}
          </CustomText>
          <View className={'w-full flex-row space-x-2'}>
            {selectedDoctor.work_schedule.days.map((day, index) => (
              <CustomText key={index} className={'w-full text-center'}>
                {day}
              </CustomText>
            ))}
          </View>
        </View>
      </View>

      {/* Next and Back Buttons */}
      <View
        className={'flex flex-row items-center space-x-5 w-full justify-center'}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedDoctor(null)
            handlePreviousStep()
          }}
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
