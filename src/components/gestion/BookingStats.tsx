import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp } from 'lucide-react';

interface BookingStatsProps {
  totalBookings: number;
  totalRevenue: number;
  averageGroupSize: number;
}

const BookingStats = ({ totalBookings, totalRevenue, averageGroupSize }: BookingStatsProps) => {
  const stats = [
    {
      label: 'Réservations totales',
      value: totalBookings,
      icon: Calendar,
    },
    {
      label: 'Revenus totaux',
      value: `${totalRevenue}€`,
      icon: TrendingUp,
    },
    {
      label: 'Taille moyenne des groupes',
      value: averageGroupSize,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookingStats;