import {  useState, useMemo } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from "@react-google-maps/api";


const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 23.8103, lng: 90.4125 };
const dhakaBounds = { north: 23.99, south: 23.6, west: 90.2, east: 90.55 };

const MapInput = () => {
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState({
    crimeType: "all",
    timeRange: "lastWeek",
    severity: "medium",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // Geocode report locations




  const heatmapData = useMemo(() => {
   
    return locations => new window.google.maps.LatLng(report.lat, report.lng)
  });

  return (
    
};

// Props validation


export default MapInput;
