import { StyleSheet, View, Text } from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import ExpenseList from '../components/ExpenseList';
import ExpenseStatus from '../components/ExpenseStatus';

import COLORS from '../styles/colors';
import { IExpense } from '../types';
import { useExpense } from '../store';
import { useEffect, useState } from 'react';
import { fetchAllExpenses } from '../utils/http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AllExpenseScreen = (props: IProps) => {
  const { state, dispatch } = useExpense();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetchAllExpenses(state.userDetails?.idToken);
        if (res.isError || !res.expenses) {
          setIsError(true);
          setIsLoading(false);
          return;
        };        
        dispatch({ type: 'SET_EXPENSES', payload: res.expenses })
      } catch (error) {
        console.error(error)   
      }
      setIsLoading(false);
    }
    fetchExpenses()
  }, [])

  const closeError = () => {
    setIsError(false)
  }

  if (sortedExpenses.length === 0 && !isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.noExpenseText}>No expenses found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      {isError && !isLoading && (
        <ErrorOverlay
          title='Something went wrong!'
          message='Failed to fetch expenses, Please try again later.'
          onClose={closeError}
        />
      )}
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
  noExpenseText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: COLORS.text500,
  },
});

export default AllExpenseScreen;
