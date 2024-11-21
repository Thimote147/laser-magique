import { motion } from 'framer-motion';
import { Minus, Plus, Users } from 'lucide-react';

interface ParticipantsSelectorProps {
  participants: number;
  setParticipants: (count: number) => void;
  minParticipants: number;
  maxParticipants: number;
}

const ParticipantsSelector = ({
  participants,
  setParticipants,
  minParticipants,
  maxParticipants,
}: ParticipantsSelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center mb-8"
      >
        <Users className="w-12 h-12" />
      </motion.div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => participants > minParticipants && setParticipants(participants - 1)}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
          disabled={participants <= minParticipants}
        >
          <Minus className="w-6 h-6" />
        </button>

        <div className="text-4xl font-bold w-20 text-center">{participants}</div>

        <button
          onClick={() => participants < maxParticipants && setParticipants(participants + 1)}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
          disabled={participants >= maxParticipants}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <p className="mt-4 text-gray-400">
        Min: {minParticipants} | Max: {maxParticipants} participants
      </p>
    </div>
  );
};

export default ParticipantsSelector;