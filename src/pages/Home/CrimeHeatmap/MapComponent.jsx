import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY_HERE",
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{ height: "800px" }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        {/* Example marker */}
        {/* <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        /> */}
      </GoogleMap>
    </div>
  );
};

// ✅ Add PropTypes validation
MapComponent.propTypes = {
  selectedLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default MapComponent;
