
import Banar from "./Banar/Banar"

import CrimeHeatmapFeature from "./CrimeHeatmap/CrimeHeatmapFeature"
import Feature from "./Feature/Feature"
import Feedback from "./Feedback/Feedback"
import HowItWorks from "./HowItWorks/HowItWorks"
// import Banar2 from "./Banar/Banar2"


const Home = () => {
  return (
    <div>
      <Banar></Banar>
      <Feature></Feature>
      <HowItWorks></HowItWorks>

      <CrimeHeatmapFeature></CrimeHeatmapFeature>
      <Feedback></Feedback>
    </div>
  )
}

export default Home