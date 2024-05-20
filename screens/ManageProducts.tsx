import {Button, FlatList, View} from 'react-native';
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

const ManageProducts = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {data: products} = useQuery({
    queryFn: fetchProducts,
    queryKey: ['products'],
  });
  const handleNavigateAddProduct = () => {
    navigation.navigate(SCREEN.AddProduct);
  };
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
