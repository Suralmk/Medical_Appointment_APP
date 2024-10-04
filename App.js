import { StyleSheet, View, ActivityIndicator, SafeAreaView } from 'react-native'
import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import useGlobal from './Core/global'
import { useFonts } from 'expo-font'
import Navigator from './Navigator'
import React, { useEffect } from 'react'

export default function App () {
  const { loading, init, authenticated, initialized } = useGlobal()
  const [fontsLoaded] = useFonts({
    'NunitoSans-regular': require('./assets/fonts/NunitoSans_10pt_Condensed-Regular.ttf'),
    'NunitoSans-bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf')
  })

  // Ensure that the init function is called only if not initialized
  useEffect(() => {
    init()

  }, [])

  // Return null if fonts are not loaded
  if (!fontsLoaded) return null
  return (
    <>
      {loading && (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size={80} color='black' />
        </SafeAreaView>
      )}
      <StatusBar barStyle='dark-content' backgroundColor='#F8F9FA' />
      <Navigator />
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  }
})
