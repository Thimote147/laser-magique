import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    activity: string;
    date: Date;
    time: string;
    participants: number;
    bookingId: string;
  };
}

const ConfirmationModal = ({ isOpen, onClose, bookingDetails }: ConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">
              Booking Confirmed!
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span>{format(bookingDetails.date, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>{bookingDetails.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-500" />
                <span>{bookingDetails.participants} participants</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Booking reference: {bookingDetails.bookingId}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;