import React, {createContext, useContext, useState} from 'react';
import {decodedToken, getItem} from '../components/utils';
import {idsOfUserAdmin} from '../screens/Login';

export type AUTH_CONTEXT = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  setIsAuthenticated: any;
  setIsAdmin: any;
  user: any;
  setUser: any;
};

export const AuthContext = createContext<AUTH_CONTEXT>({
  isAdmin: false,
  isAuthenticated: false,
  setIsAuthenticated: undefined,
  setIsAdmin: undefined,
  user: undefined,
  setUser: undefined,
});

export const AuthProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = React.useState(undefined);

  const checkUser = async () => {
    const dataUser = await getItem('user');

    if (typeof dataUser === 'string') {
      const us = JSON.parse(dataUser);
      const usr = decodedToken(us?.token);
      setIsAuthenticated(true);
      setIsAdmin(idsOfUserAdmin.includes(Number(usr?.sub)));
      setUser(us);
    }
  };

  React.useEffect(() => {
    checkUser();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        setIsAdmin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
