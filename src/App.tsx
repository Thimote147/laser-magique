import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gestion from './Gestion';
import Profile from './Profile';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;