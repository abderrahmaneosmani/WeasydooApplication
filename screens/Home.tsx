import {Button, Text, View} from 'react-native';
import {SCREEN} from './enum.screen';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home is!</Text>
      <Button
        title="Go to Details s"
        onPress={() => {
          navigation.navigate(SCREEN.ProductsList);
        }}
      />
      <Button
        title="Go to Details login"
        onPress={() => {
          navigation.navigate(SCREEN.Login);
        }}
      />
    </View>
  );
}
