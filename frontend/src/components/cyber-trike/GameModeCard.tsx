import { motion } from 'framer-motion';
import { Clock, Users, Trophy } from 'lucide-react';

interface GameModeProps {
  title: string;
  description: string;
  duration: string;
  players: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  index: number;
}

const GameModeCard = ({ title, description, duration, players, difficulty, index }: GameModeProps) => {
  const difficultyColors = {
    Facile: 'bg-green-500',
    Moyen: 'bg-yellow-500',
    Difficile: 'bg-red-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className={`${difficultyColors[difficulty]} px-3 py-1 rounded-full text-sm font-medium`}>
          {difficulty}
        </span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{players}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <span>Leaderboard enabled</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameModeCard;