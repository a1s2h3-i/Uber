import React from 'react'

const VehiclePanel = (props) => {
  return (
    <>
    <h5 className='p-3 text-center  w-full left-4 top-2 absolute w-[90%] ' onClick={()=>{
        props.setVehiclePanelOpen(false);
        props.setConfirmedRidePanel(true);
      }}><i className="ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div className='flex items-center justify-between w-full p-3 bg-gray-100 rounded-xl border border-transparent active:border-black mb-2 ' onClick={()=>{props.setConfirmedRidePanel(true)}}>
      <img className='h-10' src="https://images.yourstory.com/cs/2/e641e900925711e9926177f451727da9/uber21562221370183-1576818357536-1581420718728-1611030611904.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75"/>
<div className=' w-1/2'>
  <h4 className='font-medium text-sm'>Uber Go<span><i className='ri-user-3-fill'></i></span></h4>
  <h5 className='font-medium text-sm'>2 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable</p>
</div>
<h2>Rs193</h2>

    </div>
    <div className='flex items-center justify-between w-full p-3 bg-gray-100 rounded-xl border border-transparent active:border-black mb-2' onClick={()=>{props.setConfirmedRidePanel(true)}}>
      <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"/>
<div className=' w-1/2'>
  <h4 className='font-medium text-sm'>Uber Go<span><i className='ri-user-3-fill'></i></span></h4>
  <h5 className='font-medium text-sm'>2 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable</p>
</div>
<h2>Rs193</h2>

    </div>
    <div className='flex items-center justify-between w-full p-3 bg-gray-100 rounded-xl border border-transparent active:border-black mb-2 ' onClick={()=>{props.setConfirmedRidePanel(true)}}>
      <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"/>
<div className=' w-1/2'>
  <h4 className='font-medium text-sm'>Uber Go<span><i className='ri-user-3-fill'>3</i></span></h4>
  <h5 className='font-medium text-sm'>2 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable</p>
</div>
<h2>Rs193</h2>

    </div>
    </>
  )
}

export default VehiclePanel