import React from 'react'
import { useState,useRef } from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const [pickup,setpickup]=useState('');
  const [destination,setDestination]=useState('');
  const [panelOpen,setpanelOpen]=useState(false);
  const panelRef=useRef(null);
  const vehiclePanelref=useRef(null);
  const vehicleFoundRef=useRef(null);
  const panelCloseRef=useRef(null);
  const ConfirmedRidePanelRef=useRef(null);
  const [vehiclePanelOpen,setVehiclePanelOpen]=useState(false);
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);

  const [vehicleFound,setvehicleFound]=useState(false);
  const WaitingFordriverRef=useRef(null);
  const [WaitingFordriver, setWaitingFordriver] = useState(false);
  
  const submitHandler=(e)=>{
    e.preventDefault();


  }

  useGSAP(function(){
    if(panelOpen){
    gsap.to(panelRef.current,{
      height:'70%',
      opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
  }
  else{
    gsap.to(panelRef.current,{
      height:"0%",
      opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
  }

  },[panelOpen])
  useGSAP(function(){
  if(vehiclePanelOpen){
    gsap.to(vehiclePanelref.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(vehiclePanelref.current,{
      transform:'translateY(100%)'

    })
  }
  },[vehiclePanelOpen])
  ///////////////////
  useGSAP(function(){
    if(ConfirmedRidePanel){
      gsap.to(ConfirmedRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(ConfirmedRidePanelRef.current,{
        transform:'translateY(100%)'
  
      })
    }
    },[ConfirmedRidePanel])

    useGSAP(function(){
      console.log("vehicleFound:", vehicleFound); 
      if(vehicleFound){
        gsap.to(vehicleFoundRef.current,{
          transform:'translateY(0)'
        })
      }
      else{
        gsap.to(vehicleFoundRef.current,{
          transform:'translateY(100%)'
    
        })
      }
      },[vehicleFound])
      
    useGSAP(function(){
    //  console.log("vehicleFound:", vehicleFound); 
      if(WaitingFordriver){
        gsap.to(WaitingFordriverRef.current,{
          transform:'translateY(0)'
        })
      }
      else{
        gsap.to(WaitingFordriverRef.current,{
          transform:'translateY(100%)'
    
        })
      }
      },[WaitingFordriver])
  return (
    <>
    <div className='h-screen relative overflow-hidden'>
    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <div className='h-screen w-screen' >

      <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>

    </div>
    <div className=' flex flex-col  justify-end absolute top-0  h-screen w-full '>
      <div className='h-[30%] bg-white relative'>
        <h5 className='absolute right-6 top-6 text-2xl opacity-0' ref={panelCloseRef} onClick={()=>{setpanelOpen(false)}}>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
      <h4 font-semibold>FInd a trip</h4>
      <form onSubmit={(e)=>{
        submitHandler(e);
      }} className='pt-10 px-4'>
        <div className='line absolute h-20 w-1 top-0 bg-black '></div>
        <input  onClick={()=>{setpanelOpen(true)}} className='bg-[#eee] px-8 py-2 rounded-lg w-full mb-3' type="text" placeholder='Add a pickup' value={pickup} onChange={(e)=>{
          setpickup(e.target.value);
        }}/>
        <input type="text"onClick={()=>{setpanelOpen(true)}}  className='bg-[#eee] px-8 py-2 rounded-lg w-full' placeholder='Enter your destination' value={destination} onChange={(e)=>{
          setDestination(e.target.value);
        }}/>

      </form>
      </div>
      <div ref={panelRef}   className='h-0 bg-white '>
<LocationSearchPanel setpanelOpen={setpanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
    </div>
    <div  ref={vehiclePanelref} className='fixed z-10 bottom-0  p-5 w-full max-h-[70%] bg-white overflow-y-auto translate-y-full px-3 py-6 pt-12'>
     <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
    </div>
    <div  ref={ConfirmedRidePanelRef} className='fixed z-10 bottom-0  p-5 w-full max-h-[70%] bg-white overflow-y-auto translate-y-full px-3 py-6 pt-12 '>
     <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setvehicleFound={setvehicleFound}/>
    </div>
    <div  ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 '>
     <LookingForDriver  setvehicleFound={setvehicleFound}/>
    </div>
    <div  ref={WaitingFordriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12 '>
   
     <WaitingForDriver WaitingFordriver={WaitingFordriver} />
    </div>

    </div>
    </>
  )
}

export default Home