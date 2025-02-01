import FeatureCard from "../../Shared/Cards/FeatureCard/FeatureCard";
import Title from "../../Shared/Tilte/Title";

const Feature = () => {
  const FeatureDocument = [
    {
      Title: "Real-Time Alerts",
      description: "Get instant notifications about crimes happening near you.",
    },
    {
      Title: "Anonymous Reporting",
      description: "Report suspicious activities or incidents anonymously.",
    },
    {
      Title: "Crime Heatmap",
      description: "Visualize crime trends in your area with our interactive map.",
    },
    {
      Title: "Community Watch",
      description: "Connect with neighbors and local authorities to stay informed.",
    },
  ];

  return (
    <div className="my-12 container mx-auto">
      <Title title={"Why Choose Our Crime Alert App"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {FeatureDocument.map((feature, inx) => (
          <FeatureCard key={inx} index={inx} title={feature.Title} description={feature.description} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
