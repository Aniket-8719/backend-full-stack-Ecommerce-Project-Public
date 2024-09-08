import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logout } from "../../actions/userAction";
import { Button } from "@mui/material";

const UserOptions = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async()=>{
    try {
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
      
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally handle logout failure, e.g., show error message
    }
  };
  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-center items-start gap-4 text-slate-900 shadow-lg rounded-md border-slate-300 border-[0.5px] py-4 px-8
        text-sm bg-white">
         {user.role==='admin' && <Link to={"/admin/dashboard"}>Dashboard</Link>}
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/orders"}>Orders</Link>
          <button onClick={logoutUser} className="flex justify-center items-center text-red-500 gap-2">
            <LuLogOut />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
