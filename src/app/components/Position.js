"use client";

import { useMediaQuery } from "../hooks/useMediaQuery";
import { COMPANY_NAME, PRIMARY_COLOR } from "../constants";
import Button from "./Button";

const Position = ({ details }) => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <div style={{ padding: 50 }}>
            <h1 style={{ fontSize: isMobile ? 45 : 50, lineHeight: 1, color: PRIMARY_COLOR }}>{details.title}</h1>
            <h3 style={{ marginBottom: 10, marginTop: 5, fontWeight: 600 }}>{COMPANY_NAME}</h3>
            <h3>{details.location}</h3>
            <h3>${details.lowerPrice} - ${details.higherPrice} per year - {details.jobType}</h3>

            <Button style={{ 
                backgroundColor: PRIMARY_COLOR, 
                height: 30, 
                borderRadius: 10, 
                display: "flex", 
                alignItems: "center",
                marginTop: 15
            }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Apply Now</span>
            </Button>

            <h2 style={{ marginTop: 30, fontSize: isMobile ? 35 : 40 }}> Position Details </h2>
            <h3 style={{ fontWeight: 700 }}>Job Description</h3>
            <p style={{ marginBottom: 20 }}>{details.description}</p>

            <hr style={{ color: 'grey' }} />

            <h3 style={{ fontWeight: 700, marginTop: 20 }}>Duties</h3>
            {details.duties.map((item, i) => {
                return (
                    <li key={i}>{item}</li>
                )
            })}
            <br />

            <hr style={{ color: 'grey' }} />

            <h3 style={{ fontWeight: 700, marginTop: 20 }}>Skills</h3>
            {details.skills.map((item, i) => {
                return (
                    <li key={i}>{item}</li>
                )
            })}
        </div>
    )
}

export default Position;