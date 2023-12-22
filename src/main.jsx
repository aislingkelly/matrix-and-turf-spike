import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Dynamically load the Google Maps script with the API key
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${
  import.meta.env.VITE_GOOGLE_API_KEY
}&callback=initMap`;
script.async = true;
document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
