import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ title, description, index, Icon }) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  // Determine AOS animation based on index
  const aosEffect = index % 2 === 0 ? "fade-right" : "fade-left";

  return (
    <div
      data-aos={aosEffect}
      data-aos-offset="200"
      data-aos-easing="ease-in-sine"
      className="card bg-[#000000] shadow-xl hover:scale-105 transition duration-1000 container"
    >
      <div className="card-body text-white  ">
     <div className="flex gap-10">
     <div>
       {Icon?<Icon className="text-5xl text-red-600"></Icon>:"no icon"}
       </div>
        <div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        </div>
     </div>
      </div>
    </div>
  );
};

export default FeatureCard;
