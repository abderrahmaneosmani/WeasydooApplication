import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import IconO from 'react-native-vector-icons/Octicons';
import {COLORS} from '../utils/colors';
import {calculateStars} from '../utils';
import {hp, isTablet, wp} from '../utils/responsive';

const ProductDetails = ({route}: any) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.price}>{item.price}</Text>
        <Text>{item.title}</Text>
        <View style={styles.starts}>
          {calculateStars(item.rating.rate).starsFiled.map(star => (
            <IconO
              color={COLORS.yellow}
              name="star-fill"
              size={20}
              key={star}
            />
          ))}
          {calculateStars(item.rating.rate).starsNotFiled.map(star => (
            <IconO name="star-fill" size={20} key={star} />
          ))}
        </View>
        <Text style={styles.about}>About </Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add to cart" color={COLORS.orange} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: isTablet ? wp('80%') : wp('70%'),
    justifyContent: 'center',
    margin: 'auto',
  },
  about: {
    paddingVertical: hp('1%'),
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  description: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  item: {
    backgroundColor: '#f8f8f8',
    padding: isTablet ? wp('2%') : wp('5%'),
    marginTop: hp('5%'),
    marginVertical: hp('4'),
    marginHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  starts: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  price: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  image: {
    width: isTablet ? wp('40%') : wp('60%'),
    height: isTablet ? hp('30%') : hp('30%'),
    borderRadius: 30,
    marginRight: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: isTablet ? hp('1%') : hp('2%'),
    width: isTablet ? wp('40%') : wp('40%'),
    height: isTablet ? hp('5%') : hp('10%'),
    borderRadius: isTablet ? hp('4%') : hp('5%'),
  },
});
