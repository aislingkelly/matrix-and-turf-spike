import React, { useState, useEffect } from 'react';
import * as turf from '@turf/turf';

const Turf = () => {
  const [centroidCoordinates, setCentroidCoordinates] = useState(null);

  useEffect(() => {
    // Define the polygon
    const polygon = turf.polygon([
      [
        [-81, 41],
        [-88, 36],
        [-84, 31],
        [-80, 33],
        [-77, 39],
        [-81, 41],
      ],
    ]);

    // Calculate the centroid
    const centroid = turf.centroid(polygon);

    // Update the state with the centroid's coordinates
    setCentroidCoordinates(centroid.geometry.coordinates);
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <h1>Centroid Coordinates</h1>
      {centroidCoordinates ? (
        <p>
          Longitude: {centroidCoordinates[0]}, Latitude:{' '}
          {centroidCoordinates[1]}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Turf;
