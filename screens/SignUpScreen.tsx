import { useState } from 'react';
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
import validators from '../utils/validators';
import { signUp } from '../utils/auth';

import { useExpense } from '../store';
import LoadingOverlay from '../components/LoadingOverlay';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const SignUpScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();

  const [username, setUserName] = useState({
    isValid: true,
    value: '',
    errorMessage: '',
  });
  const [password, setPassword] = useState({
    isValid: true,
    value: '',
    errorMessage: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    isValid: true,
    value: '',
    errorMessage: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const usernameChangeHandler = (value: string) => {
    setUserName((oldVal) => ({
      isValid: true,
      value: value.trim(),
      errorMessage: '',
    }));
  };

  const passwordChangeHandler = (value: string) => {
    setPassword((oldVal) => ({
      isValid: true,
      value: value.trim(),
      errorMessage: '',
    }));
  };

  const confirmPasswordChangeHandler = (value: string) => {
    setConfirmPassword((oldVal) => ({
      isValid: true,
      value: value.trim(),
      errorMessage: '',
    }));
  };

  const submitHandler = async () => {
    const isUsernameValid = validators.validateEmail(username.value);
    setUserName((oldVal) => ({
      ...oldVal,
      isValid: !!isUsernameValid,
      errorMessage: !isUsernameValid ? 'Please enter valid email' : '',
    }));

    const isPasswordValid = validators.validatePassword(password.value);
    if (isPasswordValid === '')
      setPassword((oldVal) => ({ ...oldVal, isValid: true }));
    else
      setPassword((oldVal) => ({
        ...oldVal,
        isValid: false,
        errorMessage: isPasswordValid,
      }));

    const isConfirmPwValid = password.value === confirmPassword.value;
    if (!isConfirmPwValid || confirmPassword.value === '') {
      setConfirmPassword((oldVal) => ({
        ...oldVal,
        isValid: false,
        errorMessage: 'Password does not match',
      }));
    }

    if (!(isUsernameValid && isPasswordValid === '' && isConfirmPwValid))
      return;

    setIsLoading(true);

    const signUpData = await signUp(username.value, password.value);

    setIsLoading(false);
    console.log(signUpData);
    if (signUpData && signUpData.idToken) {
      dispatch({
        type: 'SET_USER_DETAILS',
        payload: {
          email: signUpData.email,
          expiresIn: signUpData.expiresIn,
          idToken: signUpData.idToken,
          refreshToken: signUpData.refreshToken,
        },
      });
    }
  };

  const invalidInputStyle = { borderColor: COLORS.accent500, borderWidth: 2 };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <KeyboardAvoidingView>
            <View style={styles.loginFormWrapper}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={[styles.input, !username.isValid && invalidInputStyle]}
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect={false}
                  value={username.value}
                  textContentType='emailAddress'
                  onChangeText={usernameChangeHandler}
                />
                {username.errorMessage && (
                  <Text style={styles.inputErrorMessage}>
                    {username.errorMessage}
                  </Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[styles.input, !password.isValid && invalidInputStyle]}
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect={false}
                  textContentType='password'
                  value={password.value}
                  onChangeText={passwordChangeHandler}
                />
                {password.errorMessage && (
                  <Text style={styles.inputErrorMessage}>
                    {password.errorMessage}
                  </Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm password</Text>
                <TextInput
                  style={[
                    styles.input,
                    !confirmPassword.isValid && invalidInputStyle,
                  ]}
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect={false}
                  textContentType='password'
                  value={confirmPassword.value}
                  onChangeText={confirmPasswordChangeHandler}
                />
                {confirmPassword.errorMessage && (
                  <Text style={styles.inputErrorMessage}>
                    {confirmPassword.errorMessage}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <GenericButton
                type='primary'
                onPress={submitHandler}
                title='Sign Up'
              />
              <GenericButton
                type='flat'
                textColor={COLORS.text300}
                textStyle={{ fontWeight: '400' }}
                onPress={() => props.navigation.replace('LoginScreen')}
                title='Existing user? Log in here'
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg300,
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 30,
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
    color: COLORS.text500,
  },
  inputErrorMessage: {
    fontSize: 12,
    color: COLORS.accent900,
    paddingLeft: 6,
    paddingTop: 6,
  },
  buttonsContainer: {
    gap: 8,
    maxWidth: 240,
    alignSelf: 'center',
    marginTop: 24,
  },
});

export default SignUpScreen;
