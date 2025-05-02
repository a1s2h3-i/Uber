import React from 'react'

 export const LocationSearchPanel = (props) => {
  {/* sample location */}
  const locations=[
    "24b, Hadapsar, Pune, Maharashtra, 200001",
    "24b, Hadapsar, Pune, Maharashtra, 200003",
    "24b, Hadapsar, Pune, Maharashtra, 200005"
  ]
  return (
   
    <div>
      {
        locations.map(function(e,idx){
          return(
          <div  key={idx} onClick={()=>{props.setVehiclePanelOpen(true);
            props.setpanelOpen(false);
          }} className='flex  p-3 rounded-xl border border-white active:border-black items-center justify-start'>
  <div className='bg-[#eee] h-10 w-10 flex items-center justify-center'>
    <i className="ri-map-pin-fill text-lg text-red-500"></i>
  </div>
  <h4 className='ml-3 text-base font-medium text-gray-800 bg-[#eee] h-10 px-3 flex items'>
   {e}
  </h4>
</div>
          )
        })
      }
       

    </div>
   
  )
}

export default LocationSearchPanel