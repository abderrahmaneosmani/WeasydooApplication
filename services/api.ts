import axios from 'axios';

export type ProductType = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
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
export const endPoint = 'https://fakestoreapi.com';
export const loginUser = async ({credential}: {credential: CredentialType}) => {
  const user = await axios.post(`${endPoint}/auth/login`, credential);
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
    const create_product = await axios.post(`${endPoint}/products`, product);
    if (create_product?.data) {
      return create_product?.data;
    }
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
export const updateProduct = async (product: ProductType) => {
  try {
    const update_product = await axios.put(
      `${endPoint}/products/${product.id}`,
      product,
    );
    if (update_product?.data) {
      return update_product?.data;
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const delete_product = await axios.delete(`${endPoint}/products/${id}`);
    if (delete_product?.data) {
      return delete_product?.data;
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${endPoint}/products/categories`);
    if (response?.data) {
      return response?.data;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
export const fetchProductByCategory = async (category: string) => {
  try {
    if (category === 'All') {
      return [];
    }
    const res = await axios.get(`${endPoint}/products/category/${category}`);
    return res?.data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
  }
};
