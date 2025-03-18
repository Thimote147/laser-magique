import { motion } from 'framer-motion';
import {
  Crosshair,
  Shield,
  Users,
  Clock,
  AlertTriangle
} from 'lucide-react';
import about_lg from '../../assets/about_lg.jpg';
import { Button } from '../../components/ui/Button';
import ArenaFeature from '../../components/laser-game/ArenaFeature';
import StrategyCard from '../../components/laser-game/StrategyCard';

const safetyRules = [
  {
    icon: AlertTriangle,
    title: 'Ne pas courir',
    description: 'Pour votre sécurité, la course est interdite dans l\'arène.'
  },
  {
    icon: Users,
    title: 'Distance de sécurité',
    description: 'Maintenez environ 2 mètres de distance avec les autres joueurs.'
  },
  {
    icon: Shield,
    title: 'Rester debout',
    description: 'Pour une expérience optimale et sécurisée, restez debout pendant le jeu.'
  },
  {
    icon: AlertTriangle,
    title: 'Sécurité de l\'arme',
    description: 'Mettez bien la lanière de votre arme autour de votre cou'
  },
  {
    icon: AlertTriangle,
    title: 'Placement de l\'arme',
    description: 'Mettez bien votre arme toujours à auteur du ventre, jamais plus haut que le dessous de l\'epaule'
  }
];

const arenaFeatures = [
  {
    title: 'Durée de partie',
    value: '15min',
    description: 'Parties chronométrées sur réservation'
  },
  {
    title: 'Capacité',
    value: '2-20',
    description: 'Joueurs par session'
  },
  {
    title: 'Équipement',
    value: 'Léger',
    description: 'Matériel hygiénique et robuste'
  }
];

const LaserGame = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={about_lg}
            alt="Laser Game"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Crosshair className="w-16 h-16 text-purple-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Laser Game
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto space-y-6"
            >
              <p>
                Le Laser Game, appelé aussi Laser Shooting, Laser Tag, Q-Zar, jeu de laser, est un jeu entreprenant, amusant et stratégique qui consiste à faire lutter entre eux différents participants, qui sont équipés d'un pistolet disposant d'un pointer laser coloré ou infrarouge, indolore et sans danger. Les participants jouent dans un labyrinthe sombre et éclairé par des lumières fluorescentes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button href="/booking" variant="primary">
                Réserver maintenant
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Expérience Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Chez Laser Magique
          </motion.h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-gray-300 mb-6">
              Nous utilisons une technologie 100% belge et innovante, basée sur une arme mixte (laser et infrarouge) ne nécessitant aucun port de capteur (pas de veste). L'équipement est léger, hygiénique, robuste et permet de rentrer dans une partie rapidement.
            </p>
            <p className="text-gray-300">
              Laser Magique vous fait découvrir un Laser Game original dans lequel vous jouerez avec nos robots et figurines interactifs en 3D, qui n'hésiteront pas à riposter pour vous faire perdre des points. Vous devrez faire preuve de stratégie, en équipe ou seul, afin de les toucher pour prendre de l'avance et terminer la partie avec le meilleur score. Double challenge: il vous faudra également être attentif aux autres joueurs !
            </p>
          </div>
        </div>
      </section>

      {/* Arena Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Informations Pratiques
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {arenaFeatures.map((feature, index) => (
              <ArenaFeature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety Rules */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Règles de Sécurité
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyRules.map((rule, index) => (
              <StrategyCard key={rule.title} {...rule} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Briefing Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Instructions & Briefing
          </motion.h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-gray-300 mb-6">
              Nous accordons une importance toute particulière au premier contact avec le(s) joueur(s). Nous expliquons le jeu, le pistolet, comment gagner des points, comment éviter de se faire toucher et nous insistons sur les règles de sécurité.
            </p>
            <p className="text-gray-300 mb-6">
              Il y a également des possibilités de diversifier les parties afin qu'elles ne se ressemblent pas. À la fin du briefing, nous équipons le(s) joueur(s) et la partie peut commencer...
            </p>
            <div className="flex items-center gap-3 text-purple-400">
              <Clock className="w-6 h-6" />
              <span className="font-medium">Durée de la partie : 15 minutes, sur réservation.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaserGame;