import React from 'react'
import { View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

const TipSkeletonLoader = () => {
  const shimmerTranslateX = useSharedValue(-100)

  // Shimmer animation configuration
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
        'bg-white rounded-xl w-full h-auto mb-8 shadow-lg shadow-black'
      }
    >
      <View
        className={'bg-white rounded-xl p-3 flex flex-col space-y-3 w-full'}
      >
        {/* Title Skeleton */}
        <View className={'h-6 w-3/4 bg-gray-300 rounded-md overflow-hidden'}>
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

        {/* Content Skeleton */}
        <View className={'h-4 w-full bg-gray-300 rounded-md overflow-hidden'}>
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

        <View className={'h-4 w-full bg-gray-300 rounded-md overflow-hidden'}>
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

        {/* Read More Skeleton */}
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

        {/* Doctor Name Skeleton */}
      </View>

      {/* Image Skeleton */}
      <View
        className={'w-full h-[300px] rounded-xl bg-gray-300 overflow-hidden'}
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
    </View>
  )
}

export default TipSkeletonLoader
