import { Dimensions, StyleSheet } from 'react-native';

const createStyle = ({ numOfItems }: { numOfItems: number }) => {
  const { width } = Dimensions.get('screen');
  return StyleSheet.create({
    labelContainer: {
      position: 'absolute',
      alignItems: 'center',
      width: width / numOfItems,
    },
    label: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  });
};
export default createStyle;
