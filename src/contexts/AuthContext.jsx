import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('todo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password) => {
    // This is a mock login - replace with your Laravel API call
    // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
    };
    
    setUser(mockUser);
    localStorage.setItem('todo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };
  const signup = async (name, email, password) => {
    // Replace with your Laravel API call
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = {
      id: Date.now().toString(),
      name,
      email,
    };
    
    setUser(mockUser);
    localStorage.setItem('todo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todo_user');
    localStorage.removeItem('todos');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};