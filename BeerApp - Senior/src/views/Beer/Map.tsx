import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    lat: number;
    lang: number;
  }

  const Map: React.FC<MapProps> = ({ lat, lang }) => {
        const mapRef = useRef(null);
        const latitude = lat;
        const longitude = lang;
    
        return ( 
            // Make sure you set the height and width of the map container otherwise the map won't show
                <MapContainer center={[latitude, longitude]} zoom={15} ref={mapRef} style={{height: "70vh", width: "40vw"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Additional map layers or components can be added here */}
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
        );
    };
    
    export default Map;
