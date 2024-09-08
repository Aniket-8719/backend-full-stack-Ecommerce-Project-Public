import React from 'react'

const Loader = () => {
  return (
    <>
    <div className='flex justify-center mx-auto items-center max-w-[100%] w-[100vh]  h-[100vh] bg-white'>
        <div className='w-[10vmax] h-[10vmax] border-b-[5px] border-solid border-gray-500 rounded-[50%] animate-spin'></div>
    </div>
      
    </>
  )
}

export default Loader
