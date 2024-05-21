import AsyncStorage from '@react-native-async-storage/async-storage';

import {jwtDecode} from 'jwt-decode';

export const decodedToken = (token: string) => jwtDecode(token);
type Props = {
  starsFiled: number[];
  starsNotFiled: number[];
};
export const calculateStars = (rate: number): Props => {
  return {
    starsFiled: Array.from({length: rate}, (_, index) => index + 1),
    starsNotFiled: Array.from(
      {length: Math.ceil(5 - rate)},
      (_, index) => index + 1,
    ),
  };
};

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (key: string) => {
  try {
    const savedUser: string | null = await AsyncStorage.getItem(key);
    if (savedUser) {
      const currentUser = savedUser && JSON.parse(savedUser);
      if (currentUser) {
        return currentUser;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
