import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react';
import { userDataContext } from '../context/userContext';


import axios from 'axios';
const UserLogIn = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [userData, setuserData] = useState({})
    const {user,setUser}=useContext(userDataContext);
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        const userData={
            email:email,
            password:password
        }

        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
        if(response.status===200){
            const data=response.data;
            localStorage.setItem('token',data.token)
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            navigate('/home');
        }

        setEmail(' ');
        setPassword(' ');
    }
    return (
        <div className='p-7 h-screen    flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
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
        <p className='text-center'>new here?<Link className='text-blue-600' to="/signup">Create New Account </Link></p>
        </div>
        <div>
        <Link to='/captain-login' className='bg-black text-white flex items-center justify-center font-semibold  w-full  mb-7 rounded px-4 py-2 border  text-lg'>
                Sign In As Captain
            </Link>
          
        </div>
        </div>
    )
}

export default UserLogIn