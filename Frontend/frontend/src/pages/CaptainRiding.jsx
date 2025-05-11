import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
    const [finishRidePanel,setfinishRidePanel]=useState(false);
    const finishRidePanelRef=useRef(null);
    const location=useLocation();
    const rideData=location.state?.ride;
    useGSAP(function(){
        //  console.log("vehicleFound:", vehicleFound); 
          if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
              transform:'translateY(0)'
            })
          }
          else{
            gsap.to(finishRidePanelRef.current,{
              transform:'translateY(100%)'
        
            })
          }
          },[finishRidePanel])
  return (
    <div className="h-screen">
        
    <div className='fixed p-3 top-0 flex items-center justify-between '>

  
      <Link to="/captain-home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center">
      <i className='text-lg font-medium ri-logout-box-r-line'></i>
                 </Link>
   
    </div>

    <div className="h-4/5">
    <LiveTracking/>
     </div>
     <div className='h-4/5 p-6 bg-yellow-400 relative' onClick={()=>{
    setfinishRidePanel(true)
     }}>
     <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        
    }}><i className="ri-arrow-down-wide-line"></i></h5>
     <h4 className='text-xl font-semibold'>4km away </h4>
     <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>

     </div>
     <div    ref={finishRidePanelRef} className='fixed z-10 bottom-0  p-5 w-full h-screen  bg-white overflow-y-auto translate-y-full  px-3 py-6 pt-12'>
  <FinishRide setfinishRidePanel={setfinishRidePanel} ride={rideData} />
    </div>
   

    
     </div>
  )
}

export default CaptainRiding