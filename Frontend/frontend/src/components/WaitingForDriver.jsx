import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
          <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        props.WaitingForDriver(false);
      }}><i className="ri-arrow-down-wide-line"></i></h5>
      <div className='flex items-center justify-between'>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"/>
        <div className='text-right'>
          <h2>Ashish</h2>
          <h4>Mp 04 1234</h4>
          <p>Maruti</p>
        </div>
      </div>
   
      <div className='flex justify-between flex-col items-center'>
  
      <div className="w-full mt-5">
         <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>Kankariya Talab,Bhopal</p></div>
         
         </div>
         <div className='flex items-center gap-5 p-3 border-b-2'> <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>Kankariya Talab,Bhopal</p></div></div>
         <div className="flex items-center gap-5 p-3 ">
         <i className=" ri-currency-line"></i>
         <div><h3 className='text-lg font-medium'>Rs193.20</h3>
         
       
         </div>
         </div>
      </div>
      <button className='w-full bg-green-600 text-white font-semibold p-2 rounded  mt-5'onClick={()=>{props.setvehicleFound(true)}}>Confirm</button>
      </div>
    </div>
  )
}

export default WaitingForDriver