import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconO from 'react-native-vector-icons/Octicons';
import {COLORS} from '../utils/colors';
import {calculateStars} from '../utils';
import {hp, wp} from '../utils/responsive';

const ProductDetails = ({route}: any) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.price}>{item.price}</Text>
        <Text>{item.title}</Text>
        <View style={styles.starts}>
          {calculateStars(item.rating.rate).map(star => (
            <IconO
              color={COLORS.yellow}
              name="star-fill"
              size={20}
              key={star}
            />
          ))}
          <IconO name="star-fill" size={20} />
          <IconO name="star-fill" size={20} />
        </View>
        <Text>About</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add to cart" color={COLORS.orange} />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: wp('80%'),
    justifyContent: 'center',
    margin: 'auto',
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
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
  },
  image: {
    width: wp('60%'),
    height: hp('30%'),
    borderRadius: 30,
    marginRight: 16,
  },
  buttonContainer: {
    margin: 'auto',
    width: wp('60%'),
    height: hp('10%'),
    borderRadius: 15,
  },
});
