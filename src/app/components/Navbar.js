"use client";

import React, { useState, useContext, useEffect } from "react";
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
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");
    const [isVisible, setIsVisible] = useState(false);
    const [accountClicked, setAccountClicked] = useState(false);

    const [navbarOpacity, setNavbarOpacity] = useState(1);

    const { currentUser, setCurrentUser } = useContext(User);

    // gets the current path of page (/, /benefits, /apply, etc)
    const pathname = usePathname()

    useEffect(() => {
        // sets the navbar to always visible if the page is not the home page, benefits page, openings page, or choose opening page
        if(pathname !== "/" && pathname !== "/benefits" && pathname !== "/openings" && pathname !== "/choose") setNavbarOpacity(1)
        const handle = () => {
            if (window.scrollY > 600 || window.scrollY < 75) { // checks if user has scrolled to the top or bottom parts of the webpage
                if (navbarOpacity == 0) {
                    setNavbarOpacity(1) // make navbar visible
                }
            } else { // checks if user is scrolling through the middle of the webpage
                if (navbarOpacity == 1) {
                    setNavbarOpacity(0) // make navbar hidden
                }
            }
        }
        // only apply the scroll event listener if the device is not a mobile device or the page is the home page, benefits page, openings page, or choose openings page
        if (!isMobile && (pathname === "/" || pathname === "/benefits" || pathname === "/openings" || pathname === "/choose")) {
            window.addEventListener('scroll', handle)
        }
        return () => {
            window.removeEventListener("scroll", handle);
        };
    })

    return (
        <>
            <div style={{
                width: "100%",
                // backgroundColor: "#fffef2",
                backgroundColor: "white",
                height: 75,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 30,
                paddingRight: 30,
                alignItems: "center",
                position: !isMobile && (pathname === "/" || pathname === "/benefits" || pathname === "/openings" || pathname === "/choose") && "fixed",
                zIndex: 10,
                opacity: !isMobile ? navbarOpacity : 1,
                transition: "all 0.15s ease-out"
            }}>
                <Link href="/">
                    <Image
                        src={require('../../../public/icon2.png')}
                        width={30}
                        height={30}
                        unoptimized />
                </Link>
                {!isMobile &&
                    <ul style={{ color: PRIMARY_COLOR, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <li>
                            <Link href="/openings">
                                <p>Openings</p>
                            </Link>
                        </li>
                        <li style={{ marginLeft: 20 }}>
                            <Link href="/benefits">
                                <p>Benefits</p>
                            </Link>
                        </li>
                        <li style={{ marginLeft: 20 }}>
                            {currentUser == "" ?
                                <Link href="/signup">
                                    <Button style={{ backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center" }}>
                                        <span style={{ color: 'white', fontWeight: 600 }}>Sign Up</span>
                                    </Button>
                                </Link> :
                                <Button style={{ padding: 0, width: 'fit-content' }} onPress={() => {
                                    setAccountClicked(!accountClicked)
                                }}>
                                    <AccountDrawer isVisible={accountClicked} onClose={()=>{setAccountClicked(false)}}/>
                                    <span>Account</span>
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
            {isMobile && <Drawer isVisible={isVisible} onClose={() => { setIsVisible(false) }} />}

        </>
    )
}

const Drawer = ({ isVisible, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(User);

    return (
        <motion.div
            animate={{
                opacity: isVisible ? 1 : 0,
                zIndex: isVisible ? 1000 : -9999
            }}
            initial={{
                backgroundColor: PRIMARY_COLOR,
                width: "100%",
                position: "absolute",
                top: 75,
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
                padding: 20,
                zIndex: 5,
                alignItems: "center",
                justifyContent: "center"
            }}
            style={{
                pointerEvents: !isVisible && "none"
            }}>
            <ul
                style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <li>
                    <Link href="/openings" onClick={onClose}>
                        <p>Openings</p>
                    </Link>
                </li>
                <li style={{ marginLeft: 0 }}>
                    <Link href="/benefits" onClick={onClose}>
                        <p>Benefits</p>
                    </Link>
                </li>
                <li style={{ marginLeft: 0 }}>
                    {currentUser == "" ?
                        <Link href="/signup" onClick={onClose}>
                            <Button style={{
                                backgroundColor: 'white',
                                height: 30,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10
                            }}>
                                <span style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>Sign Up</span>
                            </Button>
                        </Link> :
                        <>
                            <li style={{ marginLeft: 0, textAlign: 'center' }}>
                                <Link href="/profile" onClick={onClose}>
                                    <p>Profile</p>
                                </Link>
                            </li>
                            <Button style={{
                                backgroundColor: 'white',
                                height: 30,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10
                            }} onPress={async () => {
                                const error = await signOutUser();
                                if (error) return;
                                setCurrentUser('');
                                localStorage.setItem("currentUserEmail", "");
                            }} >
                                <span style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>Sign Out</span>
                            </Button>
                        </>
                    }
                </li>
            </ul>
        </motion.div>
    )
}

const AccountDrawer = ({ isVisible, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(User);

    return (
        <motion.div
            animate={{
                opacity: isVisible ? 1 : 0,
                zIndex: isVisible ? 1000 : -9999
            }}
            initial={{
                backgroundColor: "white",
                width: 110,
                height: "fit-content",
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: 55,
                right: 10,
                zIndex: 5,
                padding: 5
            }}
            style={{
                pointerEvents: !isVisible && "none"
            }}>
            <Link href="/profile" style={{ marginTop: 5, marginBottom: 5 }} onClick={onClose}>
                <span>Profile</span>
            </Link>
            <hr />
            <Button onPress={async () => {
                const error = await signOutUser();
                if (error) return;
                setCurrentUser('');
                localStorage.setItem("currentUserEmail", "");
            }} style={{ marginTop: 5, marginBottom: 5, width: "100%", padding: 0 }}>
                <span>Sign Out</span>
            </Button>
        </motion.div>
    )
}

export default Navbar;