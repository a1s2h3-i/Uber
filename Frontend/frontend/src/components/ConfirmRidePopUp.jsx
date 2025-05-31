import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const ConfirmRidePopUp = (props) => {
  const { socket } = useContext(SocketContext);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const handleRideCancelled = (data) => {
      if (data.forceNavigate) {
        navigate('/captain-home');
      }
    };

    socket.on('ride-cancelled', handleRideCancelled);

    return () => {
      socket.off('ride-cancelled', handleRideCancelled);
    };
  }, [socket, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        props.setconfirmRidePopupPanel(false);
        props.setridePopupPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (error) {
      console.error("OTP validation failed or ride couldn't be started:", error);
      // Show error message to user if needed
    }
  };

  // ✅ Updated cancel handler
  const handleCancelRide = () => {
    if (socket) {
      socket.emit('cancel-ride', {
        rideId: props.ride._id,
        cancelledBy: 'captain'
      });
    }
    props.setconfirmRidePopupPanel(false);
    props.setridePopupPanel(false);
    navigate('/captain-home');
  };
  

  return (
    <div>
      <h5 className='p-3 text-center absolute w-[90%]' onClick={handleCancelRide}>
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>A ride for you</h3>
      <div className='flex items-center justify-between bg-yellow-400 p-4'>
        <div className='flex items-center gap-3'>
          <img className="h-10 w-12 object-cover" src="https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.webp?a=1&b=1&s=612x612&w=0&k=20&c=lTdFATHVSi9pxSoQ5rZdmEikvruuPVtOMu3-1xenhZA=" alt="User" />
          <h2 className='text-lg font-semibold capitalize'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5>2.2km</h5>
      </div>

      <div className='flex justify-between flex-col items-center'>
        <div className="w-full mt-5">
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562-11A</h3>
              <p className='text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562-11A</h3>
              <p className='text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter the OTP"
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
            />
            <button type="submit" className='block w-full bg-green-600 text-white font-semibold p-2 rounded mt-5'>
              Confirm
            </button>
            <button
              type="button"
              className='w-full bg-gray-400 text-gray-700 font-semibold p-2 rounded mt-5'
              onClick={handleCancelRide}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
