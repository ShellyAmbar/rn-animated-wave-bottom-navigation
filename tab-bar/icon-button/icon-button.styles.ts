import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  containedButton: {
    backgroundColor: '#2196F3',
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  fullRoundness: {
    borderRadius: 100,
  },
  mediumRoundness: {
    borderRadius: 20,
  },
  smallRoundness: {
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
export default styles;
