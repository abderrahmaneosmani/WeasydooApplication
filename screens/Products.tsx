import React from 'react';
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
import {
  ProductType,
  fetchCategories,
  fetchProductByCategory,
  fetchProducts,
} from '../services/api';
import {isTablet, wp} from '../components/utils/responsive';
import {COLORS} from '../components/utils/colors';
import {useQuery} from '@tanstack/react-query';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState([]);

  const {
    data: DataCategories,
    isLoading: isLoadingCategory,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
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

  const {data: productsByCategory} = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductByCategory(selectedCategory),
    enabled: selectedCategory !== 'All',
    initialData: [],
  });

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = async (text: string) => {
    setSearchQuery(text);
  };
  React.useEffect(() => {
    const filterProducts =
      selectedCategory === 'All' ? ProductsData : productsByCategory;

    if (searchQuery) {
      const filtered = filterProducts.filter((product: ProductType) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filtered);
    } else {
      setProducts(filterProducts);
    }
  }, [selectedCategory, searchQuery, ProductsData, productsByCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchChange={handleSearchChange}
      />
      {isLoadingCategory && (
        <ActivityIndicator size="small" color={COLORS.primary} />
      )}
      {isErrorCategories && <Text>{errorCategories?.message}</Text>}

      <CategoryFilter
        selectedCategory={selectedCategory}
        categories={DataCategories}
        onSelectCategory={handleSelectCategory}
      />
      {isLoadingProducts && (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
      {isErrorProducts && <Text>{errorProduct?.message}</Text>}
      <FlatList
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={styles.container}
        data={products}
        renderItem={({item}) => <Product item={item} />}
        keyExtractor={(item: any) => item.id}
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
