import React, {useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Product} from '../components/products/Product';
import Search from '../components/Search';
import CategoryFilter from '../components/CategoryFilter';
import useAuth from '../hooks/userAuth';
import {ProductType, fetchProducts} from '../services/api';
import {isTablet, wp} from '../components/utils/responsive';
import {COLORS} from '../components/utils/colors';

const Products = () => {
  const {data, setData} = useAuth();
  const [categories, setCategories] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = async (text: string) => {
    const result: any = [];
    data.forEach((product: ProductType) => {
      if (product.title.includes(text)) {
        result.push(product);
      }
    });
    if (text.length === 0) {
      fetchProducts().then(res => {
        setData(res);
      });
    }
    setSearchQuery(text);
    setData(result);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    fetchProducts().then(res => setData(res));
  }, [setData]);

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://fakestoreapi.com/products';
        if (selectedCategory !== 'All') {
          url += `/category/${selectedCategory}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, setData]);

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
      <FlatList
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={styles.container}
        data={data}
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
