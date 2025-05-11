import React from 'react'

const LookingForDriver = (props) => {
  return (
    <>

    <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        props.setvehicleFound(false);
      }}><i className="ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>
      <div className='flex justify-between flex-col items-center'>
      <img className='h-20' src="https://images.yourstory.com/cs/2/e641e900925711e9926177f451727da9/uber21562221370183-1576818357536-1581420718728-1611030611904.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75" alt=""/>
      <div className="w-full mt-5">
         <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>{props.pickup}</p></div>
         
         </div>
         <div className='flex items-center gap-5 p-3 border-b-2'> <i className=" text-lg ri-map-pin-2-fill"></i>
         <div><h3 className='text-lg font-medium'>562-11A</h3>
         
         <p className='text-gray-600'>{props.destination}</p></div></div>
         <div className="flex items-center gap-5 p-3 ">
         <i className=" ri-currency-line"></i>
         <div><h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>
         
       
         </div>
         </div>
      </div>
     
      </div>
      </>
  )
}

export default LookingForDriver