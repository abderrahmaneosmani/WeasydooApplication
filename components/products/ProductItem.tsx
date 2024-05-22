import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../screens/enum.screen';
import {useMutation} from '@tanstack/react-query';
import {deleteProduct} from '../../services/api';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {COLORS} from '../utils/colors';
import {hp, isTablet, wp} from '../utils/responsive';
import IconO from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';
import useAuth from '../../hooks/userAuth';

export const ProductItem = ({item}: any) => {
  const {isAdmin} = useAuth();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const handleNavigateToProductEdit = () => {
    navigation.navigate(SCREEN.EditProduct as string, {
      item,
    });
  };

  const mutationDeleteProduct = useMutation({
    mutationFn: async (id: number) => deleteProduct(id),
  });
  const handleDeleteProduct = () => {
    mutationDeleteProduct.mutate(item.id);
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: handleDeleteProduct},
      ],
    );
  };
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price} $</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        {isAdmin && (
          <View style={styles.actions}>
            <TouchableHighlight onPress={handleNavigateToProductEdit}>
              <IconFeather color={COLORS.primary} size={30} name="edit" />
            </TouchableHighlight>
            <TouchableHighlight onPress={handleDelete}>
              <IconO color="red" size={30} name="trash" />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    borderRadius: hp('3%'),
    width: isTablet ? wp('35%') : wp('80%'),
    height: isTablet ? hp('40%') : hp('40%'),
    flex: 1,
    marginVertical: 8,
    marginHorizontal: isTablet ? wp('4%') : wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isTablet ? wp('2%') : wp('1%'),
  },
  item: {
    width: isTablet ? wp('30%') : wp('80%'),
    height: isTablet ? hp('30%') : hp('30%'),
  },
  image: {
    width: isTablet ? wp('15%') : wp('80%'),
    height: isTablet ? hp('15%') : hp('15%'),
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  category: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },

  price: {
    fontWeight: 'bold',
    paddingVertical: hp('1%'),
    fontFamily: 'Montserrat',
  },
  actions: {
    width: isTablet ? wp('30%') : wp('50%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
});
