"use client";

import HeroBanner from "../components/HeroBanner";
import BenefitsList from "../components/BenefitsList";
import Image from "next/image";
import { PRIMARY_COLOR } from "../constants";

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