import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import RecentExpenseScreen from './screens/RecentExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';

import COLORS from './styles/colors';

const RootStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary300 },
        tabBarStyle: { backgroundColor: COLORS.bg300, },
        tabBarActiveTintColor: COLORS.primary500,
        tabBarLabelStyle: { fontSize: 12, },
      }}
    >
      <BottomTabs.Screen
        component={RecentExpenseScreen}
        name='RecentExpenses'
        options={{
          title: 'Recent Expenses',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'timer' : 'timer-outline'}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        component={AllExpenseScreen}
        name='AllExpenses'
        options={{
          title: 'All Expenses',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'wallet' : 'wallet-outline'}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          component={BottomTabsNavigation}
          name='TabsNavigation'
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen component={AddExpenseScreen} name='AddExpense' />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
