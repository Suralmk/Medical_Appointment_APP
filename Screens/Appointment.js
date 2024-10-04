import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Step1 from './Appointment/Step1'
import Step2 from './Appointment/Step2'
import Step3 from './Appointment/Step3'
import Step4 from './Appointment/Step4'
import { useRoute } from '@react-navigation/native'
import useGlobal from '../Core/global'
const MultiStepAppointmentForm = ({ navigation }) => {
  const route = useRoute()
  const { doctor } = route?.params || {}
  const [currentStep, setCurrentStep] = useState(doctor ? 2 : 1)

  const { formData, setFormData, setSelectedDoctor } = useGlobal()

  useEffect(() => {
    if (doctor) {
      setFormData(prevData => ({
        ...prevData,
        doctor: doctor.id
      }))
      setSelectedDoctor(doctor)
      setCurrentStep(2)
    }
  }, [doctor])

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentStep === 1 && (
        <Step1
          navigation={navigation}
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          navigation={navigation}
          formData={formData}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
    </SafeAreaView>
  )
}

export default MultiStepAppointmentForm
