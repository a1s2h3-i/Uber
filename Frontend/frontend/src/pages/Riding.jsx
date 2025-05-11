import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect,useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";


const Riding=()=>{
  const location=useLocation();
  const {ride}=location.state ||{};
  const { socket } = useContext(SocketContext)
  const navigate=useNavigate();

  socket.on("ride-ended",()=>{
    navigate("/home");
  })


    return (
        <div className="h-screen">
            <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
           <div className="h-1/2">
          <LiveTracking/>
            </div>
            <div className="h-1/2 p-4">
           
            <div className='flex items-center justify-between'>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"/>
        <div className='text-right'>
          <h2>{ride?.captain.fullname.firstname}</h2>
          <h4>{ride?.captain.vehicle.plate}</h4>
          <p>Maruti</p>
        </div>
      </div>
   
      <div className='flex justify-between flex-col items-center'>
  
      <div className="w-full mt-5">
         <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>{ride?.destination}</p></div>
         
         </div>
        
         <div className="flex items-center gap-5 p-3 ">
         <i className=" ri-currency-line"></i>
         <div><h3 className='text-lg font-medium'>{ride?.fare}</h3>
         
       
         </div>
         </div>
      </div>

      {/* {ride &&
      (
        <div>

          <h2>RideId :{ride.id}</h2>
          <p>PickupLocation: {ride.pickup}</p>
          <p>Destination:{ride.destination}</p>
        </div>
      )} */}
      <button className="w-full bg-green-600 text-white font-semibold p-2 rounded  mt-5">Make a payment</button>
      </div>
    </div>
            </div>
       
    )
}

export default Riding