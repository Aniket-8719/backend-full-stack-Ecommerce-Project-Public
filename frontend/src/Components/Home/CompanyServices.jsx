import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import expressDelivery from '../assests/services/express-delivery.png';
import discount from '../assests/services/discount.png';
import subscription from '../assests/services/subscription-model.png';
import customerService from '../assests/services/customer-service.png';
import returnPolicy from '../assests/services/return.png';

const CompanyServices = () => {
  return (
    <>
      <div className='flex items-center justify-center gap-2  max-w-[500px] sm:max-w-[1400px] mx-2 sm:mx-auto'>
        <div className='flex flex-col  sm:gap-4 w-full  bg-gray-100 sm:bg-gray-300  items-center justify-center p-2 sm:p-4 rounded-lg'>
            <div className='text-xl w-8 sm:w-12 h-12'><img src={expressDelivery}  /></div>
            <h1 className='flex justify-center items-center text-[8px] sm:text-[14px]'>Fast Delivery</h1>
        </div>
        <div className='flex flex-col  sm:gap-4 w-full  bg-gray-100 sm:bg-gray-300  items-center justify-center p-2 sm:p-4 rounded-lg'>
            <div className='text-xl w-8 sm:w-12 h-12'><img src={discount}  /></div>
            <h1 className='flex justify-center items-center text-[8px] sm:text-[14px]'>Daily Discount</h1>
        </div>
        <div className='flex flex-col  sm:gap-4 w-full  bg-gray-100 sm:bg-gray-300  items-center justify-center p-2 sm:p-4 rounded-lg'>
            <div className='text-xl w-8 sm:w-12 h-12'><img src={subscription}  /></div>
            <h1 className='flex justify-center items-center text-[8px] sm:text-[14px]'>Subscriptions</h1>
        </div>
        <div className='flex flex-col  sm:gap-4 w-full  bg-gray-100 sm:bg-gray-300  items-center justify-center p-2 sm:p-4 rounded-lg'>
            <div className='text-xl w-8 sm:w-12 h-12'><img src={customerService}  /></div>
            <h1 className='flex justify-center items-center text-[8px] sm:text-[14px]'>Customer care</h1>
        </div>
        <div className='flex flex-col  sm:gap-4 w-full  bg-gray-100 sm:bg-gray-300  items-center justify-center p-2 sm:p-4 rounded-lg'>
            <div className='text-xl w-8 sm:w-12 h-12'><img src={returnPolicy}  /></div>
            <h1 className='flex justify-center items-center text-[8px] sm:text-[14px]'>Return policy</h1>
        </div>
    </div>  
      
    </>
  )
}

export default CompanyServices
