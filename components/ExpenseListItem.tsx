import { StyleSheet, View, Pressable, Text } from 'react-native';
import { IExpense } from '../types';
import COLORS from '../styles/colors';

interface IProps {
  expenseDetails: IExpense;
  onPress: (id: string) => void;
}

const ExpenseListItem = (props: IProps) => {
  const pressHandler = () => {
    props.onPress(props.expenseDetails.id);
  };
  const data = props.expenseDetails;
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressable, styles.pressed] : styles.pressable
        }
        onPress={pressHandler}
      >
        <View style={styles.details}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.date}>{data.date.toLocaleString()}</Text>
        </View>
        <View style={styles.amountWrapper}>
          <Text style={styles.amountText}>{data.amount}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 10,
  },
  pressable: {
    padding: 10,
    backgroundColor: COLORS.bg300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  details: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 18,
    color: COLORS.text500,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: COLORS.text300,
  },
  amountWrapper: {
    backgroundColor: COLORS.secondary500,
    minWidth: 80,
    padding: 10,
    borderRadius: 5,
  },
  amountText: {
    color: COLORS.text500,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExpenseListItem;
