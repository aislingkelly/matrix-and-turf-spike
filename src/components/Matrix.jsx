import { useEffect, useState } from 'react';
import { getDistance } from '../utils/api';

function Matrix() {
  const [distances, setDistances] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    getDistance()
      .then((data) => {
        setDistances(data.rows);
        setAddresses(data.destination_addresses);
        setOrigins(data.origin_addresses);
        console.log(data.rows, 'data.rows');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2>Distances</h2>
      <div>
        <p>From:</p>
        <ul>
          {origins.map((origin, index) => (
            <li key={index}>{origin}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>To:</p>
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div>

      <div>
        {distances.map((distance, index) => (
          <div key={index}>
            <h3>Route {index}</h3>
            {distance.elements.map((element, idx) => (
              <div key={idx}>
                <p>Distance: {element.distance.text}</p>
                <p>Duration: {element.duration.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Matrix;
