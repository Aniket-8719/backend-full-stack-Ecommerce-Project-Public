import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Components/Layouts/Loader";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Password Reset successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);
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
                Reset Password
              </h2>
              <div className="mb-4">
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md"
                  />
                </div>{" "}
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md"
                  />
                </div>{" "}
              </div>
              <button
                type="submit"
                className="w-full mt-2  bg-blue-500 text-white py-2 rounded-md"
              >
                Update Password
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
