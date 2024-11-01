import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Link to="/" className='border'>Retour accueil</Link>} />
      </Routes>
    </Router>
  );
}

export default App;