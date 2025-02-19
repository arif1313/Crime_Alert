

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const Title = ({title}) => {
      useEffect(() => {
        AOS.init({ duration: 800 });
      }, []);
  return (
    <div className="">
 <h1  className="font-extrabold mx-12 text-5xl  text-[#ea3f59] ">{title} </h1>
   <p data-aos="fade-down" className=" text-xl my-10">Empowering communities with real-time crime alerts,
anonymous reporting, and actionable safety insights.
Stay informed, stay connected, and take control
of your safety with tools designed to protect
you and your neighborhood.</p>
    </div>
   
  )
}

export default Title