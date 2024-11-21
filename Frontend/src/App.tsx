//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CyberTrike from './pages/CyberTrike';
import LaserGame from './pages/LaserGame';
import VirtualReality from './pages/VirtualReality.tsx';
import Gestion from './pages/Gestion';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laser-game" element={<LaserGame />} />
            <Route path="/virtual-reality" element={<VirtualReality />} />
            <Route path="/cyber-trike" element={<CyberTrike />} />
            <Route path="/gestion" element={<Gestion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;