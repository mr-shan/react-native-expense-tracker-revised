import { StyleSheet, View } from 'react-native';
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

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();
  const expenseId = props.route.params?.expenseId;
  const mode = expenseId ? 'edit' : 'new';

  let expenseData = null;
  if (expenseId) {
    expenseData = state.expenses.find(expense => expense.id === expenseId);
    console.log(expenseData)
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: mode === 'edit' ? 'Manage Expense' : 'Add New Expense',
    });
  }, []);

  const buttonTitle = mode === 'edit' ? 'Save' : 'Add';
    
  const goBack = () => {
    props.navigation.goBack();
  };
  const deleteExpenseHandler = () => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId })
    goBack()
  };
  const saveExpenseHandler = () => {
    goBack()
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonsWrapper}>
        <GenericButton
          style={{ flex: 1 }}
          onPress={goBack}
          title='Cancel'
          type='outlined'
        />
        <GenericButton
          style={{ flex: 1 }}
          onPress={saveExpenseHandler}
          title={buttonTitle}
          type='primary'
        />
      </View>
      <GenericButton
        style={{ marginTop: 10 }}
        onPress={deleteExpenseHandler}
        type='icon'
      >
        <Ionicons name='trash' size={40} color={COLORS.accent700} />
      </GenericButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: COLORS.bg300,
    alignItems: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default AddExpenseScreen;
