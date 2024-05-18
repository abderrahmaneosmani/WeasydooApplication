import React, {useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Product} from '../components/products/Product';
import Search from '../components/Search';
import CategoryFilter from '../components/CategoryFilter';

const Products = () => {
  const [products, setProducts] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);
  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <CategoryFilter
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.container}
        data={products}
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Products;
