import { StyleSheet, View } from 'react-native';
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

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();
  const [isLoading, setIsLoading] = useState(false);
  const expenseId = props.route.params?.expenseId;
  const mode = expenseId ? 'edit' : 'new';

  let expenseData: IExpense | null = null;
  if (expenseId) {
    expenseData =
      state.expenses.find((expense) => expense.id === expenseId) || null;
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: mode === 'edit' ? 'Manage Expense' : 'Add New Expense',
    });
  }, []);

  const goBack = () => {
    props.navigation.goBack();
  };
  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    const response = await deleteExpense(expenseId);
    if (response.isError) return;
    dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId });
    goBack();
  };
  const saveExpenseHandler = async (expenseData: IExpense) => {
    setIsLoading(true);
    if (mode === 'new') {
      const response = await postNewExpense(expenseData);
      if (response.isError || !response.id) return;
      dispatch({
        type: 'ADD_EXPENSE',
        payload: { ...expenseData, id: response.id },
      });
    } else {
      const response = await modifyExistingExpense(expenseData.id, expenseData);
      if (response.isError) return;
      dispatch({ type: 'MODIFY_EXPENSE', payload: expenseData });
    }
    setIsLoading(false);
    goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        expenseData={expenseData}
        onSubmit={saveExpenseHandler}
        onCancel={goBack}
        mode={mode}
      />
      {mode === 'edit' && (
        <GenericButton
          style={{ marginTop: 10 }}
          onPress={deleteExpenseHandler}
          type='icon'
        >
          <Ionicons name='trash' size={40} color={COLORS.accent700} />
        </GenericButton>
      )}
    </View>
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
