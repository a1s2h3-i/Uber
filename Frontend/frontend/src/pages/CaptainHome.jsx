import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useRef } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useEffect,useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const ridePopupPanelRef=useRef(null);
  const [confirmRidePopupPanel, setconfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef=useRef(null);
  const {socket}=useContext(SocketContext);
  const {captain}=useContext(CaptainDataContext);
  const [ride,setride]=useState(null);

  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })


    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
console.log( {userId: captain._id,
  location: {
      ltd: position.coords.latitude,
      lng: position.coords.longitude
  }
  })
                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }



    const locationInterval = setInterval(updateLocation, 10000)
   // updateLocation();


  
    updateLocation()

    // return () => clearInterval(locationInterval)
}, [])


  socket.on('new-ride',(data)=>{
      console.log(data);
      setride(data);
      setridePopupPanel(true);
    })

/////////////////////
async function confirmRide(){
  
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

    rideId: ride._id,
    captainId: captain._id,


}, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
setridePopupPanel(false);
setconfirmRidePopupPanel(true)

}


    useGSAP(function(){
    //  console.log("vehicleFound:", vehicleFound); 
      if(ridePopupPanel){
        gsap.to(ridePopupPanelRef.current,{
          transform:'translateY(0)'
        })
      }
      else{
        gsap.to(ridePopupPanelRef.current,{
          transform:'translateY(100%)'
    
        })
      }
      },[ridePopupPanel])
      useGSAP(function(){
        //  console.log("vehicleFound:", vehicleFound); 
          if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupPanelRef.current,{
              transform:'translateY(0)'
            })
          }
          else{
            gsap.to(confirmRidePopupPanelRef.current,{
              transform:'translateY(100%)'
        
            })
          }
          },[confirmRidePopupPanel])
  return (
    <div className="h-screen">
           <div className='fixed p-3 top-0 flex items-center justify-between '>
            <img className='w-15' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
             <Link to="/captain-home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center">
             <i className='text-lg font-medium ri-logout-box-r-line'></i>
                        </Link>
          
           </div>

           <div className="h-1/2">
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
            </div>
            <div>
              <CaptainDetails/>
            </div>
            <div    ref={ridePopupPanelRef} className='fixed z-10 bottom-0  p-5 w-full max-h-[70%] bg-white overflow-y-auto translate-y-full  px-3 py-6 pt-12'>


  <RidePopUp ride={ride} setridePopupPanel={setridePopupPanel}setconfirmRidePopupPanel={setconfirmRidePopupPanel} confirmRide={confirmRide} />


    </div>
    <div    ref={confirmRidePopupPanelRef} className='fixed z-10 bottom-0  p-5 w-full h-screen  bg-white overflow-y-auto translate-y-full  px-3 py-6 pt-12'>
  <ConfirmRidePopUp  ride={ ride} setconfirmRidePopupPanel={setconfirmRidePopupPanel} setridePopupPanel={setridePopupPanel}/>
    </div>

           
            </div>
  )
}

export default CaptainHome