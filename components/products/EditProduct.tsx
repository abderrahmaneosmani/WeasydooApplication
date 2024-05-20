import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {ProductType, updateProduct} from '../../services/api';
import {useNavigation} from '@react-navigation/native';

const EditProduct = ({route}: any) => {
  const {item} = route.params;
  const [title, setTitle] = React.useState(item.title);
  const [price, setPrice] = React.useState(item.price);
  const [category, setCategory] = React.useState(item.category);
  const [description, setDescription] = React.useState(item.description);
  const navigation = useNavigation();

  const mutationUpdateProduct = useMutation({
    mutationFn: async (pr: ProductType) => updateProduct(pr),
    onSuccess: data => {
      console.log('data is', data);
      navigation.goBack();
    },
  });

  const handleUpdateProduct = () => {
    const product = {title, price, category, description, id: item.id};
    mutationUpdateProduct.mutate(product);
    if (mutationUpdateProduct.isSuccess) {
    }
  };

  return (
    <View>
      <Text>EditProduct</Text>
      <Text style={styles.text}>Title</Text>
      <TextInput placeholder="title" value={title} onChangeText={setTitle} />

      <Text style={styles.text}>Price</Text>
      <TextInput
        placeholder="price"
        value={price}
        keyboardType="number-pad"
        onChangeText={setPrice}
      />
      <Text style={styles.text}>Category</Text>
      <TextInput
        placeholder="price"
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.text}>Description</Text>
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update" onPress={handleUpdateProduct} />
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
