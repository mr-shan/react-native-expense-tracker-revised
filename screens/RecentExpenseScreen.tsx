import { StyleSheet, Text, View } from 'react-native';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import COLORS from '../styles/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const RecentExpenseScreen = (props: IProps) => {
  return <View style={styles.container}>
    <Text>Recent expenses.</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg500
  }
})

export default RecentExpenseScreen;