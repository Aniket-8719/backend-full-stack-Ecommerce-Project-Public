import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = ({ history }) => {
    const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 p-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <p className="w-1/3 font-medium">Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="flex items-center mb-4">
                <p className="w-1/3 font-medium">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex items-center mb-4">
                <p className="w-1/3 font-medium">Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Cart Items:</h2>
            <div className="max-h-80 overflow-y-auto">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between mb-4">
                    <img src={item.image} alt="Product" className="w-16 h-16" />
                    <Link to={`/product/${item.product}`} className="w-1/2 text-blue-600 hover:underline">
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="p-8 border-t md:border-t-0 md:border-l border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center">Order Summary</h2>
          <div>
            <div className="flex justify-between mb-4">
              <p className="font-medium">Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
              <p className="font-medium">Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div className="flex justify-between mb-4">
              <p className="font-medium">GST:</p>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-4 mt-4">
              <p className="font-semibold">Total:</p>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={proceedToPayment}
            className="w-full mt-4 py-2 bg-indigo-600  text-white font-semibold hover:bg-indigo-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
