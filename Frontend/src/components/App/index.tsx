import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../Home';
import Gestion from '../Gestion';
import Reservation from '../Reservation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="*" element={<Link to="/" className='border'>Retour accueil</Link>} />
      </Routes>
    </Router>
  );
}

export default App;