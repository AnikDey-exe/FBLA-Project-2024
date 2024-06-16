import { creditedImages, creditedSources } from "../constants";
import Link from "next/link";

const Documentation = () => {
    return (
        <div style={{
            padding: 50
        }}>
            <h2 style={{wordWrap: "break-word"}}>Documentation</h2>
            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Images</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {creditedImages.map((item, i) => {
                    return (
                        <Link href={item} style={{ textDecoration: "underline", marginTop: 5, wordWrap: "break-word" }} key={i}>{item}</Link>
                    )
                })}
            </div>
            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Icons</h4>
            <div style={{display: "flex", flexDirection: "column"}}>
                <a href="https://www.flaticon.com/free-icons/policy" title="policy icons" style={{ color: 'black', marginTop: 5 }}>Policy icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/vacation" title="vacation icons" style={{ color: 'black', marginTop: 5 }}>Vacation icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/business-and-finance" title="business and finance icons" style={{ color: 'black', marginTop: 5 }}>Business and finance icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/manual" title="manual icons" style={{ color: 'black', marginTop: 5 }}>Manual icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/behance-network" title="Behance Network icons" style={{ color: 'black', marginTop: 5 }}>Behance Network icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/notice" title="notice icons" style={{ color: 'black', marginTop: 5 }}>Notice icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/head" title="head icons" style={{ color: 'black', marginTop: 5 }}>Head icons created by sonnycandra - Flaticon</a>
            </div>
            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Sources</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {creditedSources.map((item, i) => {
                    return (
                        <Link href={item} style={{ textDecoration: "underline", marginTop: 5, wordWrap: "break-word" }} key={i}>{item}</Link>
                    )
                })}
            </div>
            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Front End</h4>
            <h5 style={{marginTop: 5}}> JavaScript </h5>
            <h5 style={{marginTop: 5}}> HTML/CSS </h5>
            <h5 style={{marginTop: 5}}> ReactJS </h5>
            <h5 style={{marginTop: 5}}> NextJS </h5>

            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Emailing Service</h4>
            <h5 style={{marginTop: 5}}> Twilio SendGrid </h5>
            <h5 style={{marginTop: 5}}> Waypoint </h5>

            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Database</h4>
            <h5 style={{marginTop: 5}}> Firebase </h5>

            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Hosting Service</h4>
            <h5 style={{marginTop: 5}}> Vercel </h5>

            <h4 style={{ marginTop: 20, fontWeight: "600" }}>Source Code</h4>
            <a href="https://github.com/AnikDey-exe/FBLA-Project-2024" style={{textDecoration: 'underline'}}>GitHub Link</a>
        </div>
    )
}

export default Documentation;