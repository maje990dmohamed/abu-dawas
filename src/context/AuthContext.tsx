import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children } : any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage?.getItem(import.meta.env.VITE_SECRET_AUTH) || false);
  const [user, setUser] = useState(null);

  const login = (userData : any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};