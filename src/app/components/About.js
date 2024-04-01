"use client"
import { motion } from "framer-motion";
import { COMPANY_NAME } from "../constants";
import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PRIMARY_COLOR } from "../constants";

const About = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <motion.div
            style={{
                padding: isMobile ? 50 : 100,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'center' : 'space-between',
                alignItems: isMobile ? 'center' : null,
            }}>
            <div style={{
                width: isMobile ? '100%' : '35%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: isMobile ? 0 : 30
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
                        textAlign: isMobile ? "center" : null,
                        // fontWeight: 700
                    }}
                >
                    About {COMPANY_NAME}
                </motion.h2>
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.75}}
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
                    width: isMobile ? "75%" : "50%",
                    display: "flex",
                    justifyContent: "center",
                    position: 'relative',
                    padding: isMobile ? 0 : 50
                }}
                initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50 }}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 }
                    }}
                    >
                {/* might remove this */}
                {!isMobile && <><div style={{
                    backgroundColor: PRIMARY_COLOR, 
                    width: 50, 
                    height: 50, 
                    borderRadius: 50, 
                    position: "absolute", 
                    zIndex: -1,
                    bottom: 30,
                    right: 120
                }}>&nbsp;</div>
                <div style={{
                    backgroundColor: PRIMARY_COLOR, 
                    width: 75, 
                    height: 75, 
                    borderRadius: 75, 
                    position: "absolute", 
                    zIndex: -1,
                    top: 30,
                    right: 80
                }}>&nbsp;</div>
                <div style={{
                    backgroundColor: PRIMARY_COLOR, 
                    width: 100, 
                    height: 100, 
                    borderRadius: 100, 
                    position: "absolute", 
                    zIndex: -1,
                    top: 150,
                    left: 10
                }}>&nbsp;</div></>}
                <Image
                    src={require('../../../public/about.jpg')}
                    width={50}
                    height={50}
                    style={{
                        width: isMobile ? "70%" : "100%",
                        aspectRatio: 1,
                        objectFit: 'cover',
                        borderRadius: 0,
                        marginTop: isMobile ? 30 : 0,
                        borderRadius: isMobile ? 500 : 0
                    }}
                    unoptimized />
            </motion.div>
        </motion.div>
    )
}

export default About;