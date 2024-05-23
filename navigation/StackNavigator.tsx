import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Products from '../screens/Products';
import ProductDetails from '../components/products/ProductDetails';
import EditProduct from '../components/products/EditProduct';
import {SCREEN} from '../screens/enum.screen';
import ManageProducts from '../screens/ManageProducts';
import {AddProduct} from '../components/products/AddProduct';
import BottomNavigator from '../navigation/BottomNavigator';
import useAuth from '../hooks/userAuth';

const Stack = createNativeStackNavigator();

function StackNav() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREEN.BottomTabs}
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name={SCREEN.ProductsList} component={Products} />
        <Stack.Screen name={SCREEN.ProductDetails} component={ProductDetails} />
        {isAuthenticated && (
          <Stack.Screen
            name={SCREEN.ManageProducts}
            component={ManageProducts}
          />
        )}
        <Stack.Screen name={SCREEN.EditProduct} component={EditProduct} />
        <Stack.Screen name={SCREEN.AddProduct} component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
