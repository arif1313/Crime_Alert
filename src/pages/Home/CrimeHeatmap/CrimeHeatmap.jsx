import { useState, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from "@react-google-maps/api";


const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 23.8103, lng: 90.4125 };
const dhakaBounds = { north: 23.99, south: 23.60, west: 90.20, east: 90.55 };

const CrimeHeatmap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    crimeType: "all",
    timeRange: "lastWeek",
    severity: "medium",
  });

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch("/api/crimes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        });
        if (!response.ok) throw new Error("Failed to fetch crime data");
        const data = await response.json();
        setCrimeData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching crime data:", err);
      }
    };

    fetchCrimeData();
  }, [filters]);

  const heatmapData = useMemo(
    () => crimeData.map((crime) => new window.google.maps.LatLng(crime.lat, crime.lng)),
    [crimeData]
  );

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div>
      <h2>Crime Heatmap - Dhaka</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
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

      <LoadScript googleMapsApiKey="AIzaSyAFA9f9k3pUDG6B1LkD1wtPLFNfS1lt4ec" libraries={["visualization"]}>
        <GoogleMap
        
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={{
            restriction: { latLngBounds: dhakaBounds, strictBounds: true },
            minZoom: 10,
            maxZoom: 14,
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
