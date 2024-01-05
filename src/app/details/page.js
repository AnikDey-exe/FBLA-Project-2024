"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import getDocument from "../database/getDoc";
import Loading from "../components/Loading";
import Position from "../components/Position";

export default function Details() {
    const searchParams = useSearchParams();
    const positionId = searchParams.get('position');

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getDetails() {
            setLoading(true)
            // gets details about the selected job opening
            const { result, error } = await getDocument("Listings", positionId)
            setDetails(result)
            setLoading(false)
        }
        getDetails();
    }, [])

    if (loading) return <Loading/>

    return (
        <main>
            <div>
                <Position
                    details={details}/>
            </div>
        </main>
    )
}
