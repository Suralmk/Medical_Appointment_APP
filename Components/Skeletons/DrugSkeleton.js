import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

const DrugSkeleton = () => {
  const shimmerTranslateX = useSharedValue(-100)
  React.useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(100, { duration: 1000 }),
      -1,
      true
    )
  }, [])

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }]
  }))

  return (
    <View
      className={
        'w-full p-2 relative rounded-xl bg-white flex flex-row items-center space-x-3 mb-3 h-auto shadow-sm shadow-black/50'
      }
    >
      {/* Profile Image Skeleton */}
      <View
        className={'w-[60px] h-[60px] rounded-xl bg-gray-300 overflow-hidden'}
      >
        <Animated.View
          style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.1)'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      <View className={'flex flex-col space-y-2 flex-1'}>
        {/* Name Placeholder */}
        <View className={'h-5 w-3/4 bg-gray-300 rounded-md overflow-hidden'}>
          <Animated.View
            style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.3)',
                'rgba(255, 255, 255, 0.1)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>

        {/* Phone Number Placeholder */}
        <View className={'h-5 w-1/3 bg-gray-300 rounded-md overflow-hidden'}>
          <Animated.View
            style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.3)',
                'rgba(255, 255, 255, 0.1)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>

        {/* Date Placeholder */}
        <View className={'h-5 w-full bg-gray-300 rounded-md overflow-hidden'}>
          <Animated.View
            style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.3)',
                'rgba(255, 255, 255, 0.1)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

export default DrugSkeleton
