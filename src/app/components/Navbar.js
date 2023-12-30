"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Button from "./Button";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBars
} from "@fortawesome/free-solid-svg-icons";
import { PRIMARY_COLOR } from "../constants";

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <div style={{
                width: "100%",
                backgroundColor: "#FFFBFA",
                height: 75,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 30,
                paddingRight: 30,
                alignItems: "center"
            }}>
                <h3 style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Hungry</h3>
                {!isMobile &&
                    <ul style={{ color: PRIMARY_COLOR, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <li>
                            <Link href="/openings">
                                <p>Openings</p>
                            </Link>
                        </li>
                        <li style={{marginLeft: 20}}>
                            <Link href="/about">
                                <Button style={{backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center" }}>
                                    <span style={{color: 'white', fontWeight: 600}}>Apply</span>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                }

                {isMobile &&
                    <Button onPress={() => {
                        setIsVisible(!isVisible)
                    }} style={{ padding: 0 }}>
                        <FontAwesomeIcon
                            icon={faBars}
                            color={PRIMARY_COLOR}
                        />
                    </Button>}
            </div>
            {isMobile && <Drawer isVisible={isVisible} />}
        </>
    )
}

const Drawer = ({ isVisible }) => {
    return (
        <motion.div
            animate={{
                opacity: isVisible ? 1 : 0
            }}
            initial={{
                backgroundColor: "black",
                width: "100%",
                height: "100%",
                position: "fixed",
                display: "flex",
                height: 80,
                zIndex: 5
            }}>
            <h1> Drawer </h1>
        </motion.div>
    )
}

export default Navbar;