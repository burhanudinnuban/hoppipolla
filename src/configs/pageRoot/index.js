import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import color from '../../constants/colors';
import {
  Home,
  History,
  Profile,
  Splash,
  Login,
  Register,
  OnBoarding,
  ItemCart,
} from '../../pages';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routing = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminApp"
        component={AdminApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  const [badgeCart, setbadgeCart] = useState('');
  const global = useSelector((state) => state.global);
  const user = global.dataUser.user;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color.secondary,
        activeBackgroundColor: color.primary,
        inactiveBackgroundColor: color.primary,
        labelStyle: {
          fontSize: 12,
          padding: 0,
          bottom: 5,
        },
        inactiveTintColor: color.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'home'}
              size={24}
              color={focused ? color.secondary : color.white}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ItemCart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'shopping-cart'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'history'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'user'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AdminApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color.secondary,
        activeBackgroundColor: color.primary,
        inactiveBackgroundColor: color.primary,
        labelStyle: {
          fontSize: 12,
          padding: 0,
          bottom: 5,
        },
        inactiveTintColor: color.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'home'}
              size={24}
              color={focused ? color.secondary : color.white}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ItemCart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'shopping-cart'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarBadge: 'new',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'history'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'user'}
              color={focused ? color.secondary : color.white}
              size={24}
              brand
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Routing;
