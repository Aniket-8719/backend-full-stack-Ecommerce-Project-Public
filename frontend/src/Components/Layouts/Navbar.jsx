import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import UserOptions from './UserOptions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const [open, setOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, profileRef]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileOptions(!profileOptions);
  };

  return (
    <>
      <ul ref={menuRef} className={`flex-row fixed items-center shadow-lg py-[80px] md:px-36 px-8 bg-white z-50 top-0 w-[70%] md:w-[25%] h-full transition-all duration-500 ease-in-out ${open ? 'left-0' : 'left-[-490px]'}`}>
        <div className='text-4xl absolute z-[10] left-8 top-8 cursor-pointer' onClick={() => setOpen(false)}>
          <VscClose />
        </div>
        <Link to={"/"} onClick={() => setOpen(false)} className='flex items-center justify-center'>
          <li className='text-xl mx-8 my-6 flex-row items-center '>
            <span className='text-gray-800 hover:text-gray-400 duration-500'>Home</span>
          </li>
        </Link>
        <Link to={"/products"} className='flex items-center justify-center'>
          <li className='text-xl mx-8 my-6 flex-row items-center '>
            <span className='text-gray-800 hover:text-gray-400 duration-500'>Products</span>
          </li>
        </Link>
        <Link to={"/contact"} className='flex items-center justify-center'>
          <li className='text-xl mx-8 my-6 flex-row items-center '>
            <span className='text-gray-800 hover:text-gray-400 duration-500'>Contact</span>
          </li>
        </Link>
        <Link to={"/faq"} className='flex items-center justify-center'>
          <li className='text-xl mx-8 my-6 flex-row items-center '>
            <span className='text-gray-800 hover:text-gray-400 duration-500'>FAQ</span>
          </li>
        </Link>
      </ul>

      <nav className='fixed top-0 left-0 w-full z-40 bg-white'>
        <div className='h-10vh flex justify-between z-[5] lg:py-5 px-8 md:px-8 space-x-4 sm:space-x-1 py-4 shadow-lg '>
          <div className='flex items-center justify-between gap-2 sm:gap-4'>
            <div className='text-4xl mr-4 cursor-pointer' onClick={handleMenuClick}>
              <HiMenuAlt2 />
            </div>
            <Link to="/" >Logo</Link>
          </div>

          <div className='flex items-center justify-center sm:gap-8 gap-4 text-2xl'>
            {/* <Link className='text-3xl'><IoMdHeartEmpty /></Link> */}
            <Link to={"/cart"}>
            {isAuthenticated && <div className='bg-red-700 absolute top-4 rounded-full right-20 sm:right-24  px-2.5 py-1 '><h1 className='text-white text-xs'>{cartItems.length}</h1></div>}
            <div className='text-3xl'><LuShoppingCart /></div>
            </Link>
            {isAuthenticated ?
              <div ref={profileRef} className="relative">
                <img alt='profileIMG'
                  onClick={handleProfileClick}
                  className='h-[40px] w-[40px] rounded-full border-slate-300 border-2 cursor-pointer' src={user.avatar.url}
                />
                {profileOptions && <div className='absolute z-50 top-[2.8rem] -right-4'><UserOptions /></div>}
              </div>
              :
              <>
                <Link to="/login"><button
                  className="text-white sm:-mr-0 -mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get Started
                </button></Link>
              </>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
