import { useMemo } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 23.8103, lng: 90.4125 }; // Dhaka center
const dhakaBounds = { north: 23.99, south: 23.6, west: 90.2, east: 90.55 };

const CrimeHeatmap = () => {
  // --- Manual reports inside Dhaka ---
  const manualReports = useMemo(
    () => [
      {
        _id: "1",
        reportTitle: "Report 1",
        reportType: "Theft",
        crimeDate: "2025-09-14",
        lat: 23.8100, // near central Dhaka
        lng: 90.4120,
      },
      {
        _id: "2",
        reportTitle: "Report 2",
        reportType: "Assault",
        crimeDate: "2025-09-14",
        lat: 23.7900, // Mirpur area
        lng: 90.3580,
      },
      {
        _id: "3",
        reportTitle: "Report 3",
        reportType: "Vandalism",
        crimeDate: "2025-09-14",
        lat: 23.7500, // Gulshan area
        lng: 90.4200,
      },
      {
        _id: "4",
        reportTitle: "Report 4",
        reportType: "Theft",
        crimeDate: "2025-09-14",
        lat: 23.7700, // Dhanmondi area
        lng: 90.4000,
      },
      {
        _id: "5",
        reportTitle: "Report 5",
        reportType: "Assault",
        crimeDate: "2025-09-14",
        lat: 23.8200, // Uttara area
        lng: 90.3700,
      },
    ],
    []
  );

  // Heatmap data
  const heatmapData = useMemo(() => {
    if (!window.google) return [];
    return manualReports.map((report) => new window.google.maps.LatLng(report.lat, report.lng));
  }, [manualReports]);

  return (
    <div>
      <h2>Crime Heatmap - Dhaka</h2>

      <LoadScript
        googleMapsApiKey="AIzaSyA_LUMMGjMq7asPjAPUdpZI-UVgyoS98GY"
        libraries={["visualization"]}
      >
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

          {manualReports.map((report) => (
            <Marker
              key={report._id}
              position={{ lat: report.lat, lng: report.lng }}
              onClick={() =>
                alert(
                  `Crime: ${report.reportType}\nTitle: ${report.reportTitle}\nDate: ${report.crimeDate}`
                )
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

CrimeHeatmap.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      reportTitle: PropTypes.string,
      reportType: PropTypes.string,
      crimeDate: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ),
};

export default CrimeHeatmap;
