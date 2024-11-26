import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CyberTrike from './pages/CyberTrike';
import LaserGame from './pages/LaserGame';
import VirtualReality from './pages/VirtualReality';
import Gestion from './pages/Gestion';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Profile from './pages/Profile.tsx';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/laser-game" element={<LaserGame />} />
            <Route path="/virtual-reality" element={<VirtualReality />} />
            <Route path="/cyber-trike" element={<CyberTrike />} />
            <Route path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gestion"
              element={
                <ProtectedRoute adminOnly>
                  <Gestion />
                </ProtectedRoute>
              }
            />
            <Route path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;