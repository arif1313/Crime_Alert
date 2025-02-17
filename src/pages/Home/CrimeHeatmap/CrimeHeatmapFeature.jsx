import Title from "../../Shared/Tilte/Title"
import CrimeHeatmap from "./CrimeHeatMap"


function CrimeHeatmapFeature() {
  return (
    <div className="my-12 container mx-auto">
      <Title title={"Crime Heatmap in your area"} />
  
 
   <CrimeHeatmap></CrimeHeatmap>
   

</div>
      

  )
}

export default CrimeHeatmapFeature