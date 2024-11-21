import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import ActivityCard from '../components/home/ActivityCard';
import TestimonialCard from '../components/home/TestimonialCard';
import bg_laser from '../assets/bg-laser.jpg';
import bg_vr from '../assets/bg-vr.jpg';
import bg_cyber from '../assets/bg-ct.jpg';

const activities = [
  {
    title: 'Laser Game',
    description: 'Naviguez à travers notre labyrinthe à plusieurs niveaux dans ce combat tactique au laser.',
    image: bg_laser,
    link: '/laser-game'
  },
  {
    title: 'Réalité Virtuelle',
    description: 'Découvrez la réalité virtuelle comme jamais auparavant dans notre arène de 100m².',
    image: bg_vr,
    link: '/virtual-reality'
  },
  {
    title: 'Cyber Trike',
    description: 'Plongez dans le futur avec notre expérience de jeu cyber immersive.',
    image: bg_cyber,
    link: '/cyber-trike'
  }
];

const testimonials = [
  {
    name: "Sophie Laurent",
    activity: "Réalité Virtuelle",
    rating: 5,
    comment: "Une expérience VR incroyable ! L'espace est immense et les jeux sont fantastiques."
  },
  {
    name: "Marc Dubois",
    activity: "Laser Game",
    rating: 5,
    comment: "Le meilleur laser game de Belgique ! Le labyrinthe à plusieurs niveaux ajoute tellement de stratégie."
  },
  {
    name: "Emma Verstraete",
    activity: "Cyber Trike",
    rating: 4,
    comment: "Une expérience de jeu unique. On se sent comme dans le futur !"
  }
];

const Home = () => {
  return (
    <div className="bg-black text-white">
      <HeroSection />

      {/* Activities Section */}
      <section id="activities" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Nos Activités
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={activity.title} {...activity} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
        <div className="max-w-7xl mx-auto">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
            >
            Ce que disent nos visiteurs
            </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;