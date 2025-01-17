import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import HomePage from '../pages/home/HomePage';
import { AuthRoute, ProtectedRoute } from './RouteGuards';
import { AuthPage } from '../pages/auth/AuthPage';
import { RegisterPage } from '../pages/auth/register/RegisterPage';
import ProfilePage from '../pages/profile/ProfilePage';
import LaserGamePage from '../pages/laser-game/LaserGamePage';
import VirtualRealityPage from '../pages/virtual-reality/VirtualRealityPage';
import CyberTrikePage from '../pages/cyber-trike/CyberTrikePage.tsx';
import BookingPage from '../pages/booking/BookingPage';
import GestionPage from '../pages/GestionPage.tsx';
import BookingDetails from '../pages/booking/BookingDetails.tsx';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthRoute><AuthPage /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
            <Route path="/laser-game" element={<AuthRoute><LaserGamePage /></AuthRoute>} />
            <Route path="/virtual-reality" element={<AuthRoute><VirtualRealityPage /></AuthRoute>} />
            <Route path="/cyber-trike" element={<AuthRoute><CyberTrikePage /></AuthRoute>} />

            {/* Protected Routes */}
            <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
            <Route path="/booking/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
            <Route path="/gestion" element={<ProtectedRoute><GestionPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Route>
    )
);