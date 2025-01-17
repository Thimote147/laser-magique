import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Gamepad2, Crosshair, Headset } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { name: 'Laser Game', path: '/laser-game', icon: Crosshair },
    { name: 'Réalité Virtuelle', path: '/virtual-reality', icon: Headset },
    { name: 'Cyber Trike', path: '/cyber-trike', icon: Gamepad2 },
  ];

  const handleClick = () => {
    if (!user || user.role === 'user') {
      window.location.href = '/booking';
    } else if (window.location.pathname === '/gestion') {
      window.location.href = '/profile';
    } else {
      window.location.href = '/gestion';
    }
  }

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Laser Magique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 hover:text-purple-400 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 px-6 py-2 rounded-full font-semibold transition-all duration-300" onClick={handleClick}>
              {user ? (user.role !== 'user' ? (window.location.pathname === "/gestion" ? "Profil" : "Gestion") : "Réservez maintenant") : "Réservez maintenant"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 text-white hover:text-purple-400 px-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 px-6 py-2 rounded-full font-semibold transition-all duration-300" onClick={handleClick}>
                {user ? (user.role !== 'user' ? (window.location.pathname === "/gestion" ? "Profil" : "Gestion") : "Réservez maintenant") : "Réservez maintenant"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;