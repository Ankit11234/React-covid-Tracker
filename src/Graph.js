import React from 'react'
import './Graph.css';
import { showData } from './Util';
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function Graph({ center, zoom, casesType, mapcountries }) {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    return (
        <div className="Graph">
            <MapContainer>
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
                     contributors'/>

                {showData(mapcountries, casesType)}
            </MapContainer>
        </div>

    )
}

export default Graph
