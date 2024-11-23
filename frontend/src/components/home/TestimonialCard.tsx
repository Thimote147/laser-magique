import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  activity: string;
  rating: number;
  comment: string;
}

const TestimonialCard = ({ name, activity, rating, comment }: TestimonialCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-300 mb-4">{comment}</p>
      <div className="border-t border-gray-700 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">{activity}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;