"use client";

import HeroBanner from "../components/HeroBanner"
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import getDocuments from "../database/getDocs";
import Link from "next/link";
import Button from "../components/Button";
import { PRIMARY_COLOR } from "../constants";

const Choose = () => {
    const [opening, setOpening] = useState('');
    const [openings, setOpenings] = useState([]);

    useEffect(() => {
        async function getOpenings() {
            // gets the current listings
            const { result, error } = await getDocuments("Listings")
            let data = []
            result.forEach((item, i) => {
                data.push(item.data())
            })
            // transforms the data to only a list of the titles of the openings
            setOpenings(data.map((item) => { return { name: item.id, displayValue: item.title } }))
            setOpening(data[0].id)
        }
        getOpenings();
    }, [])

    return (
        <main>
            <div>
                <HeroBanner title="Apply"
                    backgroundImage="apply3.jpg" />
                <div
                    style={{
                        padding: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <h3 style={{ fontWeight: '600' }}>Select a position</h3>
                    <Dropdown
                        style={{
                            marginTop: 20
                        }}
                        value={opening}
                        onChange={(e) => { 
                            console.log(e)
                            setOpening(e.target.value) 
                        }}
                        options={openings} />
                    <Link href={{
                        pathname: "apply",
                        query: {
                            position: opening
                        }
                    }}>
                        <Button style={{ backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center", marginTop: 20 }}>
                            <span style={{ color: 'white', fontWeight: 600 }}>Apply</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Choose;