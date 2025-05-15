import { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const { socket } = useContext(SocketContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const ride = JSON.parse(localStorage.getItem("activeRide"));
    if (ride) {
      socket.emit('payment-success', { rideId: ride._id, captainId: ride.captain._id });
    }
  }, [socket]);

  const handleReviewSubmit = async () => {
    const ride = JSON.parse(localStorage.getItem("activeRide"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!ride) return;
  
    try {
      // Get the token from localStorage (or wherever you store the token)
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
  
      if (!token) {
        alert("You need to be logged in to submit a review");
        return;
      }
  
      console.log({
        rideId: ride._id,
        captainId: ride.captain._id,
        userId:user._id,
        rating,
        comment
      });
      // Send the token in the Authorization header
      await axios.post(
        'http://localhost:4000/reviews/create', 
        {
          rideId:ride._id,
          userId:user._id,
          captainId: ride.captain._id,
          rating,
          comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request header
          }
        }
      );
  
      localStorage.removeItem("activeRide");
      navigate('/home');
    } catch (err) {
      console.error("Failed to submit review", err);
      alert("Could not submit review. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="mb-6">Thank you for your payment.</p>

        <h2 className="text-lg font-semibold mb-2">Leave a review for your captain</h2>

        <div className="mb-4">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`text-2xl mx-1 ${rating >= num ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="Leave a comment..."
          className="w-full border rounded p-2 mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleReviewSubmit}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Submit Review
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Or <Link to="/home" className="underline">return home</Link> without reviewing
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
