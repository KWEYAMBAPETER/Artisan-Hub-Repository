import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { getToken, setToken, removeToken } from "../utilities/helpers.js";
import { API_URL, BEARER } from "../constants.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(getToken() || null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        
        const fetchUser = async () => {
            if (authToken) {
                try {
                    const res = await axios.get(`${API_URL}/users/me`, { headers: {
                        Authorization: `${BEARER} ${authToken}`,
                        },
                    });

                    setUser(res.data);
                } catch (err) {
                    console.error("Auth Error:", err);
                    setAuthToken(null);
                    setUser(null)
                } 
            }

            setIsLoading(false);
        };

        fetchUser();
    }, [authToken]);

    const login = (token, user) => {
        setToken(token);
        setAuthToken(token);
        setUser(user);
    };

    const logout = () => {
        removeToken()
        setAuthToken(null);
        setUser(null);
    };

    const updateUser = (newUserDetails) => {
        setUser(prev => ({...prev, ...newUserDetails}))
    }

    return (
        <AuthContext.Provider value={{ user, authToken, login, logout, isLoading, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}