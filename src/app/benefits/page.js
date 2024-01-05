"use client";

import HeroBanner from "../components/HeroBanner";
import BenefitsList from "../components/BenefitsList";

const Benefits = () => {
    return (
        <main>
            <div>
                <HeroBanner title="Benefits"
                    backgroundImage="benefits.jpg" />
                <BenefitsList/>
            </div>
        </main>
    )
}

export default Benefits;