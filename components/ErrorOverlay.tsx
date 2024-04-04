import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../styles/colors';
import GenericButton from './GenericButton';

interface IProps {
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorOverlay = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.backdrop}></View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.message}>{props.message}</Text>
          <GenericButton
            onPress={props.onClose}
            type='primary'
            color={COLORS.secondary700}
            textColor={COLORS.text500}
            title='Close'
            size='small'
            style={{width: 80, alignSelf: 'flex-end'}}
          />
        </View>
      </View>
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
    opacity: 0.4,
    position: 'absolute',
  },
  body: {
    width: 300,
    backgroundColor: COLORS.bg500,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 14,
    elevation: 14,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.primary500,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    color: COLORS.bg300,
    fontWeight: '500',
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    color: COLORS.text700,
    lineHeight: 24
  }
});

export default ErrorOverlay;
