import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Components/Layouts/Loader";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevFormData) => ({ 
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", name);
    formDataToSubmit.append("email", email);
    formDataToSubmit.append("password", password);
    if (avatar) formDataToSubmit.append("avatar", avatar);

    dispatch(register(formDataToSubmit)); // Correct action call
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => { 
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(isAuthenticated){
      toast.success("Register Succesfully");
      navigate("/profile");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  return (
    <div className="flex mt-16 justify-center items-center h-screen">
    {loading ? (
      <Loader />
    ) : (
      <form
        className="max-w-md w-full p-6 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-1">
            Avatar
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={registerDataChange}
            className="w-full px-3 py-2 border rounded-md"
          />
           <img src={avatarPreview} alt="Avatar Preview" className="mt-2 h-16 w-16 rounded-full" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Register
        </button>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 hover:underline hover:underline-offset-4"
          >
            Login
          </Link>
        </div>

        <hr className="my-4 border-t" />
        <div className="flex justify-center gap-2">
          <FaGoogle className="text-2xl text-red-600 cursor-pointer" />
          <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
          <FaTwitter className="text-2xl text-blue-500 cursor-pointer" />
        </div>
      </form>
    )}
  </div>
  );
};

export default Register;
