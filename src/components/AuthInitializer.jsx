import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthFromStorage } from '../redux/auth/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there's auth data in sessionStorage
    const authData = sessionStorage.getItem('auth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        if (parsedAuth.token && parsedAuth.email) {
          // Restore auth state from sessionStorage
          dispatch(setAuthFromStorage(parsedAuth));
        }
      } catch (error) {
        console.error('Error parsing auth data from sessionStorage:', error);
        // Clear invalid data
        sessionStorage.removeItem('auth');
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
