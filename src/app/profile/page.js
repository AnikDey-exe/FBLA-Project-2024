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

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState({});
    const [applications, setApplications] = useState([]);

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

    if (loading) return <Loading/>

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
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <ApplicationsList applications={applications}/>
                    <AccountCard account={account}/>
                </div>
            </div>
        </main>
    )
}
