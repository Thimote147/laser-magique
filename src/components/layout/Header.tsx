import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crosshair, User, Calendar, Package } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Laser Game', path: '/laser-game', icon: Crosshair },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative z-50">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Laser Magique
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 transition-colors hover:text-purple-400 ${
                  location.pathname === item.path ? 'text-purple-500' : 'text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  {user.role !== 'user' && (
                    <>
                      <Link
                        to="/gestion"
                        className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                      >
                        <Calendar className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/stock"
                        className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                      >
                        <Package className="w-5 h-5" />
                      </Link>
                    </>
                  )}
                </>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="w-5 h-5" />
                <span>Réserver maintenant</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed inset-x-0 top-16 z-40"
            >
              <div className="bg-black shadow-xl border-t border-gray-800">
                <div className="px-4 py-3 space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path 
                          ? 'text-purple-500 bg-white/5' 
                          : 'text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  {user && (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/5"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>Profil</span>
                      </Link>
                      {user.role !== 'user' && (
                        <>
                          <Link
                            to="/gestion"
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/5"
                            onClick={() => setIsOpen(false)}
                          >
                            <Calendar className="w-5 h-5" />
                            <span>Gestion</span>
                          </Link>
                          <Link
                            to="/stock"
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/5"
                            onClick={() => setIsOpen(false)}
                          >
                            <Package className="w-5 h-5" />
                            <span>Stock</span>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => {
                      window.location.href = '/booking';
                      setIsOpen(false);
                    }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Réserver maintenant</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;