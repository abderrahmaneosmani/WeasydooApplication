import {View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconO from 'react-native-vector-icons/Octicons';
import {SCREEN} from '../screens/enum.screen';
import Login from '../screens/Login';
import Products from '../screens/Products';
import {COLORS} from '../components/utils/colors';
import ManageProducts from '../screens/ManageProducts';
import useAuth from '../hooks/userAuth';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const iconMap: any = {
  [SCREEN.ManageProducts]: 'package-dependents',
  [SCREEN.Home]: 'home',
  [SCREEN.Profile]: 'person',
  [SCREEN.Login]: 'sign-in',
};

const getIconName = (routeName: string, focused: boolean) => {
  const baseColor: string = focused ? COLORS.orange : COLORS.primary;
  const iconName: string = iconMap[routeName];
  return iconName ? (
    <IconO name={iconName} size={25} color={baseColor} />
  ) : null;
};

const BottomNavigator = () => {
  const {isAuthenticated} = useAuth();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => getIconName(route.name, focused),
          title: '',
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.secondary,
        })}>
        <Tab.Screen name={SCREEN.Home} component={Products} />
        {isAuthenticated && (
          <Tab.Screen name={SCREEN.ManageProducts} component={ManageProducts} />
        )}

        {isAuthenticated && (
          <Tab.Screen name={SCREEN.Profile} component={Profile} />
        )}

        {!isAuthenticated && (
          <Tab.Screen name={SCREEN.Login} component={Login} />
        )}
      </Tab.Navigator>
    </View>
  );
};

export default BottomNavigator;
