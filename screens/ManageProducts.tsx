import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
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
import {COLORS} from '../components/utils/colors';
import {isTablet, wp} from '../components/utils/responsive';

const ManageProducts = () => {
  const {isAuthenticated, isAdmin} = useAuth();

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
      <View style={styles.container}>
        {isAdmin && (
          <Button
            title="Add new Product"
            onPress={handleNavigateAddProduct}
            color={COLORS.orange}
          />
        )}
      </View>
      <FlatList
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={isTablet ? styles.wrapper : null}
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: wp('40%'),
    marginHorizontal: wp('9%'),
  },
});

export default ManageProducts;
