/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigation} from './navigation/BottomNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}

export default App;
