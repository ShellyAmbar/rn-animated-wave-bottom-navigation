import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styles from './animated-circle.styles';
import { ViewStyle } from 'react-native';
type CircleProps = {
  circleX: Animated.SharedValue<number>;
  style?: ViewStyle;
};
const circleContainerSize = 50;

const AnimatedCircle: FC<CircleProps> = ({ circleX, style }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  return <Animated.View style={[circleContainerStyle, styles.container, { ...style }]} />;
};

export default AnimatedCircle;
