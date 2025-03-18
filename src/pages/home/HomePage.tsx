import { motion } from 'framer-motion';
import HeroSection from '../../components/home/HeroSection';
import ActivityCard from '../../components/home/ActivityCard';
import TestimonialCard from '../../components/home/TestimonialCard';
import { Users, Gift, Building, MapPin, Calendar, Clock } from 'lucide-react';
import bg_laser from '../../assets/bg_laser.jpg';

const activities = [
  {
    title: 'Laser Game',
    description: 'Naviguez à travers notre labyrinthe à plusieurs niveaux dans ce combat tactique au laser.',
    image: bg_laser,
    link: '/laser-game'
  }
];

const testimonials = [
  {
    name: "Marc Dubois",
    activity: "Laser Game",
    rating: 5,
    comment: "Le meilleur laser game de Belgique ! Le labyrinthe à plusieurs niveaux ajoute tellement de stratégie."
  }
];

const pricingOptions = [
  {
    icon: Users,
    title: 'Tarif Groupe',
    price: '8€',
    description: 'Par personne et par partie',
    features: [
      'De 2 à 20 joueurs',
      'À partir de 7 ans',
      'Partie de 15 minutes',
      'Sur réservation'
    ]
  },
  {
    icon: Gift,
    title: 'Tarif Anniversaire',
    price: '200€',
    description: '10 personnes minimum',
    features: [
      'À partir de 9 ans',
      '+20€ par enfant supplémentaire',
      'Boissons (eau et grenadine) à volonté',
      'Durée : 2 heures',
      'Cartons d\'invitation personnalisés',
      'Uniquement le gâteau d\'anniversaire autorisé'
    ]
  },
  {
    icon: Building,
    title: 'Salle d\'Événement',
    price: 'Sur mesure',
    description: 'Pour vos événements professionnels',
    features: [
      'Salle de conférence',
      'Matériel à disposition',
      'Team building',
      'Formules personnalisées'
    ]
  }
];

const infoCards = [
  {
    icon: MapPin,
    title: 'Localisation',
    description: 'Drève de l\'Infante 27b, 1410 Waterloo',
    link: 'https://goo.gl/maps/XYZ'
  },
  {
    icon: Calendar,
    title: 'Jours d\'ouverture',
    description: 'Du lundi au dimanche'
  },
  {
    icon: Clock,
    title: 'Horaires',
    description: '9h30 - 19h30'
  }
];

const HomePage = () => {
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
            Notre Activité
          </motion.h2>
          <div className="grid grid-cols-1 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={activity.title} {...activity} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Nos Tarifs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">{option.price}</span>
                  <span className="text-gray-400 ml-2">{option.description}</span>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Informations Pratiques
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infoCards.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-gray-300">{info.description}</p>
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-purple-400 hover:text-purple-300"
                  >
                    Voir sur la carte
                    <MapPin className="w-4 h-4 ml-2" />
                  </a>
                )}
              </motion.div>
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
          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;