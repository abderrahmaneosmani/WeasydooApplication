import axios from 'axios';

export type ProductType = {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: RatingType;
};
export type RatingType = {
  rate: number;
  count: number;
};

export type CredentialType = {
  username: string;
  password: string;
};
export const loginUser = async ({credential}: {credential: CredentialType}) => {
  const user = await axios.post(
    'https://fakestoreapi.com/auth/login',
    credential,
  );
  if (user?.data) {
    return user?.data;
  }
};

export const fetchProducts = async () => {
  const products = await axios.get('https://fakestoreapi.com/products');
  if (products.data) {
    return products.data;
  }
};

export const addProduct = async (product: Omit<ProductType, 'id'>) => {
  try {
    const create_product = await axios.post(
      'https://fakestoreapi.com/products',
      product,
    );
    if (create_product.data) {
      return create_product.data;
    }
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
export const updateProduct = async (product: ProductType) => {
  try {
    const update_product = await axios.put(
      `https://fakestoreapi.com/products/${product.id}`,
      product,
    );
    if (update_product.data) {
      return update_product.data;
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const delete_product = await axios.delete(
      `https://fakestoreapi.com/products/${id}`,
    );
    if (delete_product.data) {
      return delete_product.data; // Access the data property directly
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Re-throw the error after logging it
  }
};
