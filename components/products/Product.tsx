import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {wp, hp, isTablet} from '../utils/responsive';

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
    width: isTablet ? wp('30%') : wp('46.4%'),
    height: isTablet ? hp('30.1%') : hp('25.1%'),
    borderRadius: isTablet ? wp('2%') : wp('4%'),
    backgroundColor: '#f8f8f8',
    fontFamily: 'Montserrat',
    marginVertical: isTablet ? wp('4%') : wp('2%'),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isTablet ? wp('30%') : wp('47%'),
    height: isTablet ? hp('20%') : hp('15%'),
    flex: 1,
  },
  details: {
    paddingHorizontal: isTablet ? wp('2%') : wp('1%'),
  },
  image: {
    width: isTablet ? wp('28%') : wp('20%'),
    height: isTablet ? hp('18%') : hp('13%'),
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    width: wp('20%'),
    height: hp('5%'),
    fontSize: 14,
    gap: wp('2%'),
    paddingVertical: hp('0.5%'),
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'left',
  },
  price: {
    width: wp('20%'),
    height: hp('7%'),
    fontFamily: 'Inter',
    fontSize: 12.2,
    fontWeight: '800',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
  },
});
