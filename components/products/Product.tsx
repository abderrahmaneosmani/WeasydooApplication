import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {wp, hp} from '../utils/responsive';

type ItemProps = {
  item: {
    title: string;
    image: string;
    price: string;
  };
};
import {SCREEN} from '../../screens/enum.screen';

export const Product = ({item}: ItemProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleNavigateToProductDetails = () => {
    navigation.navigate(SCREEN.ProductDetails, {
      item,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToProductDetails}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price} $</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 174,
    height: 204,
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Montserrat',

    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 176,
    height: 118,
  },
  details: {
    paddingHorizontal: wp('1%'),
  },
  image: {
    width: wp('20%'),
    height: wp('25%'),
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    width: wp('20%'),
    height: hp('5%'),
    fontSize: 14,
    gap: 8,
    paddingVertical: hp('0.5%'),
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'left',
  },
  price: {
    width: 46,
    height: 15,
    fontFamily: 'Inter',
    fontSize: 12.2,
    fontWeight: '800',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
  },
});
