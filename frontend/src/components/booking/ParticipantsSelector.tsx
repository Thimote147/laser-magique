import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { SetStateAction, Dispatch } from 'react';
import { Activity } from '../../types';
import Counter from '../gestion/Counter';
import Pricing from '../gestion/Pricing';

interface ParticipantsSelectorProps {
  participants: number;
  setParticipants: Dispatch<SetStateAction<number>>;
  selectedActivity: Activity;
  setNbr_parties: Dispatch<SetStateAction<number>>;
}

const ParticipantsSelector = ({
  participants,
  setParticipants,
  selectedActivity,
  setNbr_parties,
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

      <Counter count={participants} setCount={setParticipants} min_player={selectedActivity.min_player} max_player={selectedActivity.max_player} />
      <Pricing count={participants} gameChosen={selectedActivity} setNbr_parties={setNbr_parties}/>
    </div>
  );
};

export default ParticipantsSelector;