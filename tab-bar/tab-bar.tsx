import React, { FC } from 'react';
import { Dimensions, TextStyle, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';

import usePath from './path/hooks/usePath';
import { getPathXCenter } from './path/path';
import TabItem from './tab-item/tab-item';
import AnimatedCircle from './animated-circle/animated-circle';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styles from './tab-bar.styles';

type Props = BottomTabBarProps & {
  numOfTabs: number;
  icons: string[];
  tabBarBackgroundColor?: string;
  lableStyle?: TextStyle;
  iconUnActiveColor?: string;
  iconActiveColor?: string;
  circleStyle?: ViewStyle;
};
const AnimatedPath = Animated.createAnimatedComponent(Path);
export const TabBar: FC<Props> = ({
  state,
  descriptors,
  navigation,
  numOfTabs,
  icons,
  tabBarBackgroundColor = 'rgba(0,0,0,0.2)',
  lableStyle,
  iconUnActiveColor,
  iconActiveColor,
  circleStyle,
}) => {
  const { width } = Dimensions.get('screen');
  const { containerPath, curvedPaths, tHeight } = usePath({ numTabs: numOfTabs });
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath: string) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };

  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths,
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`,
    };
  });

  const handleTabPress = (index: number, tab: string) => {
    navigation.navigate(tab);
    progress.value = withTiming(index);
  };

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={tHeight} style={styles.shadowMd}>
        <AnimatedPath fill={tabBarBackgroundColor} animatedProps={animatedProps} />
      </Svg>
      <AnimatedCircle style={circleStyle} circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;
          return (
            <TabItem
              iconActiveColor={iconActiveColor}
              iconUnActiveColor={iconUnActiveColor}
              lableStyle={lableStyle}
              totalTabs={state.routes.length}
              key={index.toString()}
              label={label as string}
              icon={icons[index]}
              activeIndex={state.index + 1}
              index={index}
              onTabPress={() => handleTabPress(index + 1, route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};
export default TabBar;
