import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Switch
} from 'react-native'
import React, {
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
  useState
} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomText from '../../Components/CustomText'
import { useRoute } from '@react-navigation/native'
import PatientStatus from '../../Components/PatientStatus'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet'
const PatientFilterSheet = ({ bottomSheetModalRef }) => {
  // variables
  const snapPoints = useMemo(() => ['37%'], [])

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.5}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className={' w-full h-full p-3'}>
          <CustomText
            className={' text-xl w-full text-center'}
            style={{ fontFamily: 'NunitoSans-bold' }}
          >
            Patient Status
          </CustomText>

          <View
            className={
              'flex flex-row mt-5 items-center space-x-2 justify-between p-3 '
            }
          >
            <CustomText className={' text-xl  text-center'}>
              Completed
            </CustomText>
            <Switch
              trackColor={{ false: '#ced4e3', true: '#3e6ae9' }}
              thumbColor={isEnabled ? '#95b2f6' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#eaedf6' : '#ffffff' }
            ]}
            onPress={() => {}}
          >
            <CustomText className={'text-xl w-full text-start '}>
              Health Record
            </CustomText>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#eaedf6' : '#ffffff' }
            ]}
            onPress={() => {}}
          >
            <CustomText className={'text-xl w-full text-start '}>
              Lab Result
            </CustomText>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
const PatientDetail = ({ navigation }) => {
  const route = useRoute()
  const { patient } = route.params

  const bottomSheetModalRef = useRef(null)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Patient Patient',
      headerRight: () => (
        <View className={'flex-row items-center space-x-2'}>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={!!patient}
            onPress={() => navigation.navigate('AddLabResult')}
            style={{ marginRight: 15 }}
          >
            <AntDesign name='plus' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={!!patient}
            onPress={() => navigation.navigate('AddHealthRecord')}
            style={{ marginRight: 15 }}
          >
            <AntDesign name='save' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={false}
            onPress={handlePresentModalPress}
            style={{ marginRight: 15 }}
          >
            <Entypo name='dots-three-vertical' size={20} color='black' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const palceholderImageMale =
    'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq.jpg'
  const placeHolderImageFemale =
    'https://cdn.vectorstock.com/i/1000x1000/98/45/person-gray-photo-placeholder-woman-vector-23519845.webp'

  return (
    <ScrollView className={'flex felx-col flex-1 bg-neutral p-3'}>
      <View className={'flex flex-row w-full items-center space-x-5 bg-'}>
        <Image
          className={'w-[100px] h-[100px] rounded-full'}
          source={{ uri: palceholderImageMale }}
        />
        <View className={'flex flex-col space-y'}>
          <CustomText
            style={{ fontFamily: 'NunitoSans-bold' }}
            className={'text-xl'}
          >
            {patient.name}
          </CustomText>
          <CustomText className={'text-[15px] mb-2'}>
            ID {patient.id}
          </CustomText>
          <PatientStatus status={patient.status} />
        </View>
      </View>
      <View className={'flex flex-col space-y-1 mt-3'}>
        <CustomText
          className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
        >
          Age: 15 , Male
        </CustomText>
      </View>
      {patient?.case && (
        <View className={'flex flex-col space-y-1 mt-3'}>
          <CustomText className={'text-lg'}>Case</CustomText>
          <CustomText
            className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
          >
            {patient?.case}
          </CustomText>
        </View>
      )}
      <View className={'flex flex-col space-y-1 mt-3'}>
        <CustomText className={'text-lg'}>Appointment Date</CustomText>
        <CustomText
          className={'w-full px-4 py-2 text-lg rounded-xl bg-gray-100'}
        >
          {patient.date}
        </CustomText>
      </View>
      <PatientFilterSheet bottomSheetModalRef={bottomSheetModalRef} />
    </ScrollView>
  )
}
const styles = {
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5
  }
}

export default PatientDetail
