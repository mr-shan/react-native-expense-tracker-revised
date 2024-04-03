import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ViewStyle,
  TextInputProps,
  TextStyle
} from 'react-native';
import COLORS from '../styles/colors';

interface IProps {
  label: string;
  inputProps?: TextInputProps;
  inputStyle?: TextStyle,
  containerStyle?: ViewStyle;
  onChange: (text: string) => void;
}

const Input = (props: IProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props.inputProps}
        placeholderTextColor={COLORS.text200}
        style={[styles.input, props.inputStyle]}
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: COLORS.text300,
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: COLORS.bg500,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    color: COLORS.text700,
    fontSize: 18
  },
});

export default Input;