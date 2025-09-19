import { useMemo } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "500px" };
const dhakaBounds = { north: 23.99, south: 23.6, west: 90.2, east: 90.55 };

const CrimeHeatmap = () => {
  // --- Manual reports inside Dhaka ---
  const manualReports = useMemo(
    () => [
      { _id: "1", reportTitle: "Report 1", reportType: "Theft", crimeDate: "2025-09-14", lat: 23.7980, lng: 90.4010 }, // Banani
      { _id: "2", reportTitle: "Report 2", reportType: "Assault", crimeDate: "2025-09-14", lat: 23.8050, lng: 90.3900 }, // Banani
      { _id: "3", reportTitle: "Report 3", reportType: "Vandalism", crimeDate: "2025-09-14", lat: 23.8230, lng: 90.3740 }, // Mirpur
      { _id: "4", reportTitle: "Report 4", reportType: "Theft", crimeDate: "2025-09-14", lat: 23.8170, lng: 90.3820 }, // Mirpur
      { _id: "5", reportTitle: "Report 5", reportType: "Assault", crimeDate: "2025-09-14", lat: 23.8105, lng: 90.3950 }  // Between Banani & Mirpur
    ],
    []
  );

  console.log("Manual Reports:", manualReports);

  // Heatmap data
  const heatmapData = useMemo(() => {
    if (!window.google) return [];
    const data = manualReports.map((report) => new window.google.maps.LatLng(report.lat, report.lng));
    console.log("Heatmap Data:", data);
    return data;
  }, [manualReports]);

  console.log("Google Maps Loaded:", !!window.google);

  // Calculate map center dynamically
  const center = useMemo(() => {
    if (!manualReports.length) return { lat: 23.8103, lng: 90.4125 };
    const latSum = manualReports.reduce((sum, r) => sum + r.lat, 0);
    const lngSum = manualReports.reduce((sum, r) => sum + r.lng, 0);
    const c = { lat: latSum / manualReports.length, lng: lngSum / manualReports.length };
    console.log("Map Center:", c);
    return c;
  }, [manualReports]);

  return (
    <div>
      <h2>Crime Heatmap - Dhaka</h2>

      <LoadScript googleMapsApiKey="AIzaSyA6LfNv2yErM8MaC7YvxDgL8af7TxrYSFE" libraries={["visualization"]}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={{
            restriction: { latLngBounds: dhakaBounds, strictBounds: true },
            minZoom: 10,
            maxZoom: 14,
          }}
        >
          <HeatmapLayer
            data={heatmapData}
            options={{ radius: 25, opacity: 0.6, dissipating: true }}
          />

          {manualReports.map((report, index) => {
            console.log("Rendering Marker:", report);
            return (
              <Marker
                key={report._id}
                position={{ lat: report.lat, lng: report.lng }}
                icon={{
                  url:
                    index === 0
                      ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // first report blue
                      : "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // others red
                }}
                onClick={() =>
                  alert(
                    `Crime: ${report.reportType}\nTitle: ${report.reportTitle}\nDate: ${report.crimeDate}`
                  )
                }
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CrimeHeatmap;
