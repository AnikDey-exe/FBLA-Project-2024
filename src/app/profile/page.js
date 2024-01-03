"use client";

import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Warning from "../components/Warning";
import { useMediaQuery } from "../hooks/useMediaQuery";
import AccountCard from "../components/AccountCard";
import ApplicationsList from "../components/ApplicationsList";
import { User } from "../contexts/UserContext";
import getApplications from "../database/getApplications";
import getUserDocument from "../database/getUserDoc";
import Loading from "../components/Loading";

export default function Profile() {
    const { currentUser, setCurrentUser } = useContext(User);
    const isMobile = useMediaQuery("(max-width: 850px)");

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [applications, setApplications] = useState(null);

    useEffect(() => {
        async function getDetails() {
            setLoading(true)
            let tempApplications = []
            const { result, error } = await getUserDocument(currentUser);
            const { applicationsResult, applicationsError } = await getApplications(currentUser);
            result.forEach((doc)=>{
                setAccount(doc.data())
            })
            applicationsResult.forEach((doc)=>{
                tempApplications = [...tempApplications, doc.data()]
            })
            setApplications(tempApplications)
            setLoading(false)
        }
        getDetails();
    }, [currentUser])

    if (currentUser == "") return <Warning message="Please sign in to view your account." />

    if (loading || !account) return <Loading/>

    return (
        <main>
            <div style={{
                padding: 50
            }}>
                <motion.h2
                    animate={{ y: 20 }}
                    transition={{ ease: "easeOut", duration: 0.75 }}
                    initial={{
                        translateY: -20
                    }}>
                    Your Profile
                </motion.h2>
                <div style={{
                    display: "flex", 
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    marginTop: isMobile ? 0 : 20
                }}>

                    <ApplicationsList applications={applications}/>


                    <AccountCard account={account}/>
                </div>
            </div>
        </main>
    )
}
