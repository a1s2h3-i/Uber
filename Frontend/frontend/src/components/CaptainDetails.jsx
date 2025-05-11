import React from 'react'
import { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain}=useContext(CaptainDataContext);
  return (
    <div className="h-1/2 p-4">
    <div className='flex items-center justify-between mb-4'>
      <div className='flex items-center  gap-3'>
        <img  className=" h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt=""/>
        <h4 className='text-lg font-semibold capitalize'>{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
      </div>
    
    <div className="flex flex-col items-end ">
<h4 className="text-lg font-bold">Rs295.20</h4>
<p className="text-sm font-bold bg-gray-200 px-2 py-1 rounded">Earned</p>
</div>
</div>
    <div className='flex justify-center gap-5 items-start'>
   
<div className='text-center'><i class="ri-timer-2-line"></i>
<h5 className='text-lg font-medium'>10.2</h5>
<p className='text-sm text-gray-600'>Hours Online</p></div>
<div className='text-center'><i class="ri-speed-up-line"></i>
<h5 className='text-lg font-medium'>10.2</h5>
<p>Hours Online</p></div>
<div className='text-center'>
<i class="ri-booklet-line"></i>
<h5 className='text-lg font-medium'>10.2</h5>
<p  className='text-sm text-gray-600'>Hours Online</p>
</div>
</div>
 
</div>

  )
}

export default CaptainDetails