import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../Layouts/MetaData";
import { IoMdHome } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title="Shipping Details"/>
      <CheckoutSteps activeStep={0} />

      <div className="flex justify-center items-center min-h-screen -mt-8 bg-gray-100">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Shipping Details
          </h2>

          <form
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
            className="space-y-4"
          >
            <div className="flex items-center border-b border-gray-300  py-2">
              <IoMdHome className="text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full ml-3 py-2 outline-none border-none focus:border-none focus:ring-0"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <FaCity className="text-xl text-gray-500" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full ml-3 py-2 border-none outline-none focus:border-none focus:ring-0"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <MdLocationOn className="text-xl text-gray-500" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full ml-3 py-2 border-none outline-nonefocus:border-none focus:ring-0"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <FaPhoneAlt className="text-xl text-gray-500" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
                className="w-full ml-3 py-2 border-none outline-nonefocus:border-none focus:ring-0"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <BiWorld className="text-xl text-gray-500" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full ml-3 py-2 border-none outline-nonefocus:border-none focus:ring-0 bg-white"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="flex items-center border-b border-gray-300 py-2">
                <TbBuildingEstate className="text-xl text-gray-500" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full ml-3 py-2 border-none outline-nonefocus:border-none focus:ring-0 bg-white"
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              disabled={state ? false : true}
              className="w-full py-2 bg-indigo-600  text-white rounded-sm mt-4 cursor-pointer hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
