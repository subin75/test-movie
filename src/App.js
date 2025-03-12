import './App.css';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';


function App() {
  return (
    <Router>
        <header>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/product" className="nav-link" >Movies</NavLink>
          <NavLink to="/product" className="nav-link">TV Series</NavLink>
        </header>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movies' element={<Movies />}/>
          <Route path='/tv series' element={<TVSeries />}/>
        </Routes>
      </Router>
  );
}

export default App;
