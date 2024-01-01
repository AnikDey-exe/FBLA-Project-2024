"use client";

import { useEffect, createContext, useState } from "react";

export const User = createContext(null);

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