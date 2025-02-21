import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const register = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const getProfile = async () => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No hay token disponible");
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = await response.json();

      setEmail(data.email);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
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

  if (!token) return null;
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

export default UserContext;
