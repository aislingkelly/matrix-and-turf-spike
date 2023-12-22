import React, { useEffect, useRef, useState } from 'react';

const DistanceMatrixMap = () => {
  ///////////////////////////////////////////////////////////////////
  /////Should use something like react-google-maps here, think that would solve the initmap issue
  ///////////////////////////////////////////////////////////////////

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markersArray, setMarkersArray] = useState([]);
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);

  const initMap = () => {
    const bounds = new google.maps.LatLngBounds();
    const localMarkersArray = [];

    const localMap = new google.maps.Map(mapRef.current, {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    });
    setMap(localMap);

    // Initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();

    // Build request
    const origin1 = { lat: 55.93, lng: -3.118 };
    const origin2 = 'Greenwich, England';
    const destinationA = 'Stockholm, Sweden';
    const destinationB = { lat: 50.087, lng: 14.421 };

    const localRequest = {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    setRequest(localRequest);

    // Get distance matrix response
    service.getDistanceMatrix(localRequest).then((response) => {
      setResponse(response);

      // Show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;

      deleteMarkers();

      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          localMap.fitBounds(bounds.extend(results[0].geometry.location));
          const marker = new google.maps.Marker({
            map: localMap,
            position: results[0].geometry.location,
            label: asDestination ? 'D' : 'O',
          });
          localMarkersArray.push(marker);
        };
        return handler;
      };

      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;

        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));

        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }

      setMarkersArray(localMarkersArray);
    });
  };

  const deleteMarkers = () => {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }

    setMarkersArray([]);
  };

  return (
    <div id="container">
      <div
        ref={mapRef}
        id="map"
        style={{ height: '400px', width: '100%' }}
      ></div>
      <div id="sidebar">
        <h3>Request</h3>
        <pre>{JSON.stringify(request, null, 2)}</pre>
        <h3>Response</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DistanceMatrixMap;
