
import Banar from "./Banar/Banar"
import CrimeHeatmap from "./CrimeHeatmap/CrimeHeatMap"
import Feature from "./Feature/Feature"
import HowItWorks from "./HowItWorks/HowItWorks"
// import Banar2 from "./Banar/Banar2"


const Home = () => {
  return (
    <div>
      <Banar></Banar>
      <Feature></Feature>
      <HowItWorks></HowItWorks>
      <CrimeHeatmap></CrimeHeatmap>
      
    </div>
  )
}

export default Home