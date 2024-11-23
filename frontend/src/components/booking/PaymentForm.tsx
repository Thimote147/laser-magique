import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
}

const PaymentForm = ({ amount, onSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'Payment failed');
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
        }),
      });

      if (!response.ok) throw new Error('Payment failed');
      
      onSuccess();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="p-4 bg-gray-700 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`
          w-full py-3 rounded-full font-semibold
          ${processing
            ? 'bg-gray-500'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
          }
        `}
      >
        {processing ? 'Processing...' : `Pay €${amount}`}
      </button>
    </motion.form>
  );
};

export default PaymentForm;