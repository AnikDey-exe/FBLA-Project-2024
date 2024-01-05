"use client";

import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";

// warning component that is used throughout the website
const Warning = ({ message }) => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "fit-content", padding: 50 }}>
            <Image
                src={require("../../../public/warning.png")}
                style={{
                    width: isMobile ? "75%" : "20%",
                    aspectRatio: 1,
                    marginBottom: 30
                }}/>
            <h4 style={{textAlign: isMobile ? "center" : null}}>{message}</h4>
        </div>
    )
}

export default Warning;