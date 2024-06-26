import {View, Button} from 'react-native';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {ProductType, updateProduct} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import InputLabel from '../atoms/InputLabel';

const EditProduct = ({route}: any) => {
  const {item} = route.params;

  const navigation = useNavigation();

  const mutationUpdateProduct = useMutation({
    mutationFn: async (pr: ProductType) => updateProduct(pr),
    onSuccess: () => {
      navigation.goBack();
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleUpdateProduct = (values: any) => {
    mutationUpdateProduct.mutate(values);
  };

  return (
    <Formik
      initialValues={{
        category: item.category,
        price: item.price,
        description: item.description,
        id: item.id,
      }}
      onSubmit={values => {
        values.id = item.id;
        handleUpdateProduct(values);
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View>
          <InputLabel
            label="Price"
            value={values.price}
            setValue={handleChange('price')}
          />
          <InputLabel
            label="category"
            value={values.category}
            setValue={handleChange('category')}
          />
          <InputLabel
            label="description"
            value={values.description}
            setValue={handleChange('description')}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default EditProduct;
