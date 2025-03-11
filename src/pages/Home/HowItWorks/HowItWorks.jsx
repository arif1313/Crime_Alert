import Title from "../../Shared/Tilte/Title"
import HowItworkSlider from "./HowItworkSlider/HowItworkSlider"



const HowItWorks = () => {
  return (
    <div className="my-12 container mx-auto">
<Title title={"How this App is work "} description={`Empowering communities with real-time crime alerts 
anonymous reporting and actionable safety insights.
Stay informed stay connected and take control
of your safety with tools designed to protect
you and your neighborhood`}></Title>
<HowItworkSlider></HowItworkSlider>

    
    </div>
  )
}

export default HowItWorks