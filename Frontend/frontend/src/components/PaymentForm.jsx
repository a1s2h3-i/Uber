import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectStatus = searchParams.get('redirect_status');
  
  // Check for Stripe redirect first
  if (redirectStatus) {
    return (
      <div className="p-4">
        {redirectStatus === 'succeeded' ? (
          <div className="text-green-500">
            <h2>Payment Successful!</h2>
            <Link to="/home" className="text-blue-500">Return Home</Link>
          </div>
        ) : (
          <div className="text-red-500">
            <h2>Payment Failed</h2>
            <Link to="/payment" className="text-blue-500">Try Again</Link>
          </div>
        )}
      </div>
    );
  }

  // Normal payment flow
  const { amount = 0 } = location.state || {};
  console.log("Amount received on payment page:", amount);

  if (!amount || isNaN(amount)) {
    return (
      <div className="p-4">
        <p className="text-red-500">Invalid payment amount. Please start a new ride.</p>
        <Link to="/home" className="text-blue-500">Go back home</Link>
      </div>
    );
  }

  const options = {
    mode: 'payment',
    amount: Math.round(Number(amount) * 100),
    currency: 'inr', // Changed to INR since your fare is in rupees
    payment_method_types: ['card'],
    locale:'en-IN'
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payment: ₹{amount}</h2>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
export default PaymentForm;
