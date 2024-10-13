import { View, Dimensions, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-gifted-charts'
import CustomText from './CustomText'

const demo = [
  { value: 10, label: 'Mon' },
  { value: 15, label: 'Tue' },
  { value: 10, label: 'Wed' },
  { value: 12, label: 'Thu' },
  { value: 20, label: 'Fri' },
  { value: 15, label: 'Sat' },
  { value: 18, label: 'Sun' }
]
const PatientsChart = ({ confirmedPatients }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // This effect will run whenever confirmedPatients is updated
    if (confirmedPatients.length > 0) {
      const today = new Date()
      const oneDay = 24 * 60 * 60 * 1000

      const dayCounts = Array(7).fill(0)

      confirmedPatients.forEach(appointment => {
        const appointmentDate = new Date(appointment.date)
        const timeDiff = today - appointmentDate

        if (timeDiff >= 0 && timeDiff < 7 * oneDay) {
          const dayIndex = appointmentDate.getDay()
          dayCounts[(dayIndex + 6) % 7]++
        }
      })

      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const data = dayCounts.map((value, index) => ({
        value,
        label: labels[index]
      }))

      setChartData(data)
    }
  }, [confirmedPatients])

  return (
    <View>
      <View>
        <CustomText
          style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}
        >
          Patients Chart
        </CustomText>
        {chartData.length > 0 ? (
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width - 24}
            height={250}
            minHeight={3}
            spacing={20}
            yAxisLabel=''
            isAnimated
            noOfSections={5}
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisInterval={5}
            barWidth={25}
            showGradient
            frontColor={'#3e6ae9'}
            gradientColor={'#FFEEFE'}
            roundedTop
          />
        ) : (
          <View
            className={
              'h-[250px] w-full flex felx-col items-center justify-center'
            }
          >
            <CustomText> No data.</CustomText>
          </View>
        )}
      </View>
    </View>
  )
}

export default PatientsChart
