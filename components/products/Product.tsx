import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

type ItemProps = {
  item: {
    title: string;
    image: string;
    price: string;
  };
};
import {SCREEN} from '../../screens/enum.screen';
export const Product = ({item}: ItemProps) => {
  const navigation = useNavigation();

  const handleNavigateToProductDetails = () => {
    navigation.navigate(SCREEN.ProductsList, {
      item,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToProductDetails}>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    width: 120,
    fontWeight: 'bold',
  },
});
