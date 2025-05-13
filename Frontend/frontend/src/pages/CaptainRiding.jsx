import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext'; // Import socket context
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import axios from 'axios';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false); // State for the payment success popup
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  const { socket } = useContext(SocketContext); // Get socket from context
  const navigate = useNavigate();

  // GSAP animation for the finish ride panel
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [finishRidePanel]);

  // Listen for the payment-success event from the socket
  useEffect(() => {
    socket.on('payment-success', ({ rideId }) => {
      console.log('✅ Payment received for ride:', rideId);
      setPaymentReceived(true); // Trigger the payment success popup
    });

    return () => {
      socket.off('payment-success'); // Clean up the listener when component unmounts
    };
  }, [socket]);

  // Handle the ride completion after payment confirmation
  const completeRideHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: rideData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert('✅ Ride completed successfully!');
        setPaymentReceived(false); // Close the payment success popup
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Error in completeRideHandler:', error);
      alert('❌ Failed to complete the ride.');
      // Log response error details
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Server Error: ${error.response.status} - ${error.response.data.message}`);
      }
    }
  };
  
  return (
    <div className="h-screen">
      {/* Header with logout */}
      <div className="fixed p-3 top-0 flex items-center justify-between">
        <Link to="/captain-home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Main content */}
      <div className="h-4/5">
        <LiveTracking />
      </div>

      {/* Button to trigger the finish ride panel */}
      <div className="h-4/5 p-6 bg-yellow-400 relative" onClick={() => setFinishRidePanel(true)}>
        <h5 className="p-3 text-center w-full left-4 top-2 absolute w-[90%]">
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4km away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
      </div>

      {/* Finish ride panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed z-10 bottom-0 p-5 w-full h-screen bg-white overflow-y-auto translate-y-full px-3 py-6 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} ride={rideData} />
      </div>

      {/* Payment Success Popup */}
      {paymentReceived && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Payment Completed</h2>
            <p className="mb-4">The user has completed the payment. You can now finish the ride.</p>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={completeRideHandler}
            >
              Complete Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainRiding;
