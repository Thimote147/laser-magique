import { motion } from 'framer-motion';

interface ArenaFeatureProps {
  title: string;
  value: string;
  description: string;
  index: number;
}

const ArenaFeature = ({ title, value, description, index }: ArenaFeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default ArenaFeature;