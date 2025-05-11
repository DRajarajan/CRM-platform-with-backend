import { create } from 'zustand';

interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  
  // Actions
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,

  login: (userData: User) => {
    // Save auth data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    set({
      isAuthenticated: true,
      user: userData,
      isLoading: false,
    });
  },

  logout: () => {
    // Clear auth data from localStorage
    localStorage.removeItem('user');
    
    set({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  },

  checkAuth: () => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        set({
          isAuthenticated: true,
          user: parsedData,
          isLoading: false,
        });
      } catch (error) {
        // Handle invalid data
        localStorage.removeItem('user');
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    } else {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },
}));