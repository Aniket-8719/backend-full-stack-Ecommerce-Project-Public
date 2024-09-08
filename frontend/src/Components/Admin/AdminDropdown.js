// AdminDropdown.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const AdminDropdown = () => {
  const [dropdown, setDropdown] = useState(null);
  const [mobileToggle, setMobileToggle] = useState(true);

  const handleDropdownToggle = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <>
      <div
        className={`bg-white border-r border-r-slate-400 w-64 md:w-72 h-screen flex flex-col fixed top-16 pt-4 z-30 md:left-0  animation duration-500 ${
          mobileToggle ? "-left-60" : "left-0"
        }`}
      >
        <button
          onClick={() => setMobileToggle(!mobileToggle)}
          className={`absolute  top-8 z-10 md:hidden visible  text-black  text-4xl right-0 -mr-4 rounded-xl`}
        >
          {mobileToggle === true ? (
            <BsArrowRightSquareFill className="rounded-lg bg-white" />
          ) : (
            <BsArrowLeftSquareFill className="rounded-lg bg-white" />
          )}{" "}
        </button>
        <Link
          to={"/admin/dashboard"}
          className="flex items-center py-2 px-4 mt-4 text-left hover:bg-gray-700 hover:text-white"
        >
          <MdDashboard className="mr-2" />
          Dashboard
        </Link>

        <div className="relative ">
          <button
            onClick={() => handleDropdownToggle("products")}
            className="flex items-center py-2 px-4  hover:bg-gray-700 w-full hover:text-white"
          >
            <FaBoxOpen className="mr-2" />
            Product
            {dropdown ? (
              <IoIosArrowUp className="ml-2" />
            ) : (
              <IoIosArrowDown className="ml-2" />
            )}
          </button>

          {dropdown === "products" && (
            <div className="absolute left-0 w-full bg-gray-300">
              <Link
                to="/admin/products"
                className="py-2 px-4 flex items-center hover:bg-gray-700 hover:text-white"
              >
                <FaClipboardList className="mr-2" />
                All
              </Link>
              <Link
                to="/admin/product/create"
                className="py-2 px-4 flex items-center hover:bg-gray-700 hover:text-white"
              >
                <FaPlus className="mr-2" />
                Create
              </Link>
            </div>
          )}
        </div>

        <Link
          to={"/admin/orders"}
          className="flex items-center py-2 px-4 text-left hover:bg-gray-700 hover:text-white"
        >
          <FaClipboardList className="mr-2" />
          Orders
        </Link>

        <Link
          to={"/admin/users"}
          className="flex items-center py-2 px-4 text-left hover:bg-gray-700 hover:text-white"
        >
          <FaUsers className="mr-2" />
          Users
        </Link>

        <Link
          to="/admin/reviews"
          onClick={() => handleDropdownToggle("reviews")}
          className="flex items-center py-2 px-4 text-left hover:bg-gray-700 hover:text-white"
        >
          <FaStar className="mr-2" />
          Reviews
        </Link>
      </div>
    </>
  );
};

export default AdminDropdown;
