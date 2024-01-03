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
                <a href="https://www.flaticon.com/free-icons/rest" title="rest icons" style={{ color: 'black', marginTop: 5 }}>Rest icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/disability-insurance" title="disability insurance icons" style={{ color: 'black', marginTop: 5 }}>Disability insurance icons created by Chattapat - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/retirement" title="retirement icons" style={{ color: 'black', marginTop: 5 }}>Retirement icons created by Chattapat - Flaticon</a>
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
        </div>
    )
}

export default Documentation;