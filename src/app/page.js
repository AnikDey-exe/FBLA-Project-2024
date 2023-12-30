import HeroBanner from "./components/HeroBanner";
import About from "./components/About";
import Benefits from "./components/Benefits";

export default function Home() {
  return (
    <main>
      <div>
        <HeroBanner title="The Pinnacle of Food Delivery Solutions" 
        backgroundImage="herobanner2.jpg" hasButton={true}/>
        <About/>
        <Benefits/>
      </div>
    </main>
  )
}
