"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Image from "next/image";
import { benefits, PRIMARY_COLOR } from "../constants";
import Button from "./Button";
import firebase_app from "../../../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Link from "next/link";

const Benefits = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <motion.div
            style={{
                padding: isMobile ? 50 : 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50 }}
                variants={{
                    visible: { x: 0 },
                    hidden: { x: -300 }
                }}
                style={{ textAlign: 'center' }}>
                Join Our Team
            </motion.h2>
            {/* <a href="https://www.flaticon.com/free-icons/rest" title="rest icons">Rest icons created by Chattapat - Flaticon</a> */}
            {/* unlimited pto, medical insurance, 401K retirement */}
            <div style={{
                display: isMobile ? 'flex' : 'grid',
                flexDirection: 'column',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: '1fr',
                justifyContent: 'center',
                gap: 20,
                marginTop: isMobile ? 20: 50
            }}>
                {isMobile ?
                    benefits.map((benefit, i) => {
                        return (
                            <MobileCard
                                title={benefit.title}
                                description={benefit.description}
                                imageSrc={benefit.image}
                                key={i}
                                index={i}
                                isMobile={isMobile} />
                        )
                    }) : benefits.map((benefit, i) => {
                        return (
                            <Card
                                title={benefit.title}
                                description={benefit.description}
                                imageSrc={benefit.image}
                                key={i}
                                index={i} />
                        )
                    })}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <Button
                    style={{
                        marginTop: 20
                    }}>
                    <Link href="/benefits">
                        <span style={{ color: PRIMARY_COLOR, fontWeight: 700 }}>Learn More</span>
                    </Link>
                </Button>
                <Button
                    style={{
                        marginTop: 20
                    }}>
                    <Link href="/openings">
                        <span style={{ color: PRIMARY_COLOR, fontWeight: 700 }}>Join Now</span>
                    </Link>
                </Button>
            </div>
        </motion.div>
    )
}

const Card = ({ title, description, imageSrc, index, isMobile }) => {
    return (
        <motion.div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: "0px 0px 10px #ccc",
                backgroundColor: "white",
                padding: 0,
                transition: "all 0.5s ease-out",
                borderRadius: 5,
                // borderWidth: 1,
                // borderColor: 'black', 
                // borderStyle: 'solid'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50, delay: index * 0.4 }}
            variants={{
                visible: { y: 0 },
                hidden: { y: 200 }
            }}>
            <Image
                src={require(`../../../public/${imageSrc}`)}
                width={50}
                height={50}
                style={{
                    width: '100%',
                    // aspectRatio: 1,
                    objectFit: "cover",
                    height: 200,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                }}
                unoptimized />
            <div style={{padding: 20, textAlign: "left"}}>
                <h5 style={{ marginTop: 5, color: PRIMARY_COLOR, fontWeight: "bold" }}>{title}</h5>
                <p style={{ marginTop: 10 }}>{description}</p>
            </div>
        </motion.div>
    )
}

const MobileCard = ({ title, description, imageSrc, index }) => {
    return (
        <motion.div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: "0px 0px 10px #ccc",
                backgroundColor: "white",
                padding: 0,
                transition: "all 0.5s ease-out",
                borderRadius: 5,
                // borderWidth: 1,
                // borderColor: 'black', 
                // borderStyle: 'solid'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50 }}
            variants={{
                visible: { x: 0 },
                hidden: { x: -200 }
            }}>
            <Image
                src={require(`../../../public/${imageSrc}`)}
                width={50}
                height={50}
                style={{
                    width: '100%',
                    // aspectRatio: 1,
                    objectFit: "cover",
                    height: 200,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                }}
                unoptimized />
            <div style={{padding: 20, textAlign: "left"}}>
                <h5 style={{ marginTop: 5, color: PRIMARY_COLOR, fontWeight: "bold" }}>{title}</h5>
                <p style={{ marginTop: 10 }}>{description}</p>
            </div>
        </motion.div>
    )
}

export default Benefits;