import React, {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Product} from '../components/products/Product';
import Search from '../components/Search';
import CategoryFilter from '../components/CategoryFilter';
import useAuth from '../hooks/userAuth';
import {ProductType, fetchCategories, fetchProducts} from '../services/api';
import {isTablet, wp} from '../components/utils/responsive';
import {COLORS} from '../components/utils/colors';
import {useQuery} from '@tanstack/react-query';

const Products = () => {
  const {dataProducts, setDataProducts} = useAuth();
  const [categories, setCategories] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const queryCategories = useQuery({
    queryFn: fetchCategories,
    queryKey: ['categories'],
  });

  const {
    data: ProductsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProduct,
  } = useQuery({
    queryFn: fetchProducts,
    queryKey: ['products'],
  });

  const handleSearchChange = async (text: string) => {
    const result: any = [];
    dataProducts.forEach((product: ProductType) => {
      if (product.title.includes(text)) {
        result.push(product);
      }
    });
    if (text.length === 0) {
      Products;
    }
    setSearchQuery(text);
    setDataProducts(result);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    if (queryCategories?.data) {
      const addAllToCategories = ['All', ...queryCategories.data];
      setCategories(addAllToCategories);
    }
  }, [queryCategories?.data]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://fakestoreapi.com/products';
        if (selectedCategory !== 'All') {
          url += `/category/${selectedCategory}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setDataProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, setDataProducts]);

  return (
    <SafeAreaView style={styles.container}>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchChange={handleSearchChange}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      {isLoadingProducts && (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
      {isErrorProducts && <Text>{errorProduct?.message}</Text>}
      <FlatList
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={styles.container}
        data={ProductsData}
        renderItem={({item}) => <Product item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: wp('4%'),
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Products;
