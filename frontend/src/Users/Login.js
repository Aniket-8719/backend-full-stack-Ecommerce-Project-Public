import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../actions/userAction";
import { toast } from "react-toastify";
import { tableSortLabelClasses } from "@mui/material";
import Loader from "../Components/Layouts/Loader";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated} = useSelector((state) => state.user);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
   <>
   {loading?<Loader/> :
   <>
    <div className="flex justify-center items-center h-screen">
      <form 
      onSubmit={handleSubmit}
      className="max-w-md w-full p-6  bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md"
            />
          </div>{" "}
        </div>
        <div className="mt-8 flex justify-between  font-semibold text-sm">
          <label className="flex justify-center items-center text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1 rounded-sm" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <Link to="/password/forgot"
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full mt-2  bg-blue-500 text-white py-2 rounded-md"
        >
          Login
        </button>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 hover:underline hover:underline-offset-4"
          >
            Register
          </Link>
        </div>
        <hr className="my-4 border-t" />
        <div className="flex justify-center gap-2">
          <FaGoogle className="text-2xl text-red-600 cursor-pointer" />
          <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
          <FaTwitter className="text-2xl text-blue-500 cursor-pointer" />
        </div>
      </form>
    </div>
   </>}
   </>
  );
};

export default Login;
