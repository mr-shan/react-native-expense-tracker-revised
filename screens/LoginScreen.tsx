import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import GenericButton from '../components/GenericButton';
import COLORS from '../styles/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const LoginScreen = (props: IProps) => {
  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <KeyboardAvoidingView>
          <View style={styles.loginFormWrapper}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <GenericButton type='primary' onPress={() => {}} title='Login' />
            <GenericButton
              type='flat'
              textColor={COLORS.text300}
              textStyle={{ fontWeight: '400' }}
              onPress={() => props.navigation.replace('SignUpScreen')}
              title='New user? Sign up here'
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg300,
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  loginFormWrapper: {
    gap: 20,
  },
  inputWrapper: {
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: COLORS.primary500,
    paddingBottom: 8,
    paddingLeft: 6,
  },
  input: {
    backgroundColor: COLORS.bg500,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    borderRadius: 10,
    color: COLORS.text500
  },
  buttonsContainer: {
    gap: 8,
    maxWidth: 300,
    alignSelf: 'center',
    marginTop: 36,
  },
});

export default LoginScreen;
