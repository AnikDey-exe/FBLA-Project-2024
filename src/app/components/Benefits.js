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
    const db = getFirestore(firebase_app)

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
                marginTop: 20
            }}>
                {benefits.map((benefit, i) => {
                    return (
                        <Card
                            title={benefit.title}
                            description={benefit.description}
                            imageSrc={benefit.image}
                            key={i}
                            index={i}
                            isMobile={isMobile} />
                    )
                })}
            </div>
            <div style={{
                display:"flex",
                flexDirection: "row"
            }}>
                <Button
                    style={{
                        marginTop: 20
                    }}>
                    <Link href="/openings">
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
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
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
                    width: '50%',
                    aspectRatio: 1
                }}
                unoptimized />
            <h4 style={{ marginTop: 10 }}>{title}</h4>
            <p style={{ marginTop: 10 }}>{description}</p>
        </motion.div>
    )
}

export default Benefits;