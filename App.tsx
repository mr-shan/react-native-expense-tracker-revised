import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import RecentExpenseScreen from './screens/RecentExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';

import COLORS from './styles/colors';
import { Pressable } from 'react-native';

const RootStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg300 },
        tabBarStyle: { backgroundColor: COLORS.bg300 },
        tabBarActiveTintColor: COLORS.primary500,
        tabBarLabelStyle: { fontSize: 12 },
        headerTintColor: COLORS.primary500,
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
        component={AddExpenseScreen}
        name='AddExpenseModal'
        options={(props) => {
          return {
            tabBarButton: () => (
              <Pressable
                style={{
                  backgroundColor: COLORS.secondary700,
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => props.navigation.navigate('AddExpense')}
              >
                <Ionicons name='add' size={40} color={COLORS.text700} />
              </Pressable>
            ),
          };
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
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.bg500 },
            headerTintColor: 'white',
          }}
        >
          <RootStack.Screen
            component={BottomTabsNavigation}
            name='TabsNavigation'
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            component={AddExpenseScreen}
            name='AddExpense'
            options={{
              presentation: 'modal',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
