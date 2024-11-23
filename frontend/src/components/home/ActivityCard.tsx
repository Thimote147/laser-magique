import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index: number;
}

const ActivityCard = ({ title, description, image, link, index }: ActivityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-black"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      <div className="relative p-8 h-full flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Button href={link} variant="outline" className="self-start group">
            <span className="flex items-center gap-2">
            Découvrir Plus
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ActivityCard;