import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer';

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ pt: '64px' }}> {/* Add 64px padding top to account for fixed navbar */}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};