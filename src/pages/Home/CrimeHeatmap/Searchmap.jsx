import { useState, useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  HeatmapLayer,
  Marker,
  StandaloneSearchBox
} from "@react-google-maps/api";
import { BiPhoneCall } from "react-icons/bi";

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



  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const location = places[0].geometry.location;
      setMapCenter({ lat: location.lat(), lng: location.lng() });
    }
  };

  return (
    <div>

      <div>
         <h3 className="font-semibold mb-2">Emargency call</h3>
       <ul className="list bg-base-100 rounded-box shadow-md">
  

  
  <li className="p-4 flex justify-between font-bold text-red-800">
  {/* logo */} 
    {/* <div>
    
      {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> */}
      
      {/* </div> */}
    <div>
      <div>Local police</div>
      <div className="text-xs uppercase font-semibold opacity-60">0175682565</div>
    </div>
  
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  
  <li className="p-4 flex justify-between font-bold  text-red-800">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div> */}
    <div>
      <div>Ambulance</div>
      <div className="text-xs uppercase font-semibold opacity-60">5681284</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
     </button>
  </li>
  
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>FireFighter</div>
      <div className="text-xs uppercase font-semibold opacity-60">36584281</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>Doctore</div>
      <div className="text-xs uppercase font-semibold opacity-60">987568</div>
    </div>
   
    <button className="btn btn-square btn-ghost">

    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>Emargency</div>
      <div className="text-xs uppercase font-semibold opacity-60">999</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  
</ul>
      </div>
      <h2>Crime Heatmap - Dhaka</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      

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


