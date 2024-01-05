"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PRIMARY_COLOR } from "../constants";
import Link from "next/link";

const HeroBanner = ({ title, backgroundImage, hasButton }) => {
    const isMobile = useMediaQuery("(max-width: 940px)");

    return (
        <>
            <motion.div
                animate={{

                }}
                initial={{
                    backgroundColor: "#FFFBFA",
                    display: "flex",
                    position: "relative",
                    height: 600
                }}>
                <Image
                    src={require(`../../../public/${backgroundImage}`)}
                    width={50}
                    height={50}
                    style={{
                        width: "100%",
                        objectFit: 'cover',
                        height: 600
                    }}
                    unoptimized />
                <motion.div animate={{
                    y: isMobile ? 120 : 157.5,
                    opacity: 1
                }}
                    initial={{
                        color: PRIMARY_COLOR,
                        translateY: -120,
                        padding: 30,
                        position: 'absolute',
                        top: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0
                    }}
                    transition={{ type: "spring", ease: "easeOut", duration: 1, stiffness: 50, delay: 0.75 }}>
                    <h1 style={{ textAlign: "center" }}>{title}</h1>
                    {hasButton &&
                        <Link href="/choose">
                            <Button style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: 30,
                                borderRadius: 30,
                                display: "flex",
                                alignItems: "center",
                                marginTop: 20
                            }}>
                                <span style={{ color: 'white', fontWeight: 600 }}>Apply Now</span>
                            </Button>
                        </Link>
                    }
                </motion.div>
            </motion.div>
        </>
    )
}

export default HeroBanner;