import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AppointmentSkeletonLoader = () => {
  const shimmerTranslateX = useSharedValue(-100);

  // Shimmer animation configuration
  React.useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(100, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }],
  }));

  return (
    <View className={'flex flex-col bg-white p-2 shadow-md shadow-black/10 mb-4'}>
      {/* Doctor Name Skeleton */}
      <View className={'h-6 w-3/4 bg-gray-300 rounded-md overflow-hidden'}>
        <Animated.View
          style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.1)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* Date Skeleton */}
      <View className={'h-4 w-2/3 bg-gray-300 rounded-md overflow-hidden my-1'}>
        <Animated.View
          style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.1)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* Time Skeleton */}
      <View className={'h-4 w-1/3 bg-gray-300 rounded-md overflow-hidden my-1'}>
        <Animated.View
          style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.1)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* Case Info Skeleton */}
      <View className={'h-4 w-1/4 bg-gray-300 rounded-md overflow-hidden my-1'}>
        <Animated.View
          style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.1)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* Status Skeleton */}
      <View className={'flex flex-row w-full items-center justify-end'}>
        <View className={'h-5 w-1/4 bg-gray-300 rounded-md overflow-hidden'}>
          <Animated.View
            style={[animatedShimmerStyle, { width: '100%', height: '100%' }]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.3)',
                'rgba(255, 255, 255, 0.1)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default AppointmentSkeletonLoader;
