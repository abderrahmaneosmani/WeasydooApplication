import {Button, FlatList, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchProducts} from '../services/api';
import {ProductItem} from '../components/products/ProductItem';

const ManageProducts = () => {
  const {data: products} = useQuery({
    queryFn: fetchProducts,
    queryKey: ['products'],
  });
  return (
    <View>
      <View style={{width: 200, padding: 4}}>
        <Button title="Add new Product" />
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
