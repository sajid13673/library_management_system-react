// utils/authProvider.js
import React, { createContext, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken as setTokenAction, removeToken as removeTokenAction } from '../Actions/authActions';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const setToken = (newToken) => {
    dispatch(setTokenAction(newToken));
  };

  const removeToken = () => {
    dispatch(removeTokenAction());
  };

  useMemo(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    removeToken,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
