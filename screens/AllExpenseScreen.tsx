import { StyleSheet, View } from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import ExpenseList from '../components/ExpenseList';
import ExpenseStatus from '../components/ExpenseStatus';

import COLORS from '../styles/colors';
import DUMMY_EXPENSES from '../data/dummy';
import { IExpense } from '../types';
import { useExpense } from '../store';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AllExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();

  const sortedExpenses = [...state.expenses];
  
  sortedExpenses.sort((a: IExpense, b: IExpense) => {
    return b.date.valueOf() - a.date.valueOf();
  });
  const totalExpenses = sortedExpenses.reduce(
    (prev, cur) => prev + cur.amount,
    0
  );
  const expensePressHandler = (id: string) => {
    props.navigation.navigate('AddExpense', { expenseId: id });
  };
  return (
    <View style={styles.container}>
      <ExpenseStatus title='Total expenses' total={totalExpenses} />
      <ExpenseList expenses={sortedExpenses} onPress={expensePressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg500,
  },
});

export default AllExpenseScreen;
