import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from '../Home';
import Gestion from '../Gestion';
import Reservation from '../Reservation';
import Reviews from '../Reviews';
import FindRes from '../Reviews/FindRes';
import Login from '../Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gestion />} /> {/*<Home />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/reviews" element={<FindRes />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="*" element={<Link to="/" className='border'>Retour accueil</Link>} />
      </Routes>
    </Router>
  );
}

export default App;