import React, {createContext, useContext, useState} from 'react';
import {getItem} from '../components/utils';

export type AUTH_CONTEXT = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  setIsAuthenticated: any;
  setIsAdmin: any;
  user: any;
  setUser: any;
  dataProducts: any;
  setDataProducts: any;
};

export const AuthContext = createContext<AUTH_CONTEXT>({
  isAdmin: false,
  isAuthenticated: false,
  setIsAuthenticated: undefined,
  setIsAdmin: undefined,
  user: undefined,
  setUser: undefined,
  setDataProducts: undefined,
  dataProducts: [],
});

export const AuthProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = React.useState(undefined);
  const [dataProducts, setDataProducts] = React.useState([]);

  const checkUser = async () => {
    const dataUser = await getItem('user');
    if (dataUser) {
      setIsAuthenticated(true);
      if (typeof dataUser === 'object') {
        const validData = JSON.parse(dataUser.user);
        if (validData) {
          setUser(JSON.parse(dataUser.user));
        }
      }
    }
  };

  React.useEffect(() => {
    checkUser();
  }, [isAuthenticated]);
  React.useEffect(() => {
    if (isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        user,
        setUser,
        setDataProducts,
        setIsAuthenticated,
        setIsAdmin,
        dataProducts,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
