import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';

const VoronoiMap = () => {
  const [voronoiPolygons, setVoronoiPolygons] = useState(null);

  useEffect(() => {
    // Generate random points
    const points = turf.randomPoint(10, { bbox: [-180, -85, 180, 85] });

    // Generate Voronoi diagram
    const voronoi = turf.voronoi(points, { bbox: [-180, -85, 180, 85] });
    setVoronoiPolygons(voronoi);
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {voronoiPolygons && <GeoJSON data={voronoiPolygons} />}
    </MapContainer>
  );
};

export default VoronoiMap;
