/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home';
import Products from './screens/Products';
import ProductDetails from './components/products/ProductDetails';
import Login from './screens/Login';
import ContextQuery from './components/ContextQuery';
import EditProduct from './components/products/EditProduct';
import {SCREEN} from './screens/enum.screen';
import ManageProducts from './screens/ManageProducts';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ContextQuery>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={SCREEN.Home} component={HomeScreen} />
          <Stack.Screen name={SCREEN.ProductsList} component={Products} />
          <Stack.Screen
            name={SCREEN.ProductDetails}
            component={ProductDetails}
          />
          <Stack.Screen name={SCREEN.Login} component={Login} />
          <Stack.Screen
            name={SCREEN.ManageProducts}
            component={ManageProducts}
          />
          <Stack.Screen name={SCREEN.EditProduct} component={EditProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextQuery>
  );
}

export default App;
