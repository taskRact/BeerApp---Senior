import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    lat: number;
    lang: number;
    name: string;
}

const Map: React.FC<MapProps> = ({ lat, lang, name }) => {
    const mapRef = useRef(null);
    const latitude = lat;
    const longitude = lang;
    const companyName = name;

    return (
        <MapContainer center={[latitude, longitude]} zoom={15} ref={mapRef} style={{height: "70vh", width: "40vw"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    {companyName}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
