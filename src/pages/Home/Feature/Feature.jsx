import FeatureCard from "../../Shared/Cards/FeatureCard/FeatureCard";
import Title from "../../Shared/Tilte/Title";

import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdOutlineHideImage } from "react-icons/md";
import { BiMapPin } from "react-icons/bi";
import { RiCommunityLine } from "react-icons/ri";
const Feature = () => {
  const FeatureDocument = [
    {
      Title: "Real-Time Alerts",
      description: "Get instant notifications about crimes happening near you.",
      icon:HiOutlineBellAlert
    },
    {
      Title: "Anonymous Reporting",
      description: "Report suspicious activities or incidents anonymously.",
      icon:MdOutlineHideImage
    },
    {
      Title: "Crime Heatmap",
      description: "Visualize crime trends in your area with our interactive map.",
      icon:BiMapPin
    },
    {
      Title: "Community Watch",
      description: "Connect with neighbors and local authorities to stay informed.",
      icon:RiCommunityLine
    },
  ];

  return (
    <div className="my-12 container mx-auto">
      <Title title={"Why Choose Our Crime Alert App"} />
      <div className="grid grid-cols-2 gap-12">
        {FeatureDocument.map((feature, inx) => (
          <FeatureCard key={inx} index={inx} title={feature.Title} description={feature.description} Icon={feature.icon} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
