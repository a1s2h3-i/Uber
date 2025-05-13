import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const ride = JSON.parse(localStorage.getItem("activeRide"));
    if (ride) {
      socket.emit('payment-success', { rideId: ride._id, captainId: ride.captain._id });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="mb-6">Thank you for your payment.</p>
        <Link to="/home" className="bg-black text-white px-6 py-2 rounded-lg inline-block">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
