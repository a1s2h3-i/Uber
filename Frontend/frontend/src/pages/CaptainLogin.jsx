import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const [email,setEmail]=useState(' ');
    const [password,setPassword]=useState(' ');
    const [captainData, setcaptainData] = useState({})
    const {captain,setCaptain}=React.useContext(CaptainDataContext);
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
      const captain= {
            email:email,
            password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
        if (response.status === 200) {
            const data = response.data
      
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
      
          }

        setEmail(' ');
        setPassword(' ');
    }
    return (
        <div className='p-7 h-screen    flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg"/>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <h3 className='text-xl mb-2'>
                Whats your email

            </h3>
            <input required className='bg-white mb-7 rounded px-4 py-2 border w-full text-lg  ' type="email" placeholder='email@example@com' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <h3>Enter password</h3>
            <input required type="password" className='bg-white mb-7 rounded px-4 py-2 border w-full text-lg' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

            <button className='bg-black text-white font-semibold  w-full  mb-7 rounded px-4 py-2 border  text-lg'>
                Login
            </button>
           
        </form>
        <p className='text-center'>Join as Fleet?<Link className='text-blue-600' to="/captain-signup">Register As Captain </Link></p>
        </div>
        <div>
        <Link to='/login' className='bg-black text-white flex items-center justify-center font-semibold  w-full  mb-7 rounded px-4 py-2 border  text-lg'>
                Sign In As User
            </Link>
          
        </div>
        </div>
    )
}

export default CaptainLogin