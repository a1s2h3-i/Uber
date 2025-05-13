import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const res = await fetch('http://localhost:4000/api/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) * 100 }), // Convert to paise
      });

      if (!res.ok) throw new Error('Payment failed');

      const { clientSecret } = await res.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: 'if_required', // Important: Don't auto-redirect
      });

      if (error) throw error;
      
      // If we get here, payment succeeded without redirect
      setMessage("Payment successful!");
      setTimeout(() => navigate('/payment/success'), 2000);
      
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isLoading} className="w-full bg-black text-white p-3 rounded-lg mt-4">
        {isLoading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
