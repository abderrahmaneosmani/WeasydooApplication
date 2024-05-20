import {Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconO from 'react-native-vector-icons/Octicons';
import {SCREEN} from '../screens/enum.screen';
import Login from '../screens/Login';
import Products from '../screens/Products';
import {COLORS} from '../components/utils/colors';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings! is</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Settings') {
              return (
                <IconO
                  name="package-dependents"
                  size={25}
                  color={COLORS.primary}
                />
              );
            }
            if (route.name === SCREEN.Home) {
              return <IconO name="home" size={25} color={COLORS.primary} />;
            }
            if (route.name === SCREEN.Login) {
              return <IconO name="person" size={25} color={COLORS.primary} />;
            }
          },
          title: '',
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.secondary,
        })}>
        <Tab.Screen name={SCREEN.Home} component={Products} />
        <Tab.Screen name={SCREEN.Login} component={Login} />

        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomNavigator;
