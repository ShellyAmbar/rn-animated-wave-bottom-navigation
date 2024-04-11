import { StyleSheet } from 'react-native';
const circleContainerSize = 50;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 1.5,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
