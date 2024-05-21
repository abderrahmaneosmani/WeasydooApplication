import {Button, FlatList, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchProducts} from '../services/api';
import {ProductItem} from '../components/products/ProductItem';
import {SCREEN} from './enum.screen';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import useAuth from '../hooks/userAuth';

const ManageProducts = () => {
  const {isAuthenticated} = useAuth();

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {data: products} = useQuery({
    queryFn: fetchProducts,
    queryKey: ['products'],
  });
  const handleNavigateAddProduct = () => {
    navigation.navigate(SCREEN.AddProduct);
  };
  if (!isAuthenticated) {
    return <Text>This page not Allowed</Text>;
  }
  return (
    <View>
      <View style={{width: 200, padding: 4}}>
        <Button title="Add new Product" onPress={handleNavigateAddProduct} />
      </View>
      <FlatList
        numColumns={1}
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ManageProducts;
