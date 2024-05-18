import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductDetails = ({route}: any) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.price}>{item.price}</Text>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  item: {
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginTop: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 200,
  },
  price: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginRight: 16,
  },
});
