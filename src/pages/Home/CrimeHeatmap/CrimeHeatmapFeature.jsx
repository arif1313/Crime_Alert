import Title from "../../Shared/Tilte/Title"
import CrimeHeatmap from "./CrimeHeatMap"


function CrimeHeatmapFeature() {
  return (
    <div className="my-12 container mx-auto">
      <Title title={"Crime Heatmap in your area"} description={`Empowering communities with real-time crime alerts 
anonymous reporting and actionable safety insights.
Stay informed stay connected and take control
of your safety with tools designed to protect
you and your neighborhood`}/>
  
 
   <CrimeHeatmap></CrimeHeatmap>
   

</div>
      

  )
}

export default CrimeHeatmapFeature