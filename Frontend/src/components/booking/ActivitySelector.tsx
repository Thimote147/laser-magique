import { motion } from 'framer-motion';
import { Activity } from '../../types';

interface ActivitySelectorProps {
  activities: Activity[];
  selected: Activity | null;
  onSelect: (activity: Activity) => void;
}

const ActivitySelector = ({ activities, selected, onSelect }: ActivitySelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.activity_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            cursor-pointer p-6 rounded-xl transition-all
            ${selected?.activity_id === activity.activity_id
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 hover:bg-gray-600'
            }
          `}
          onClick={() => onSelect(activity)}
        >
          <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
          <p className="text-sm opacity-80">
            {activity.min_player}-{activity.max_player} players
          </p>
          <p className="mt-4 text-lg font-semibold">
            From €{activity.first_price}/person
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivitySelector;