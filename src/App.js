import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TVSeries';
import Detail from './pages/Detail';
import DetailTV from './pages/DetailTV';


function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/tvdetail/:id" element={<DetailTV />} />
        </Routes>
      </Router>
  );
}

export default App;
