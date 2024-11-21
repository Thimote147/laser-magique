import { motion } from "framer-motion";
import { Headset, Shield, Sparkles, Trophy, Users, Zap } from "lucide-react";
import Button from "../components/ui/Button";
import GameModeCard from "../components/cyber-games/GameModeCard";
import FeatureHighlight from "../components/cyber-games/FeatureHighlight";

const gameModes = [
    {
      title: 'Cyber Quest',
      description: 'Embark on an epic journey through a digital realm, solving puzzles and defeating cyber enemies.',
      duration: '45 minutes',
      players: '1-4 players',
      difficulty: 'Easy' as const
    },
    {
      title: 'Data Storm',
      description: 'Race against time to collect data fragments while avoiding system corruption in this fast-paced challenge.',
      duration: '30 minutes',
      players: '2-6 players',
      difficulty: 'Medium' as const
    },
    {
      title: 'Neural Combat',
      description: 'Enter the neural network for an intense team-based combat experience in a dynamic digital battlefield.',
      duration: '60 minutes',
      players: '4-8 players',
      difficulty: 'Hard' as const
    }
  ];
  
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: 'Interaction en temps réel',
      description: 'Profitez d\'un gameplay fluide et sans décalage grâce à notre système de suivi de mouvement avancé.'
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Synchronisation multijoueur',
      description: 'Jouez ensemble en parfaite synchronisation avec vos amis et concurrents.'
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: 'Environnement sécurisé',
      description: 'Notre arène est équipée de protections et surveillée par un personnel formé pour votre sécurité.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: 'Classements mondiaux',
      description: 'Competez pour les premières places sur notre tableau de classement mondial.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: 'Effets spéciaux',
      description: 'Plongez-vous dans l\'action avec des effets de lumière et de son professionnels.'
    }
  ];

const VirtualReality = () => {
    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
                        alt="Cyber Games Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center mb-6"
                        >
                            <Headset className="w-16 h-16 text-purple-500" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Réalité Virtuelle
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                        >
                            Entrez dans le futur du jeu où vous devenez partie intégrante du jeu. Vivez une expérience
                            de jeu immersive comme jamais auparavant dans notre arène ultramoderne.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button href="/booking" variant="primary">
                                Réservez maintenant
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Game Modes Section */}
            <section className="py-20 px-4">
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

            {/* Features Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20">
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
                        {features.map((feature, index) => (
                            <FeatureHighlight key={feature.title} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VirtualReality;