import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import AdminDropdown from "./AdminDropdown";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();
  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, toast, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <div className="flex justify-center">
        <AdminDropdown />
        <div className="mt-28 md:ml-60 w-full">
          <div className="w-full flex flex-col items-center bg-gray-200 p-8 h-screen">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-2xl font-bold text-center mb-6">
                Update User
              </h1>

              <div className="mb-4 flex items-center relative z-10">
                <FaUserLarge className="absolute left-3 text-gray-600 " />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4 flex items-center relative z-10">
                <MdEmail className="absolute left-3 text-gray-600 " />
                <input
                  type="email"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <select
                onChange={(e) => setRole(e.target.value)}
                className="mb-8 shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Choose Role</option>
                {user && user.role === "admin" && (
                  <>
                    <option value="user">User</option>
                  </>
                )}
                {user && user.role === "user" && (
                  <>
                    <option value="admin">Admin</option>
                  </>
                )}
              </select>

              <button
                type="submit"
                disabled={loading ? true : false}
                className="w-full bg-indigo-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-500 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Update User"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
