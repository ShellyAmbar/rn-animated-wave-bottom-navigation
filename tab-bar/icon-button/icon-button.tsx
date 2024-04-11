import React, { FC } from 'react';
import { Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './icon-button.styles';
export type IconLibrary = {
  [key: string]: () => React.ComponentType<any>;
};

const ICON_LIBRARIES: IconLibrary = {
  Feather: () => Feather,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
  // add more libraries as needed
};

export type IconButtonProps = PressableProps & {
  icon: string;
  iconFamily?: 'Feather' | 'MaterialCommunityIcons';
  variant?: 'text' | 'contained' | 'outline';
  size?: 'small' | 'medium' | 'big';
  iconColor?: string;
  roundness?: 'full' | 'medium' | 'small';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  iconFamily = 'Feather',
  variant = 'contained',
  size = 'medium',
  iconColor = 'white',
  roundness = 'medium',
  style = {},
  onPress,
  ...rest
}: IconButtonProps) => {
  const Icon = ICON_LIBRARIES[iconFamily]();
  const iconSize = size === 'big' ? 24 : size === 'medium' ? 16 : 12;
  const buttonSize = size === 'big' ? 48 : size === 'medium' ? 36 : 24;

  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${roundness}Roundness`],
    { width: buttonSize, height: buttonSize },
    style,
  ] as StyleProp<ViewStyle>;

  return (
    <Pressable {...rest} onPress={onPress} style={({ pressed }) => [buttonStyles, pressed && styles.buttonPressed, pressed && styles.shadow]}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
};

export default IconButton;
