import React from 'react'
import { Link } from 'react-router-dom'
import { FcOk } from "react-icons/fc";

const OrderSuccess = () => {
  return (
    <>
   <div class="bg-gray-100 h-screen flex items-center justify-center ">
  <div class="flex flex-col justify-center items-center bg-white p-6 md:mx-auto text-center">
    <FcOk className='text-4xl text-center'/>
    <div>
      <h3 class="md:text-2xl text-base text-gray-900 font-semibold">Payment Done!</h3>
      <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
      <p className='mb-8'>Have a great day!</p>
      <Link to="/orders" class="py-4 px-8  bg-indigo-600 rounded-md hover:bg-indigo-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
        <button class="text-white  text-lg ">View Orders</button>
      </Link>
    </div>
  </div>
</div>

      
    </>
  )
}

export default OrderSuccess
