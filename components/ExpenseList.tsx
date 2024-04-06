import { StyleSheet, FlatList, Text, ListRenderItemInfo } from 'react-native';

import ExpenseListItem from './ExpenseListItem';
import { IExpense } from '../types';

interface IProps {
  expenses: IExpense[];
  onPress: (id: string) => void;
}

const ExpenseList = (props: IProps) => {
  return (
    <FlatList
      data={props.expenses}
      keyExtractor={(item: IExpense) => item.id}
      renderItem={(info) => (
        <ExpenseListItem expenseDetails={info.item} onPress={props.onPress} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default ExpenseList;
