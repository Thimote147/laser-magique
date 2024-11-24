import { motion } from 'framer-motion';
import {
  Crosshair,
  Shield,
  Target,
  Users,
  Map,
} from 'lucide-react';
import Button from '../components/ui/Button';
import StrategyCard from '../components/laser-game/StrategyCard';
import ArenaFeature from '../components/laser-game/ArenaFeature';
import about_lg from '../assets/about_lg.jpg';
import GameModeCard from '../components/cyber-trike/GameModeCard';

const gameModes = [
  {
    title: 'En Individuel',
    description: 'Affrontez les autres joueurs dans une partie de laser game où chacun est livré à lui-même.',
    difficulty: 'Moyen' as const,
    icon: Users,
    duration: '15 minutes',
    players: '2-20 joueurs'
  },
  {
    title: 'Par Équipe',
    description: 'Affrontez les equipes adverses dans une partie de laser game où la coordination et la communication sont essentielles.',
    difficulty: 'Facile' as const,
    icon: Users,
    duration: '15 minutes',
    players: '2-20 joueurs'
  },
  {
    title: 'Uniquement Entre Joueurs',
    description: 'Affrontez uniquement d\'autres joueurs sans la possibilité d\'attaquer les vaisseaux spatiaux pour une expérience purement compétitive.',
    difficulty: 'Facile' as const,
    icon: Users,
    duration: '15 minutes',
    players: '2-20 joueurs'
  },
  {
    title: 'Contre des vaisseaux spatiaux sans qu\'ils ne vous attaquent',
    description: 'Affrontez des vaisseaux spatiaux qui ne ripostent pas, parfait pour s\'entraîner et améliorer vos compétences de tir.',
    difficulty: 'Facile' as const,
    icon: Users,
    duration: '15 minutes',
    players: '2-20 joueurs'
  },
  {
    title: 'Contre des vaisseaux spatiaux qui vous attaquent',
    description: 'Affrontez des vaisseaux spatiaux qui ripostent, offrant un défi supplémentaire et une expérience de jeu plus intense.',
    difficulty: 'Difficile' as const,
    icon: Users,
    duration: '15 minutes',
    players: '2-20 joueurs'
  }
];

const strategies = [
  {
    icon: Shield,
    title: 'Maîtrise de la Défense',
    description: 'Apprenez à utiliser les armes efficacement et à vous protéger des attaques ennemies.'
  },
  {
    icon: Target,
    title: 'Précision de Tir',
    description: 'Maîtrisez l\'art du tir précis tout en vous déplaçant dans le labyrinthe.'
  },
  {
    icon: Users,
    title: 'Tactiques d\'Équipe',
    description: 'Coordonnez-vous avec vos coéquipiers pour exécuter des embuscades parfaites et des stratégies efficaces.'
  },
  {
    icon: Map,
    title: 'Connaissance du Labyrinthe',
    description: 'Naviguez efficacement dans le labyrinthe à plusieurs niveaux pour obtenir des avantages sur la connaissance du terrain.'
  }
];

const arenaFeatures = [
  {
    title: 'Taille du labyrinthe',
    value: '400m²',
    description: 'Labyrinthe à plusieurs niveaux avec diverses positions tactiques'
  },
  {
    title: 'Joueurs Max',
    value: '20',
    description: 'Parfait pour les grands groupes et les batailles en équipe'
  },
  {
    title: 'Modes de Jeu',
    value: '5',
    description: 'Affrontez d\'autres joueurs, en individuel ou par équipes, engagez-vous dans des combats contre des vaisseaux spatiaux, ou défendez-vous contre des vaisseaux spatiaux qui ripostent.'
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Entrez dans notre labyrinthe à plusieurs niveaux pour une expérience de combat laser intense.
              Le jeu stratégique rencontre l'équipement de haute technologie dans notre arène ultramoderne.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button href="/booking" variant="primary">
                Réservez maintenant
              </Button>
              <Button href="#arena-features" variant="outline">
                Explorer l'espace
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="arena-features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Caractéristiques
          </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {arenaFeatures.map((feature, index) => (
              <ArenaFeature key={feature.title} {...feature} index={index} />
            ))}
            </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Modes de jeu
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameModes.map((mode, index) => (
              <GameModeCard key={mode.title} {...mode} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Guide Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
            >
            Guide Stratégique
            </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategies.map((strategy, index) => (
              <StrategyCard key={strategy.title} {...strategy} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaserGame;