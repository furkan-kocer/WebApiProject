import { useState } from 'react';

export default function useToken() {
 
  const getToken = () => {
    const tokenString = window.localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    userToken = "deneme"
    const token1=window.localStorage.setItem('token', JSON.stringify(userToken));
    setToken(token1);
  };

  return {
    setToken: saveToken,
    token
  }
}