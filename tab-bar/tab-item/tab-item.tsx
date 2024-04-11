import { Dimensions, Pressable, Text, TextStyle } from 'react-native';
import React, { FC, useEffect } from 'react';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { getPathXCenterByIndex } from './../path/path';
import usePath from './../path/hooks/usePath';
import createStyle from './tab-item.styles';

export type TabProps = {
  label: string;
  icon: string;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
  totalTabs: number;
  lableStyle?: TextStyle;
  iconUnActiveColor?: string;
  iconActiveColor?: string;
};

const AnimatedIcon = Animated.createAnimatedComponent(Feather);
const TabItem: FC<TabProps> = ({
  label,
  icon,
  index,
  activeIndex,
  onTabPress,
  totalTabs = 3,
  lableStyle,
  iconActiveColor = '#FFFF',
  iconUnActiveColor = 'rgba(128,128,128,0.8)',
}) => {
  const Styles = createStyle({ numOfItems: totalTabs });
  const { width } = Dimensions.get('screen');
  const LABEL_WIDTH = width / totalTabs;
  const ICON_SIZE = width / totalTabs;

  const { curvedPaths } = usePath({ numTabs: totalTabs });
  const animatedActiveIndex = useSharedValue(activeIndex);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -20 : 20;

    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [{ translateY: withTiming(translateY) }],
    };
  });
  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100;
    return {
      transform: [{ translateY: withTiming(translateY) }, { translateX: labelPosition - LABEL_WIDTH / 2 }],
    };
  });
  const iconColor = useSharedValue(activeIndex === index + 1 ? iconActiveColor : iconUnActiveColor);

  //Adjust Icon color for this first render
  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming(iconActiveColor);
    } else {
      iconColor.value = withTiming(iconUnActiveColor);
    }
  }, [activeIndex]);

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value,
  }));
  return (
    <>
      <Animated.View style={[tabStyle, { alignItems: 'center' }]}>
        <Pressable
          testID={`tab${label}`}
          //Increasing touchable Area
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <AnimatedIcon name={icon} size={25} animatedProps={animatedIconProps} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[labelContainerStyle, Styles.labelContainer]}>
        <Text style={[Styles.label, { ...lableStyle }]}>{label}</Text>
      </Animated.View>
    </>
  );
};

export default TabItem;
