"use client"
import { motion } from "framer-motion";
import { COMPANY_NAME } from "../constants";
import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";

const About = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <motion.div
            style={{
                padding: isMobile ? 50 : 100,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'center' : 'space-between',
                alignItems: isMobile ? 'center' : null
            }}>
            <div style={{
                width: isMobile ? '100%' : '50%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.75 }}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 }
                    }}
                    style={{
                        textAlign: isMobile ? "center" : null
                    }}
                >
                    About {COMPANY_NAME}
                </motion.h2>
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.75 }}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 }
                    }}
                    style={{
                        wordWrap: 'break-word',
                        marginTop: 7.5,
                        textAlign: isMobile ? "center" : null
                    }}>
                    {COMPANY_NAME} is a newly founded food delivery service made to provide maximum conveniency and safety for users. Our robust platform ensures that you can find your favorite meals from wherever you are and get them delivered in an instant at a low cost.
                </motion.p>
            </div>
            <motion.div
                style={{
                    width: isMobile ? "75%" : "30%",
                    display: "flex",
                    justifyContent: "center"
                }}
                initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50 }}
                    variants={{
                        visible: { x: 0 },
                        hidden: {  x: 100 }
                    }}>
                <Image
                    src={require('../../../public/about.jpg')}
                    width={50}
                    height={50}
                    style={{
                        width: isMobile ? "70%" : "100%",
                        aspectRatio: 1,
                        objectFit: 'cover',
                        borderRadius: 500,
                        marginTop: isMobile ? 30 : 0
                    }}
                    unoptimized />
            </motion.div>
        </motion.div>
    )
}

export default About;