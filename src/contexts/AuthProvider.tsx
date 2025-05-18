
import React, { createContext, useContext, useState, useEffect } from 'react';

// User roles definition
type UserRole = 'guest' | 'customer' | 'superuser' | 'admin';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Auth context state interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  checkAuthStatus: () => {},
});

// Mock user data (simulating what would come from a backend)
const mockUsers = [
  {
    id: '1',
    email: 'admin@vicarperu.com',
    name: 'Admin',
    password: 'admin123',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'superuser@vicarperu.com',
    name: 'Superuser',
    password: 'super123',
    role: 'superuser' as UserRole,
  },
  {
    id: '3',
    email: 'customer@vicarperu.com',
    name: 'Customer',
    password: 'customer123',
    role: 'customer' as UserRole,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check if the user is already logged in
  const checkAuthStatus = () => {
    const storedToken = localStorage.getItem('vicar_token');
    const storedUser = localStorage.getItem('vicar_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  };

  // Check auth status when the component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user in mock data
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      // Create a userObject without the password
      const userObject = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      
      // Generate a mock token
      const mockToken = `mock-token-${Date.now()}`;
      
      // Update state
      setIsAuthenticated(true);
      setUser(userObject);
      setToken(mockToken);
      
      // Store in localStorage
      localStorage.setItem('vicar_token', mockToken);
      localStorage.setItem('vicar_user', JSON.stringify(userObject));
      
      return true;
    }
    
    return false;
  };

  // Register function
  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      return false;
    }
    
    // Create new user (in a real app, this would be handled by the backend)
    const newUser = {
      id: `${mockUsers.length + 1}`,
      email: userData.email,
      name: userData.name,
      role: 'customer' as UserRole,
    };
    
    // Generate a mock token
    const mockToken = `mock-token-${Date.now()}`;
    
    // Update state
    setIsAuthenticated(true);
    setUser(newUser);
    setToken(mockToken);
    
    // Store in localStorage
    localStorage.setItem('vicar_token', mockToken);
    localStorage.setItem('vicar_user', JSON.stringify(newUser));
    
    return true;
  };

  // Logout function
  const logout = () => {
    // Clear state
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    
    // Remove from localStorage
    localStorage.removeItem('vicar_token');
    localStorage.removeItem('vicar_user');
  };

  const authContextValue = {
    isAuthenticated,
    user,
    token,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
