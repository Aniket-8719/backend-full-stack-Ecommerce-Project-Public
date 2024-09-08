import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateProfile, loadUser } from "../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Components/Layouts/Loader";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: null,
      });
      setAvatarPreview(user.avatar?.url || "/Profile.png");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(loadUser());
      navigate("/profile");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, avatar } = formData;
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", name);
    formDataToSubmit.append("email", email);
    if (avatar) formDataToSubmit.append("avatar", avatar);

    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(key, value); // Debugging
    }

    dispatch(updateProfile(formDataToSubmit));
  };

  const updateDataChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <Loader />
      ) : (
        <form
          className="max-w-md w-full p-6 bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
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
            <label htmlFor="avatar" className="block mb-1">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              //   accept="image/*"
              onChange={updateDataChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="mt-2 h-16 w-16 rounded-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
