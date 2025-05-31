import React, { useContext, useEffect } from 'react'
import { useState,useRef } from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { userDataContext } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup,setpickup]=useState('');
  const [destination,setDestination]=useState('');
  const [panelOpen,setpanelOpen]=useState(false);
  const panelRef=useRef(null);
  const vehiclePanelref=useRef(null);
  const vehicleFoundRef=useRef(null);
  const panelCloseRef=useRef(null);
  const ConfirmedRidePanelRef=useRef(null);
  const [ activeField, setActiveField ] = useState(null)
  const [vehiclePanelOpen,setVehiclePanelOpen]=useState(false);
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])

    const navigate=useNavigate();
  const [vehicleFound,setvehicleFound]=useState(false);
  const WaitingFordriverRef=useRef(null);
  const [WaitingFordriver, setWaitingFordriver] = useState(false);
  const [fare,setFare]=useState({});
  const [vehicleType,setVehicleType]=useState(null);
  const {sendMessage,receiveMessage}=useContext(SocketContext);
  const [ride,setRide]=useState(null);


  const {user}=useContext(userDataContext);
  
  const { socket } = useContext(SocketContext)
//let a=5;
  ///////////////////////////////////////////
  useEffect(() => {
    if (!user || !user._id) {
      console.log("❌ No user ID yet, not emitting");
      return;
    }
  
    console.log("📡 Emitting join:", { userId: user._id, userType: "user" });
    socket.emit("join", { userType: "user", userId: user._id });
  
    // Optional cleanup
    // return () => socket.off("joined");
   // localStorage.setItem("activeRide", JSON.stringify(ride));
  
  }, [user]);
  useEffect(() => {
    if (pickup && destination && vehicleType) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination, vehicleType },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setFare(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch fare:", error);
      });
    }
  }, [pickup, destination, vehicleType]);
  


  ///////////////////////////////////
   socket.on("ride-confirmed", (ride) => {
    console.log("🎉 Ride confirmed:", ride);
     setvehicleFound(false);
     setRide(ride);
     setWaitingFordriver(true);
     localStorage.setItem("activeRide", JSON.stringify(ride));
    // navigate("/riding", { state: { ride } });
   });
  
  
  
  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingFordriver(false)
    localStorage.setItem("activeRide", JSON.stringify(ride));
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
})


  
  const handlePickupChange = async (e) => {
    setpickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
    }
}

const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
        // handle error
    }
}
  ////////////////////////////////
  
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
      async function findTrip() {
        setVehiclePanelOpen(true)
        setpanelOpen(false)
        const params = { pickup, destination };
  if(vehicleType) params.vehicleType = vehicleType;

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);


        setFare(response.data)


    }

    async function createRide(){
      await new Promise(resolve => setTimeout(resolve, 500));
     const response=await  axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
     },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
     })
     console.log(response.data);

    }
  return (
    <>
    <div className='h-screen relative overflow-hidden'>
    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <div className='h-screen w-screen' >

     <LiveTracking/>

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
        
        <input
  onClick={() => { setpanelOpen(true)

    setActiveField('pickup')
   }

}
  className='bg-[#eee] px-8 py-2 rounded-lg w-full mb-3'
  type="text"
  placeholder='Add a pickup'
  value={pickup}
  onChange={(e) => {
    setpickup(e.target.value);      // Update pickup state
    handlePickupChange(e);          // Call your handler function
  }}
/>


<input
  type="text"
  onClick={() => {setpanelOpen(true)

    setActiveField('destination')
  }
  }
  className='bg-[#eee] px-8 py-2 rounded-lg w-full'
  placeholder='Enter your destination'
  value={destination}
  onChange={(e) => {
    setDestination(e.target.value); // Update state
    handleDestinationChange(e);     // Call your handler function
  }}
/>


      </form>
      <button className='bg-black text-white px-4 py-2 rounded w-full mt-3' onClick={findTrip}>Find Trip</button>
      </div>


      <div ref={panelRef}   className='h-0 bg-white '>
<LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setpanelOpen={setpanelOpen}
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        setPickup={setpickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
      </div>


    </div>


    <div  ref={vehiclePanelref} className='fixed z-10 bottom-0  p-5 w-full max-h-[70%] bg-white overflow-y-auto translate-y-full px-3 py-6 pt-12'>
     <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
    </div>
    <div  ref={ConfirmedRidePanelRef} className='fixed z-10 bottom-0  p-5 w-full max-h-[70%] bg-white overflow-y-auto translate-y-full px-3 py-6 pt-12 '>

     <ConfirmedRide  pickup={pickup}  destination={destination} fare={fare} vehicleType={vehicleType} createRide={ createRide} setConfirmedRidePanel={setConfirmedRidePanel} setvehicleFound={setvehicleFound} setVehiclePanelOpen={setVehiclePanelOpen}/>
    </div>

    <div  ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 '>

     <LookingForDriver  setvehicleFound={setvehicleFound}  pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} createRide={ createRide} setConfirmedRidePanel={setConfirmedRidePanel} />

    </div>
    <div  ref={WaitingFordriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12 '>
   
     <WaitingForDriver ride={ride} setvehicleFound={setvehicleFound} setWaitingFordriver={setWaitingFordriver} WaitingFordriver={WaitingFordriver} />
    </div>

    </div>
    </>
  )
}

export default Home