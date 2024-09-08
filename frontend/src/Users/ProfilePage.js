import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Layouts/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (!user) {
    return null; 
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <div className="max-w-[1400px] mx-8 flex flex-col gap-4 mt-28">
          <h1
            className="w-full text-4xl text-slate-900
        sm:text-5xl 
        lg:text-5xl  
        font-semibold mb-8"
          >
            My Profile
          </h1>
           <div className="flex flex-col md:flex-row gap-8 md:gap-0  ">

           <div className="flex flex-col w-full gap-4 justify-center items-center ">
              <div className="max-w-[300px] max-h-[350px] overflow-hidden rounded-lg">
                {user && user.avatar && (
                  <img
                    className="w-full h-full object-cover rounded-lg  border-slate-300 border-2"
                    src={user.avatar.url}
                    alt="User Avatar"
                  />
                )}
              </div>
              <div className="flex justify-center max-w-[400px] text-white text-sm w-full">
              <Link to="/update" className="w-full py-2 px-6 text-center bg-orange-500 rounded-sm">Edit Profile</Link>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 items-start w-full ">
              <div>
              <label className="text-xl font-semibold  text-black">Full Name</label>
              <p className="mt-2">{user.name}</p>
              </div>
              <div>
              <label className="text-xl font-semibold  text-black">Email</label>
              <p className="mt-2">{user.email}</p>
              </div>
              <div>
              <label className="text-xl font-semibold   text-black">Joining On</label>
              <p className="mt-2">{String(user.createdAt).substr(0, 10)}</p>
              <p className="mt-2 mb-2 text-xl text-green-500">{user.role}</p>
              </div>
              <div className="flex flex-col w-full text-white text-sm items-center justify-center gap-2">
              <Link to={"/orders"} className="w-full text-center py-2 px-6 bg-slate-700 rounded-sm">My Orders</Link>
              <Link to="/password/update" className="w-full text-center py-2 px-6 bg-slate-700 rounded-sm">Change password</Link>
              </div>
            </div>
           </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
