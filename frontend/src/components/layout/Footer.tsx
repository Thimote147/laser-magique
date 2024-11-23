import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from '@icons-pack/react-simple-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Laser Magique
            </h3>
            <p className="text-gray-400">
              La destination ultime pour des expériences de jeu immersives à Waterloo, Belgique.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contactez-nous</h4>
            <div className="space-y-2">
              <a href="https://www.google.com/maps/place/Dr%C3%A8ve+de+l'Infante+27+b,+1410+Waterloo/@50.7171107,4.3828294,16z/data=!3m1!4b1!4m6!3m5!1s0x47c3ce2bd34f3b55:0xb12a8fafced2f7fc!8m2!3d50.7171073!4d4.3854097!16s%2Fg%2F11c5cc9qln?entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoASAFQAw%3D%3D" className="flex items-center space-x-2 hover:cursor-pointer hover:text-purple-500">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>Drève de l'Infante 27b, Waterloo</span>
              </a>
              <a href="tel:+32470537206" className="flex items-center space-x-2 hover:cursor-pointer hover:text-purple-500">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+32 470 537 206</span>
              </a>
              <a href="mailto:info@laser-magique.com" className="flex items-center space-x-2 hover:cursor-pointer hover:text-purple-500">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>info@laser-magique.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Heures d'ouverture</h4>
            <div className="space-y-2 text-gray-400">
              <p>Lundi - Vendredi: À la demande</p>
              <p>Samedi - Dimanche: 11:00 - 20:00</p>
              <p className='font-bold'>Uniquement sur réservation!</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/LaserMagique/" className="hover:text-purple-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/lasermagique_waterloo_bxl/" className="hover:text-purple-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@lasermagique1/" className="hover:text-purple-500 transition-colors">
                <SiTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Laser Magique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;