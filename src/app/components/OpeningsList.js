"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import getDocuments from "../database/getDocs";
import { PRIMARY_COLOR } from "../constants";

const OpeningsList = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    const [openings, setOpenings] = useState([]);

    useEffect(() => {
        async function getOpenings() {
            const { result, error } = await getDocuments("Listings")
            let data = []
            result.forEach((item, i) => {
                data.push(item.data())
            })
            setOpenings(data)
        }
        getOpenings();
    }, [])

    return (
        <motion.div
            style={{
                padding: 50
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
                Active
            </motion.h2>
            <div style={{
                display: isMobile ? 'flex' : 'grid',
                flexDirection: 'column',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: '1fr',
                justifyContent: 'center',
                gap: 20,
                marginTop: 20
            }}>
                {openings.map((item, i) => {
                    return (
                        <Opening
                            title={item.title}
                            description={item.description} />
                    )
                })}
            </div>
        </motion.div>
    )
}

const Opening = ({ title, description }) => {
    return (
        <div>
            <h3 style={{fontSize: 20, fontWeight: 700, color: PRIMARY_COLOR}}>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default OpeningsList;