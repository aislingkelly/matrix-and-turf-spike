import './App.css';
import Matrix from './components/Matrix';
import DistanceMatrixMap from './components/Map';
import Turf from './components/Turf';

function App() {
  return (
    <>
      <h1>Turf</h1>
      <Turf />
      <h1>Matrix</h1>
      <Matrix />
      <h1>Distance map matrix</h1>
      <DistanceMatrixMap />
    </>
  );
}

export default App;
