import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import useGlobal from './Core/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Home from './Screens/Home'
import Appointment from './Screens/Appointment'
import Profile from './Screens/Profile'
import Pharmacy from './Screens/Pharmacy'
import Splash from './Screens/Splash'
import HealthTips from './Screens/HealthTips/HealthTips'
import Login from './Screens/Auth/Login'
import Register from './Screens/Auth/Register'
import Search from './Screens/Search'
import DoctorDetail from './Screens/DoctorDetail'
import Doctors from './Screens/Doctors'
import Support from './Screens/Support'
import TipDetail from './Screens/HealthTips/TipDetail'
import ResetPassword from './Screens/Auth/ResetPassword'
import DrugDetail from './Screens/Drugs/DrugDetail'
import MultiStepAppointmentForm from './Screens/Appointment'
import PersonalDetail from './Screens/Profile/PersonalDetail'
import HealthRecords from './Screens/Profile/HealthRecords'
import MedicalHistory from './Screens/Profile/MedicalHistory'
import MedicalAppointments from './Screens/Profile/MedicalAppointments'
// Home Stack Navigator
const Stack = createStackNavigator()
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='TabNavigator'
        component={TabsNavigator}
      />
      <Stack.Screen name='Doctors' component={Doctors} />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'containedModal'
        }}
        name='DoctorDetail'
        component={DoctorDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'containedModal'
        }}
        name='Search'
        component={Search}
      />
      <Stack.Screen
        options={{
          presentation: 'containedModal'
        }}
        name='Support'
        component={Support}
      />
      <Stack.Screen
        options={{
          presentation: 'modal'
        }}
        name='TipDetail'
        component={TipDetail}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false
        }}
        name='DrugDetail'
        component={DrugDetail}
      />
      <Stack.Screen
        options={{
          presentation: 'containedModal',
          headerShown: false
        }}
        name='PersonalDetail'
        component={PersonalDetail}
      />
      <Stack.Screen
        options={{
          presentation: 'containedModal',
          headerShown: false
        }}
        name='HealthRecords'
        component={HealthRecords}
      />
      <Stack.Screen
        options={{
          presentation: 'containedModal',
          headerShown: false
        }}
        name='MedicalHistory'
        component={MedicalHistory}
      />
      <Stack.Screen
        options={{
          presentation: 'containedModal',
          headerShown: false
        }}
        name='MedicalAppointments'
        component={MedicalAppointments}
      />
    </Stack.Navigator>
  )
}

// Bottom Tabs Navigator
const Tab = createMaterialBottomTabNavigator()

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true
      }}
      activeColor='#3e6ae9'
      inactiveColor='#3e2465'
      activeIndicatorStyle={{
        backgroundColor: 'fff',
        height: 40
      }}
      barStyle={{
        backgroundColor: '#fff',
        height: 75,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40
              }}
            >
              <SimpleLineIcons name='home' size={25} color={color} />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name='HealthTips'
        component={HealthTips}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40
              }}
            >
              <Fontisto name='heartbeat-alt' size={28} color={color} />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name='Appointment'
        component={MultiStepAppointmentForm}
        options={{
          tabBarLabel: '',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#3e6ae9',
                borderRadius: 35,
                bottom: 8
              }}
            >
              <MaterialIcons name='add' size={35} color={'#fff'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='Pharmacy'
        component={Pharmacy}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40
              }}
            >
              <MaterialIcons name='local-pharmacy' size={27} color={color} />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40
              }}
            >
              <Feather name='user' size={25} color={color} />
            </TouchableOpacity>
          )
        }}
      />
    </Tab.Navigator>
  )
}

// Main Navigator
const Navigator = () => {
  const { initialized, authenticated } = useGlobal()
  return (
    <NavigationContainer>
      {!initialized ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name='Splash'
            component={Splash}
          />
        </Stack.Navigator>
      ) : (
        <>
          {authenticated ? (
            <>
              <HomeStackNavigator />
            </>
          ) : (
            <>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='ResetPassword' component={ResetPassword} />
              </Stack.Navigator>
            </>
          )}
        </>
      )}
    </NavigationContainer>
  )
}

export default Navigator
