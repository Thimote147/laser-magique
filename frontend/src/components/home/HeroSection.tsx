import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/477743905.sd.mp4?s=04c808c5d7799c15a1e9d4e5d1e8737e0f3d8b7f&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Bienvenue au{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Laser Magique
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Découvrez le futur du jeu à Waterloo, Belgique
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/booking" variant="primary">
            Réservez maintenant
          </Button>
          <Button href="#activities" variant="outline">
            Explorez nos activités
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;