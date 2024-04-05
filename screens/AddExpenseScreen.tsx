import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { useLayoutEffect, useState } from 'react';
import COLORS from '../styles/colors';
import { useExpense } from '../store';

import GenericButton from '../components/GenericButton';
import { IExpense } from '../types';
import ExpenseForm from '../components/ExpenseForm';
import {
  deleteExpense,
  modifyExistingExpense,
  postNewExpense,
} from '../utils/http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const expenseId = props.route.params?.expenseId;
  const mode = expenseId ? 'edit' : 'new';

  let expenseData: IExpense | null = null;
  if (expenseId) {
    expenseData =
      state.expenses.find((expense) => expense.id === expenseId) || null;
  }

  const goBack = () => {
    props.navigation.goBack();
  };
  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    const response = await deleteExpense(expenseId);
    if (response.isError) {
      setIsError(true);
      setIsLoading(false);
      return;
    };
    dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId });
    goBack();
  };
  const saveExpenseHandler = async (expenseData: IExpense) => {
    setIsLoading(true);
    if (mode === 'new') {
      const response = await postNewExpense(expenseData);
      console.log(response);
      if (response.isError || !response.id) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      dispatch({
        type: 'ADD_EXPENSE',
        payload: { ...expenseData, id: response.id },
      });
    } else {
      const response = await modifyExistingExpense(expenseData.id, expenseData);
      if (response.isError) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      dispatch({ type: 'MODIFY_EXPENSE', payload: expenseData });
    }
    setIsLoading(false);
    goBack();
  };
  const closeError = () => {
    setIsError(false);
  };
  const deleteButton = () =>
    mode === 'edit' && (
      <GenericButton
        onPress={deleteExpenseHandler}
        type='icon'
        style={{ right: -12 }}
      >
        <Ionicons name='trash' size={24} color={COLORS.accent500} />
      </GenericButton>
    );
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: mode === 'edit' ? 'Manage Expense' : 'Add New Expense',
      headerRight: deleteButton,
    });
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {isError && !isLoading && (
        <ErrorOverlay
          title='Something went wrong!'
          message='Failed to save expense details, Please try again later.'
          onClose={closeError}
        />
      )}
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <ExpenseForm
            expenseData={expenseData}
            onSubmit={saveExpenseHandler}
            onCancel={goBack}
            mode={mode}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: COLORS.bg300,
    paddingTop: 30,
  },
});

export default AddExpenseScreen;
