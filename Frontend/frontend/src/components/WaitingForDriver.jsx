import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const WaitingForDriver = (props) => {
  const {socket}=useContext(SocketContext);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!socket) return;

    const handleRideCancelled=(data)=>{
      if(data.rideId===props.ride._id){
        props.setWaitingFordriver(false);
        navigate('/home');
      }
    }
    socket.on('ride-cancelled',handleRideCancelled);

    return ()=>{
      socket.off('ride-cancelled',handleRideCancelled);
    };
  },[socket,props.ride?._id]);

  const handleCancelRide=()=>{
    if(!socket){
      console.log("not connected");
      return;
    }
    socket.emit('cancel-ride', {
      rideId: props.ride?._id,
      cancelledBy: 'user'
    });
    
    props.setWaitingFordriver(false);
    //yahan navigate use kar sakte

  }

  return (
    <div>
          <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        props.setWaitingFordriver(false);
      }}><i className="ri-arrow-down-wide-line"></i></h5>
      
      <div className='flex items-center justify-between'>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"/>
        <div className='text-right'>
          <h2>{props.ride?.captain.fullname.firstname}</h2>
          <h4>{props.ride?.captain.vehicle.plate}</h4>
          <p>Maruti</p>
          <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
      </div>
   
      <div className='flex justify-between flex-col items-center'>
  
      <div className="w-full mt-5">
         <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>{props.ride?.pickup}</p></div>
         
         </div>
         <div className='flex items-center gap-5 p-3 border-b-2'> <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>{props.ride?.destination}</p></div></div>
         <div className="flex items-center gap-5 p-3 ">
         <i className=" ri-currency-line"></i>
         <div><h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
         
       
         </div>
         </div>
      </div>
      <button className='w-full bg-green-600 text-white font-semibold p-2 rounded  mt-5'onClick={()=>{props.setvehicleFound(true)}}>Confirm</button>
      <button 
          className='w-full bg-red-500 text-white font-semibold p-2 rounded mt-3'
          onClick={handleCancelRide}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver