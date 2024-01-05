"use client";

import { useEffect, createContext, useState } from "react";

export const User = createContext(null);

// used to store the currently logged in user
// can be used throughout the website to fetch the currently logged in user
export default function UserContext({ children }) {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(()=>{
        setCurrentUser(localStorage.getItem("currentUserEmail") || "")
    }, [])

    return (
        <User.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </User.Provider>
    )
}