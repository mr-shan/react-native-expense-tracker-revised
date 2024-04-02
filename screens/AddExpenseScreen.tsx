import { StyleSheet, Text, View } from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { useLayoutEffect } from 'react';
import COLORS from '../styles/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  const expenseId = props.route.params?.expenseId;
  const mode = expenseId ? 'edit' : 'new';

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: mode === 'edit' ? 'Manage Expense' : 'Add New Expense',
    });
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Add Expense Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg300
  },
});

export default AddExpenseScreen;
