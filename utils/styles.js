import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    banner: {
      position: 'absolute',
      top: 50
    },
    input: {
      position: 'absolute',
      borderRadius: 25,
      borderStyle: 'solid',
      borderWidth: 1,
      width: 200,
      height: 40,
      top: 80,
      zIndex: 100,
      paddingLeft: 25,
    },
    addButton: {
      position: 'absolute',
      borderRadius: 25,
      borderStyle: 'solid',
      backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 30,
      top: 130,
      zIndex: 100
    },
    textarea: {
      position: 'absolute',
      top: 165,
      width: 500,
      height: 200,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 10,
      fontSize: 30
    }
  });

export default styles;