import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import useGlobal from './Core/global'
import { useFonts } from 'expo-font'
import Navigator from './Navigator'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
export default function App () {
  const { loading, init, authenticated, initialized } = useGlobal()
  const [fontsLoaded] = useFonts({
    'NunitoSans-regular': require('./assets/fonts/NunitoSans_10pt_Condensed-Regular.ttf'),
    'NunitoSans-bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf')
  })

  // Ensure that the init function is called only if not initialized
  useEffect(() => {
    if (!initialized) {
      init()
    }
  }, [initialized])

  // Return null if fonts are not loaded
  if (!fontsLoaded) return null

  return (
    <>
        <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={80} color='black' />
              </View>
            )}
            <Navigator />
          </SafeAreaView>
      </BottomSheetModalProvider>
        </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  }
})
