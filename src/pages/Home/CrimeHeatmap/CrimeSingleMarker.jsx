
import MapWithMarker from "./MapWithMarker";

const CrimeSingleMarker = () => {
  // API key manually set
  const apiKey = "AIzaSyA_LUMMGjMq7asPjAPUdpZI-UVgyoS98GY";

  // Example coordinates (Mirpur 1, Dhaka)
  const lat = 23.801924;
  const lng = 90.3523456;
  const address = "Mirpur 1, Dhaka";

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Location</h2>
      <MapWithMarker
        apiKey={apiKey}
        lat={lat}
        lng={lng}
        address={address}
        height="450px"
      />
    </div>
  );
};

export default CrimeSingleMarker;
