import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../screens/enum.screen';
import {useMutation} from '@tanstack/react-query';
import {deleteProduct} from '../../services/api';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export const ProductItem = ({item}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const handleNavigateToProductEdit = () => {
    navigation.navigate(SCREEN.EditProduct as string, {
      item,
    });
  };

  const mutationDeleteProduct = useMutation({
    mutationFn: async (id: number) => deleteProduct(id),
  });
  const handleDeleteProduct = () => {
    mutationDeleteProduct.mutate(item.id);
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: handleDeleteProduct},
      ],
    );
  };
  return (
    <TouchableOpacity>
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text>{item.category}</Text>
        <View style={styles.actions}>
          <Button
            title="Edit"
            color="#841584"
            onPress={handleNavigateToProductEdit}
          />
          <Button title="Delete" color="red" onPress={handleDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 20,
    height: 20,
  },
  button: {
    width: 40,
  },
  price: {
    fontWeight: 'bold',
  },
  actions: {
    width: 200,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
