import { StyleSheet, Text, View } from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AddExpenseScreen = (props: IProps) => {
  return <View style={styles.container}>
    <Text>Add Expense Screen</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AddExpenseScreen;