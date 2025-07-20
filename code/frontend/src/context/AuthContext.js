// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls to your backend

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Custom Hook to consume the Context easily
export const useAuth = () => useContext(AuthContext);

// 3. Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Effect to check for stored user data on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                // Attempt to parse stored user data
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                // If parsing fails, clear localStorage to prevent infinite loops/errors
                localStorage.removeItem('user');
            }
        }
        setLoading(false); // Authentication state is now determined
    }, []);

    // Function to handle user login
    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
            setUser(userData); // Update state
            return userData;
        } catch (error) {
            // Throw error message to be handled by the calling component (e.g., Login.jsx)
            throw error.response?.data?.message || error.message;
        }
    };

    // Function to handle user registration
    const register = async (name, email, password, type) => {
        try {
            const response = await axios.post('/api/users/register', { name, email, password, type });
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
            setUser(userData); // Update state
            return userData;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        setUser(null); // Clear user state
    };

    // Axios Interceptor: Automatically add JWT token to every request if user is logged in
    axios.interceptors.request.use(
        (config) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const token = JSON.parse(storedUser).token;
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
                    }
                } catch (e) {
                    console.error("Failed to parse token from localStorage during interceptor.", e);
                    // If stored user data is corrupt, log out
                    logout();
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Axios Interceptor: Handle 401 (Unauthorized) and 403 (Forbidden) responses
    axios.interceptors.response.use(
        (response) => response, // Pass through successful responses
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.warn(`Authentication error (${error.response.status}). Logging out user.`);
                logout(); // Log out user on auth failure
                // Optionally redirect to login page or show a global error message
                // window.location.href = '/login';
            }
            return Promise.reject(error); // Re-throw the error for component-specific handling
        }
    );

    // The context value that will be provided to all consuming components
    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    // Render children only when authentication state is no longer loading
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};