import { useEffect, useState } from "react";
import Title from "../../Shared/Tilte/Title";
import CrimeHeatmap from "./CrimeHeatmap";
import { getAllReports } from "../../../Api/ReportApi";


function CrimeHeatmapFeature() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getAllReports(); // Assuming this returns { success, data }
        if (res.success) setReports(res.data);
        console.log("reports", res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []); // Empty dependency so it runs only once

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="my-12 container mx-auto">
      <Title
        title={"Crime Heatmap in your area"}
        description={`Empowering communities with real-time crime alerts, 
anonymous reporting, and actionable safety insights.
Stay informed, stay connected, and take control
of your safety with tools designed to protect
you and your neighborhood.`}
      />

      <CrimeHeatmap />
    </div>
  );
}

export default CrimeHeatmapFeature;
