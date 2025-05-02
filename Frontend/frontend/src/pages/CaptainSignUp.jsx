import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignUp = () => {
    const navigate=useNavigate();
    const [email,setemail]=useState('');
        const [password,setPassword]=useState('');
        const [firstName,setFirstname]=useState('');
        const [lastName,setLastName]=useState('');
        const [userData, setuserData] = useState({})

        const [ vehicleColor, setVehicleColor ] = useState('')
        const [ vehiclePlate, setVehiclePlate ] = useState('')
        const [ vehicleCapacity, setVehicleCapacity ] = useState('')
        const [ vehicleType, setVehicleType ] = useState('')

        const {captain,setCaptain}=React.useContext(CaptainDataContext);
       const submitHandler=async(e)=>{
          e.preventDefault();
        const captainData={
            fullname:{
                firstname:firstName,
                lastname:lastName
            },
            email:email,
            password:password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
               vehicleType:vehicleType,
            }
          }

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

          if(response.status===201){
            const data=response.data;
            setCaptain(data.captain);
            localStorage.setItem('token',data.token);
            navigate('/captain-home');
          }
    
          setemail(' ');
          setFirstname(' ');
          setLastName(' ');
          setPassword(' ');
          setVehicleCapacity('');
          setVehicleColor(' ');
          setVehiclePlate(' ');
          setVehicleType(' ');
    
       }
  return (
     <div className='p-7 h-screen    flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-xl mb-2'>
                    Whats your name
    
                </h3>
                <div className='flex gap-3'>
                    <input required className='bg-white mb-7 rounded w-1/2 px-4 py-2 border  text-lg  ' type="text" placeholder='firstname' value={firstName} onChange={(e)=>{setFirstname(e.target.value)}} />
                <input required className='bg-white mb-7 w-1/2 rounded px-4 py-2 border  text-lg  ' type="text" placeholder='lastname' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                </div>
                <h3 className='text-xl mb-2'>
                    Whats your email
    
                </h3>
    
                <input required className='bg-white mb-7 w-full rounded px-4 py-2 border  text-lg  ' type="text" placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}}  />
                
                <h3>Enter password</h3>
                <input required type="password" className='bg-white mb-7 rounded px-4 py-2 border w-full text-lg' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
    
                <button className='bg-black text-white font-semibold  w-full  mb-7 rounded px-4 py-2 border  text-lg'>
                    Create Captain Account
                </button>
               
            </form>
            <p className='text-center'>Already have a account?<Link className='text-blue-600' to="/captain-login">Login here</Link></p>
            </div>
            <div>
            <p className='text-xs'>By Proceeding you consent to get calls,Whatsapp or sms messages,including by automated means from Uber and its affiliates to number provided</p>
            </div>
            </div>
  )
}

export default CaptainSignUp