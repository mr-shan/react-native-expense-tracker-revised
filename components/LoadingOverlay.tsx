import { ActivityIndicator, View, StyleSheet } from 'react-native';
import COLORS from '../styles/colors';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backdrop}></View>
      <ActivityIndicator size='large' color={COLORS.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    position: 'absolute'
  }
})

export default LoadingOverlay;
