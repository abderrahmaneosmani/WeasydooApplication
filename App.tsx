/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import ContextQuery from './components/ContextQuery';
import {AuthProvider} from './context/AuthContext';
import StackNav from './navigation/StackNavigator';

function App(): React.JSX.Element {
  return (
    <ContextQuery>
      <AuthProvider>
        <StackNav />
      </AuthProvider>
    </ContextQuery>
  );
}

export default App;
