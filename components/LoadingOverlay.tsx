import { ActivityIndicator, View, StyleSheet } from 'react-native';
import COLORS from '../styles/colors';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={COLORS.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LoadingOverlay;
