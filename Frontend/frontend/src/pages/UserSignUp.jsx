import React from 'react'
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {userDataContext} from '../context/userContext';

const UserSignUp = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setuserData] = useState({})
    const navigate = useNavigate();
    const {user,setUser}=useContext(userDataContext);

    
    const submitHandler = async(e) => {
        e.preventDefault();


        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
if(response.status===201){
    const data=response.data;
    setUser(data.user);
    localStorage.setItem('token',data.token);
    navigate('/home');
}

        setemail(' ');
        setFirstname(' ');
        setLastName(' ');
        setPassword(' ');

    }
    return (
        <div className='p-7 h-screen    flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-xl mb-2'>
                        Whats your name

                    </h3>
                    <div className='flex gap-3'>
                        <input required className='bg-white mb-7 rounded w-1/2 px-4 py-2 border  text-lg  ' type="text" placeholder='firstname' value={firstName} onChange={(e) => { setFirstname(e.target.value) }} />
                        <input required className='bg-white mb-7 w-1/2 rounded px-4 py-2 border  text-lg  ' type="text" placeholder='lastname' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <h3 className='text-xl mb-2'>
                        Whats your email

                    </h3>

                    <input required className='bg-white mb-7 w-full rounded px-4 py-2 border  text-lg  ' type="text" placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />

                    <h3>Enter password</h3>
                    <input required type="password" className='bg-white mb-7 rounded px-4 py-2 border w-full text-lg' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />

                    <button className='bg-black text-white font-semibold  w-full  mb-7 rounded px-4 py-2 border  text-lg'>
                        Create Account
                    </button>

                </form>
                <p className='text-center'>Already have a account?<Link className='text-blue-600' to="/login">Login here</Link></p>
            </div>
            <div>
                <p className='text-xs'>By Proceeding you consent to get calls,Whatsapp or sms messages,including by automated means from Uber and its affiliates to number provided</p>
            </div>
        </div>
    )
}

export default UserSignUp