import HeroBanner from "./components/HeroBanner";
import About from "./components/About";
import Benefits from "./components/Benefits";
import HomeBanner from "./components/HomeBanner";

export default function Home() {
  return (
    <main>
      <div>
        {/* <HeroBanner title="The Pinnacle of Food Delivery Solutions"
          backgroundImage="homebanner.jpg" hasButton={true} /> */}
          <HomeBanner title="The Pinnacle of Food Delivery Solutions"
          image="paperbag.png" hasButton={true}/>
        <div>
          <About />
          <Benefits />
        </div>
      </div>
    </main>
  )
}
