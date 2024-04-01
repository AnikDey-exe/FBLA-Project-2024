"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PRIMARY_COLOR } from "../constants";
import Link from "next/link";

const HomeBanner = ({ title, image, hasButton }) => {
    const isMobile = useMediaQuery("(max-width: 940px)");

    return (
        <>
            <motion.div
                animate={{

                }}
                initial={{
                    backgroundColor: "#fffef2",
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    position: "relative",
                    height: 600,
                    paddingLeft: 30,
                    paddingRight: 30
                }}>
                <motion.div animate={{
                    // y: isMobile ? 120 : 157.5,
                    x: 200,
                    opacity: 1
                }}
                    initial={{
                        color: PRIMARY_COLOR,
                        translateX: -200,
                        // padding: 30,
                        // position: 'absolute',
                        top: 0,
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        opacity: 0
                    }}
                    transition={{ type: "spring", ease: "easeOut", duration: 1, stiffness: 50, delay: 0.75 }}>
                    <h1 style={{ textAlign: "left", color: "black", fontWeight: "300" }}>{title}</h1>
                    <h5 style={{color: "grey",marginTop: 10}}> Order your favorite meals from anywhere and avoid high fees! </h5>
                    {hasButton &&
                        <Link href="/choose">
                            <Button style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: 30,
                                borderRadius: 5,
                                display: "flex",
                                alignItems: "center",
                                marginTop: 20
                            }}>
                                <span style={{ color: 'white', fontWeight: 300 }}>Apply Now</span>
                            </Button>
                        </Link>
                    }
                </motion.div>
                <motion.div 
                initial={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: 'center',
                }}>
                    <Image
                        src={require(`../../../public/${image}`)}
                        width={50}
                        height={50}
                        style={{
                            width: "100%",
                            aspectRatio: "auto",
                            objectFit: 'contain',

                        }}
                        unoptimized
                    />
                </motion.div>
            </motion.div>
        </>
    )
}

export default HomeBanner;