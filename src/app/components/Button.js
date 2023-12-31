"use client"; 

import React from "react";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";

// custom styled button used throughout the website
const Button = ({children, onPress, style={}}) => {
    return (
        <button onClick={onPress} style={{
            width: 'fit-content',
            padding: 20,
            ...style
        }}>
            {children}
        </button>
    )
}

export default Button;