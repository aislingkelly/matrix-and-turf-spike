import axios from 'axios';

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix',
});

export const getDistance = () => {
  const origins =
    'Croydon, UK | New Marston, UK | Elsfield Way, Oxford OX2 8NP, United Kingdom';
  const destination = 'Southcombe OX7 5QH, United Kingdom';
  const apiKey = 'AIzaSyCgu5LWw8nh3w7txYsfEQr2lfa9hxoFGtg';

  return api
    .get(
      `/json?destinations=${destination}
  &origins=${origins}
  &units=imperial
  &key=${apiKey}`
    )
    .then((response) => {
      console.log(response, 'res');
      return response.data;
    });
};
