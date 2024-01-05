import { motion } from "framer-motion";
import { expandedBenefits } from "../constants";
import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";

const BenefitsList = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");

    return (
        <div style={{ 
            padding: 50, 
            overflowX: 'hidden', 
            paddingLeft: isMobile ? 20 : 100, 
            paddingRight: isMobile ? 20 : 100 
        }}>
            {expandedBenefits.map((item, i) => {
                return (
                    <Card
                        sectionTitle={item.sectionTitle}
                        sectionImage={item.sectionImage}
                        sectionInfo={item.sectionInfo}
                        index={i}
                        key={i} 
                        isMobile={isMobile}/>
                )
            })}
        </div>
    )
}

const Card = ({ sectionTitle, sectionImage, sectionInfo, index, isMobile }) => {
    return (
        <motion.div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : index % 2 == 0 ? "row" : "row-reverse",
                marginTop: index === 0 ? 100: 100,
                marginBottom: 100
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 0.75, type: "spring", stiffness: 50 }}
            variants={{
                visible: { x: 0 },
                hidden: { x: index % 2 === 0 ? 200 : -200 }
            }}>
            <div style={{ width: isMobile ? "100%" : "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                    src={require(`../../../public/${sectionImage}`)}
                    width={50}
                    height={50}
                    style={{
                        width: '50%',
                        aspectRatio: 1
                    }}
                    unoptimized />
            </div>
            <div style={{ width: isMobile ? "100%" : "50%", display: "flex", justifyContent: "center",flexDirection: "column", alignItems: isMobile ? "center" : null }}>
                <div>
                    <h4 style={{textAlign: isMobile ? "center" : "left", marginTop: isMobile ? 20 : 0}}>{sectionTitle}</h4>
                    <div style={{marginTop: 20}}>
                        {sectionInfo.map((item, i) => {
                            return (
                                <li key={i} style={{ textAlign: isMobile ? "center" : "left", marginTop: 5, listStyleType: "circle"}}>{item}</li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BenefitsList;