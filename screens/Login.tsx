import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {CredentialType, loginUser} from '../services/api';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from './enum.screen';

const Login = () => {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const loginMutation = useMutation({
    mutationFn: (credential: CredentialType) => loginUser({credential}),
    onSuccess: (data: any) => {
      navigation.navigate(SCREEN.ManageProducts);
    },
  });
  const handleLogin = () => {
    const credential = {username, password};
    console.log('cred', credential);
    loginMutation.mutate(credential);
    console.log('isSucess', loginMutation.status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
