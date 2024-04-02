import { StyleSheet, View, Text } from 'react-native';
import COLORS from '../styles/colors';

interface IProps {
  total: number
  title: string
}

const ExpenseStatus = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.total}>₹ {props.total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bg300,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 2,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.bg700,
  },
  title: {
    color: COLORS.text700,
    fontSize: 16,
    fontWeight: 'bold'
  },
  total: {
    color: COLORS.primary700,
    fontSize: 18,
    fontWeight: 'bold'
  },
})

export default ExpenseStatus