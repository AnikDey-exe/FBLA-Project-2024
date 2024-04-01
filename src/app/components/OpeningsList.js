"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import getDocuments from "../database/getDocs";
import { PRIMARY_COLOR } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loading from "./Loading";

const OpeningsList = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getOpenings() {
            setLoading(true);
            // get all the active job openings
            const { result, error } = await getDocuments("Listings")
            let data = []
            result.forEach((item, i) => {
                data.push(item.data())
            })
            setOpenings(data)
            setLoading(false);
        }
        getOpenings();
    }, [])

    // checks if the job openings have been fetched
    if(loading) return <Loading height={100}/>

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
                            description={item.description}
                            lowerPrice={item.lowerPrice}
                            higherPrice={item.higherPrice}
                            location={item.location}
                            id={item.id}
                            isMobile={isMobile}
                            key={i} />
                    )
                })}
            </div>
        </motion.div>
    )
}

const Opening = ({ title, description, lowerPrice, higherPrice, location, isMobile, id }) => {
    return (
        <div style={{
            boxShadow: "0px 0px 10px #ccc",
            backgroundColor: "white",
            padding: 20,
            transition: "all 0.5s ease-out",
            borderRadius: 5
        }}
            onMouseOver={(e) => e.currentTarget.style.scale = 1.1}
            onMouseLeave={(e) => e.currentTarget.style.scale = 1}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: PRIMARY_COLOR }}>{title}</h3>
            <h4 style={{ fontSize: 17.5, fontWeight: 300, display: isMobile ? null : 'flex', alignItems: 'center', marginTop: 7.5 }}>${lowerPrice} - ${higherPrice} <h5 style={{ fontSize: 17.5, color: 'grey', marginLeft: isMobile ? 0 : 5 }}>{location}</h5></h4>
            <p style={{marginTop: 7.5}}>{description}</p>
            <Link
                href={{
                    pathname: 'details',
                    query: { 
                        position: id 
                    }
                }}>
                <h5 style={{ fontWeight: 500, color: PRIMARY_COLOR }}>Learn more <FontAwesomeIcon icon={faChevronRight} style={{ marginTop: 10 }} /></h5>
            </Link>
        </div>
    )
}

export default OpeningsList;