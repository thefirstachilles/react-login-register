import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
import Layout  from './Components/Layout'; 
import Register from './Components/Register';
import Signin from './Components/Signin';
import Zone from './Components/Zone';
import './App.css'
import ZoneHome from './Components/Zone/ZoneHome';
import ZoneMusic from './Components/Zone/ZoneMusic';
import ZoneEcharts from './Components/Zone/ZoneEcharts';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/signin" element={<Signin />}/>
        
    </Route>
    <Route path="/zone" element={<Zone/>}>
          <Route index element={<ZoneHome />}/>
          <Route path="zonemusic" element={<ZoneMusic />}/>
          <Route path="zonechart" element={<ZoneEcharts />}/>
        </Route>
    </Routes>
    </>
  );
}

export default App;
