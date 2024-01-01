"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ApplicationForm from "../components/ApplicationForm";
import getDocument from "../database/getDoc";
import Loading from "../components/Loading";

export default function Apply() {
    const searchParams = useSearchParams();
    const positionId = searchParams.get('position');

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getDetails() {
            setLoading(true)
            const { result, error } = await getDocument("Listings", positionId)
            setDetails(result)
            setLoading(false)
        }
        getDetails();
    }, [])

    return (
        <main>
            <div>
                <ApplicationForm
                    details={details}/>
            </div>
        </main>
    )
}
