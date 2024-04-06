import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import RecentExpenseScreen from './screens/RecentExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';

import TabBarAddButton from './components/TabBarAddButton';

import { ExpenseProvider, useExpense } from './store';

import COLORS from './styles/colors';
import { Dimensions, Platform } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import GenericButton from './components/GenericButton';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  const { dispatch } = useExpense();

  const logoutButton = () => (
    <GenericButton
      onPress={() => dispatch({ type: 'LOG_OUT' })}
      type='icon'
      style={{ right: -5 }}
    >
      <MaterialIcons name='logout' size={24} color={COLORS.text200} />
    </GenericButton>
  );

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg300 },
        tabBarStyle: {
          backgroundColor: COLORS.bg300,
          minHeight: Dimensions.get('screen').width > 350 ? 64 : 90,
          borderTopColor: 'transparent',
          paddingVertical: 2,
          paddingBottom:
            Platform.OS === 'android'
              ? 4
              : Dimensions.get('screen').width > 380
              ? 16
              : 4,
        },
        tabBarActiveTintColor: COLORS.text500,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerTintColor: COLORS.primary500,
        headerRight: logoutButton,
      }}
    >
      <BottomTabs.Screen
        component={RecentExpenseScreen}
        name='RecentExpenses'
        options={{
          title: 'Recent',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'timer' : 'timer-outline'}
              size={props.size + 8}
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
              <TabBarAddButton
                onPress={() => props.navigation.navigate('AddExpense')}
              />
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
              size={props.size + 8}
              color={props.color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary500 },
        headerTintColor: COLORS.bg300,
      }}
      initialRouteName='LoginScreen'
    >
      <AuthStack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
        }}
      />
      <AuthStack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
    </AuthStack.Navigator>
  );
};

const ProtectedScreens = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg500 },
        headerTintColor: COLORS.text700,
      }}
      initialRouteName='SignUpScreen'
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
          headerStyle: { backgroundColor: COLORS.primary500 },
          headerTintColor: COLORS.bg300,
        }}
      />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  const { state } = useExpense();

  if (state.userDetails?.idToken) {
    return <ProtectedScreens />;
  }
  return <AuthNavigator />;
};

export default function App() {
  return (
    <ExpenseProvider>
      <StatusBar style='light' />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ExpenseProvider>
  );
}
