"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Button from "./Button";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars
} from "@fortawesome/free-solid-svg-icons";
import { COMPANY_NAME, PRIMARY_COLOR } from "../constants";
import { User } from "../contexts/UserContext";
import signOutUser from "../database/auth/signOut";

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");
    const [isVisible, setIsVisible] = useState(false);
    const [accountClicked, setAccountClicked] = useState(false);

    const { currentUser, setCurrentUser } = useContext(User);

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
                <Link href="/">
                    <h3 style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>{COMPANY_NAME}</h3>
                </Link>
                {!isMobile &&
                    <ul style={{ color: PRIMARY_COLOR, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <li>
                            <Link href="/openings">
                                <p>Openings</p>
                            </Link>
                        </li>
                        <li style={{ marginLeft: 20 }}>
                            {currentUser == "" ?
                                <Link href="/signup">
                                    <Button style={{ backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center" }}>
                                        <span style={{ color: 'white', fontWeight: 600 }}>Sign Up</span>
                                    </Button>
                                </Link> :
                                <Button style={{padding: 0, width: 100}} onPress={()=>{
                                    setAccountClicked(!accountClicked)
                                }}>
                                    <AccountDrawer isVisible={accountClicked}/>
                                    <span>My Account</span>
                                </Button>
                            }
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
                backgroundColor: PRIMARY_COLOR,
                width: "100%",
                position: "fixed",
                display: "flex",
                height: 80,
                zIndex: 5
            }}>
            <h1> Drawer </h1>
        </motion.div>
    )
}

const AccountDrawer = ({ isVisible }) => {
    const { currentUser, setCurrentUser } = useContext(User);

    return (
        <motion.div
            animate={{
                opacity: isVisible ? 1 : 0
            }}
            initial={{
                backgroundColor: "white",
                width: 100,
                height: "fit-content",
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: 55,
                // right: 0,
                zIndex: 5,
                padding: 5
            }}>
            <Link href="/profile" style={{marginTop: 5, marginBottom: 5}}>
                <span>Profile</span>
            </Link>
            <hr/>
            <Button onPress={async ()=>{
                const error = await signOutUser();
                if(error) return;
                setCurrentUser('');
                localStorage.setItem("currentUserEmail", "");
            }} style={{marginTop: 5, marginBottom: 5, width: "100%", padding: 0}}>
                <span>Sign Out</span>
            </Button>
        </motion.div>
    )
}

export default Navbar;