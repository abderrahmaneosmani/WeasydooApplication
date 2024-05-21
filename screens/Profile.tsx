import {Button, Text, View} from 'react-native';
import useAuth from '../hooks/userAuth';
import {clearItem} from '../components/utils';

export default function Profile() {
  const {user, setIsAuthenticated} = useAuth();

  console.log('user', user);
  const handleLogout = () => {
    clearItem('user');
    setIsAuthenticated(false);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hey</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
