import HeroBanner from "../components/HeroBanner"
import OpeningsList from "../components/OpeningsList"

export default function Openings() {
  return (
    <main>
      <div>
        <HeroBanner title="Openings" 
        backgroundImage="herobanner3.jpg"/>
        <OpeningsList/>
      </div>
    </main>
  )
}
