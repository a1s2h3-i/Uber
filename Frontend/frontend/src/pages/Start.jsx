import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>

        <div className="bg-cover  bg-[url(https://store.yeelight.com/cdn/shop/articles/The_Accidental_Invention_How_the_Traffic_Light_Came_to_Be_345x300_crop_center.png?v=1700395912)] h-screen pt-8  flex justify-between flex-col w-full ">
            <img  className="w-14 ml-8" src="https://www.vhv.rs/dpng/d/433-4335989_uber-logo-uber-blanc-png-transparent-png.png"/>
            <div className='bg-white py-5 px-10'>
                <h2 className=' text-3xl font-bold'>Get Started</h2>
                <Link  to='/login' className='inline-block w-full bg-black text-white py-3 rounded mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start