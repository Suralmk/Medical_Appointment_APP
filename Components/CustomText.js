import React from 'react'
import { Text, StyleSheet } from 'react-native'
const CustomText = ({ className, style, children, ...props }) => {
  return (
    <Text className={className} style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'NunitoSans-regular',
    width: 'auto',
    color: '#2c2d2e'
  }
})

export default CustomText
