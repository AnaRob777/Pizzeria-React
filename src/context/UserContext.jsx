import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();


export const useUser = () => {
  return useContext(UserContext);
};


export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true);

  const login = () => setToken(true);
  const logout = () => setToken(false);

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { token } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
    }
  }, [token, navigate]);

  if (!token) {
    return null; 
  }

  return children; 
};


export const RedirectIfAuthenticated = ({ children }) => {
  const { token } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  }, [token, navigate]);

  return children; 
};
