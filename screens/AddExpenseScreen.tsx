import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { useLayoutEffect } from 'react';
import COLORS from '../styles/colors';
import { useExpense } from '../store';

import GenericButton from '../components/GenericButton';
import { IExpense } from '../types';
import ExpenseForm from '../components/ExpenseForm';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();
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
  const deleteExpenseHandler = () => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId });
    goBack();
  };
  const saveExpenseHandler = (expenseData: IExpense) => {
    if (mode === 'new') {
      dispatch({ type: 'ADD_EXPENSE', payload: expenseData });
    } else {
      dispatch({ type: 'MODIFY_EXPENSE', payload: expenseData });
    }
    goBack();
  };

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
