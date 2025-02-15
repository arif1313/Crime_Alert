import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from "@react-google-maps/api";

// Map settings
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// Center the map on Dhaka, Bangladesh
const center = {
  lat: 23.8103, // Latitude of Dhaka
  lng: 90.4125, // Longitude of Dhaka
};

// Define the bounds for Dhaka
const dhakaBounds = {
  north: 23.99, // Northernmost latitude of Dhaka
  south: 23.60, // Southernmost latitude of Dhaka
  west: 90.20, // Westernmost longitude of Dhaka
  east: 90.55, // Easternmost longitude of Dhaka
};

const CrimeHeatmap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [filters, setFilters] = useState({
    crimeType: "all",
    timeRange: "lastWeek",
    severity: "medium",
  });

  // Fetch crime data from your API
  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch("/api/crimes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        });
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    fetchCrimeData();
  }, [filters]);

  // Convert crime data to heatmap format
  const heatmapData = crimeData.map((crime) => ({
    location: new window.google.maps.LatLng(crime.lat, crime.lng),
    weight: crime.severity === "high" ? 2 : 1, // Adjust weight based on severity
  }));

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return (
    <div>
      <h2>Crime Heatmap - Dhaka</h2>
      <div>
        <label>Crime Type:</label>
        <select onChange={(e) => handleFilterChange("crimeType", e.target.value)}>
          <option value="all">All</option>
          <option value="theft">Theft</option>
          <option value="assault">Assault</option>
          <option value="vandalism">Vandalism</option>
        </select>

        <label>Time Range:</label>
        <select onChange={(e) => handleFilterChange("timeRange", e.target.value)}>
          <option value="last24Hours">Last 24 Hours</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
        </select>

        <label>Severity:</label>
        <select onChange={(e) => handleFilterChange("severity", e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Add libraries={["visualization"]} to LoadScript */}
      <LoadScript
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
        libraries={["visualization"]} // Add this line
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11} // Adjust zoom level to focus on Dhaka
          center={center}
          options={{
            restriction: {
              latLngBounds: dhakaBounds,
              strictBounds: true, // Prevent panning outside Dhaka
            },
            minZoom: 10, // Minimum zoom level to keep Dhaka in view
            maxZoom: 14, // Maximum zoom level for detail
          }}
        >
          <HeatmapLayer data={heatmapData} />
          {crimeData.map((crime, index) => (
            <Marker
              key={index}
              position={{ lat: crime.lat, lng: crime.lng }}
              onClick={() => alert(`Crime Type: ${crime.type}\nDate: ${crime.date}`)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CrimeHeatmap;