import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Components/Layouts/Loader";


const ForgotPassword = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const allPasswordData = new FormData();

    allPasswordData.set("email", email);
    
    dispatch(forgotPassword(allPasswordData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }else{
        toast.success(message);
    }
    
  }, [dispatch, error, message]);
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full p-6  bg-white shadow-md rounded-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Forgot Password
            </h2>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md"
            />
          </div>
            </div>
            <button
              type="submit"
              className="w-full mt-2  bg-blue-500 text-white py-2 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      </>
    )}
  </>
  )
}

export default ForgotPassword
