import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize isLoggedIn based on the presence of the token in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

    const login = () => {
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token'); // Ensure to remove token on logout
        localStorage.removeItem('userId'); // Remove user ID as well
        setIsLoggedIn(false);
    };

    // Effect to check token presence and adjust isLoggedIn accordingly
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
