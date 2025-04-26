import { useState, useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  HeatmapLayer,
  Marker,
  StandaloneSearchBox
} from "@react-google-maps/api";

const center = { lat: 23.8103, lng: 90.4125 };
const dhakaBounds = { north: 23.99, south: 23.60, west: 90.20, east: 90.55 };

const Searchmap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [filters, setFilters] = useState({
    crimeType: "all",
    timeRange: "lastWeek",
    severity: "medium",
  });

  const searchBoxRef = useRef(null);

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
    () =>
      crimeData.map((crime) => new window.google.maps.LatLng(crime.lat, crime.lng)),
    [crimeData]
  );

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const location = places[0].geometry.location;
      setMapCenter({ lat: location.lat(), lng: location.lng() });
    }
  };

  return (
    <div>
      <h2>Crime Heatmap - Dhaka</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
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

      {/* Layout: Map 1/3 and other content 2/3 */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Map Section - 1/3 width */}
        <div className="flex-1 w-full">
          <LoadScript
            googleMapsApiKey="AIzaSyAFA9f9k3pUDG6B1LkD1wtPLFNfS1lt4ec"
            libraries={["visualization", "places"]}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Search location"
                style={{
                  
                  border: "1px solid transparent",
                  width: "100%",
                  height: "40px",
                 
                  padding: "0 12px",
                  fontSize: "16px",
                }}
              />
            </StandaloneSearchBox>

            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "200px" }}
              center={mapCenter}
              zoom={11}
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
                  onClick={() =>
                    alert(`Crime Type: ${crime.type}\nDate: ${crime.date}`)
                  }
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Other content - 2/3 width */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h4>Crime Summary</h4>
          <p>Total Crimes: {crimeData.length}</p>
          <p>Selected Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</p>
          {/* Add more details or stats here */}
        </div>
      </div>
    </div>
  );
};

export default Searchmap;


