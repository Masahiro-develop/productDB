import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const value = {
        user,
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }     
    })

    
    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
        return unSubscribed();
    }, []);

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}