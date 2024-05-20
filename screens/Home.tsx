import {Button, Text, View} from 'react-native';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home is!</Text>
      <Button
        title="Go to Details s"
        onPress={() => {
          navigation.navigate('Products');
        }}
      />
      <Button
        title="Go to Details login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
}
