import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {CredentialType, loginUser} from '../services/api';
import useAuth from '../hooks/userAuth';
import {decodedToken, setItem} from '../components/utils';
import InputLabel from '../components/atoms/InputLabel';
import {hp, wp} from '../components/utils/responsive';

export const idsOfUserAdmin = [1, 3, 5];

const Login = () => {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setIsAdmin, setIsAuthenticated, setUser} = useAuth();
  const loginMutation = useMutation({
    mutationFn: (credential: CredentialType) => loginUser({credential}),
    onSuccess: async (data: any) => {
      const user = {
        username: username,
        token: data?.token,
      };
      await setItem('user', JSON.stringify(user));
      const us = decodedToken(data?.token);
      setIsAdmin(idsOfUserAdmin.includes(Number(us?.sub)));
      setIsAuthenticated(true);
      setUser(JSON.stringify(user));
    },
  });
  const handleLogin = () => {
    const credential = {username, password};
    loginMutation.mutate(credential);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputLabel label={'Username'} value={username} setValue={setUserName} />
      <InputLabel label={'Password'} value={password} setValue={setPassword} />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginVertical: hp('2%'),
    width: wp('30%'),
    justifyContent: 'center',
    marginLeft: wp('1%'),
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
