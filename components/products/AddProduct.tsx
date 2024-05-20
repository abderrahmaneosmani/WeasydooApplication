import React from 'react';
import {ActivityIndicator, Button, View} from 'react-native';
import {Formik} from 'formik';
import InputLabel from '../atoms/InputLabel';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {ProductType, addProduct} from '../../services/api';

export const AddProduct = () => {
  const navigation = useNavigation();

  const mutationAddProduct = useMutation({
    mutationFn: async (pr: Omit<ProductType, 'id'>) => addProduct(pr),
    onSuccess: () => {
      navigation.goBack();
    },
    onError: error => {
      console.log('error', error);
    },
  });

  if (mutationAddProduct.isPending) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <Formik
      initialValues={{category: '', price: '', description: '', title: ''}}
      onSubmit={(values: Omit<ProductType, 'id'>) => {
        mutationAddProduct.mutate(values);
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View>
          <InputLabel
            label="title"
            value={values.title}
            setValue={handleChange('title')}
          />
          <InputLabel
            label="Price"
            value={values.price}
            setValue={handleChange('price')}
          />
          <InputLabel
            label="category"
            value={values?.category}
            setValue={handleChange('category')}
          />
          <InputLabel
            label="description"
            value={values?.description}
            setValue={handleChange('description')}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
