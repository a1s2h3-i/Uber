import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FinishRide = (props) => {
  const navigate=useNavigate();
  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

        rideId: props.ride._id


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        navigate('/captain-home')
    }

}
  return (
    <>
    <div >
    <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        props.setfinishRidePanel(false);
      }}><i className="ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish Ride </h3>
      <div className='flex items-center justify-between bg-yellow-400 p-4'>
      <div className='flex items-center gap-3'>
        <img  className="h-10 w-12 object-cover " src=" https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.webp?a=1&b=1&s=612x612&w=0&k=20&c=lTdFATHVSi9pxSoQ5rZdmEikvruuPVtOMu3-1xenhZA="/>
        <h2 className='text-lg font-semibold'>{props.ride?.user.fullname.firstname}</h2>

      </div>
      <h5>2.2km</h5>
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


     <div className='mt-6 w-full'>
       
     <button  onClick={endRide} className=' block w-full bg-green-600  text-center text-white font-semibold p-2 rounded  mt-5' 
       
    >Finish Ride
    </button>
    <p className='text-red-500 mt-6 text-sm '>Click on finish ride button if you have complete ride</p>
       
     
     </div>
      </div>
      </div>
      </>
  )
}

export default FinishRide