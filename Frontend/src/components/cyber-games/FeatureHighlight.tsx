import React from 'react';
import { motion } from 'framer-motion';

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureHighlight = ({ icon, title, description, index }: FeatureHighlightProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureHighlight;