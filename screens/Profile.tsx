import {Button, StyleSheet, Text, View} from 'react-native';
import useAuth from '../hooks/userAuth';
import {clearItem} from '../components/utils';
import {COLORS} from '../components/utils/colors';
import {hp, wp} from '../components/utils/responsive';

export default function Profile() {
  const {user, setIsAuthenticated} = useAuth();
  const dataUser = typeof user !== 'undefined' && JSON.parse(user);

  const handleLogout = () => {
    clearItem('user');
    setIsAuthenticated(false);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.text}>Hey {dataUser?.username}</Text>

      <View style={styles.container}>
        <Button title="Logout" onPress={handleLogout} color={COLORS.orange} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  container: {
    marginVertical: hp('10%'),
    width: wp('40%'),
  },
});
