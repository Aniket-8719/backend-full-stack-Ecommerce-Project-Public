import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { Link, useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../Layouts/Loader";
import { toast } from "react-toastify";
import AdminDropdown from "./AdminDropdown";
import { FaSpinner } from "react-icons/fa";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrDeleteOrders
  );

  const updateOrderSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  }; 
  const [status, setStatus] = useState("");
 
  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (updateError) {
        toast.error(updateError);
        dispatch(clearErrors());
      } 
      if (isUpdated) {
        toast.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }
  
      dispatch(getOrderDetails(id));
    }, [dispatch, toast, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ORDER STATUS UPDATE -- ADMIN" />
          <div className="flex justify-center">
            <AdminDropdown />
          </div>
          <div className="md:ml-96  mx-8 ml-8 md:mx-0  max-w-[1180px] mt-16 mb-16">
            <div className="bg-white p-8 w-full">
              <div className="pb-0">
                <h1 className="font-light text-3xl text-red-500 my-16">
                  Order #{order && order._id}
                </h1>
                <div className="flex flex-col md:flex md:flex-row justify-left gap-2 md:gap-32">
                  <div className="">
                    <h2 className="font-normal text-xl uppercase">
                      Shipping Info
                    </h2>
                    <div className="my-8">
                      <div className="flex my-4">
                        <p className="font-normal text-base">Name:</p>
                        <span className="ml-4 font-light text-base text-gray-600">
                          {order && order.user && order.user.name}
                        </span>
                      </div>
                      <div className="flex my-4">
                        <p className="font-normal text-base">Phone:</p>
                        <span className="ml-4 font-light text-base text-gray-600">
                          {order && order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className="flex my-4">
                        <p className="font-normal text-base">Address:</p>
                        <span className="ml-4 font-light text-base text-gray-600">
                          {order && order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ok-2">
                    <h2 className="font-normal text-xl uppercase">Payment</h2>
                    <div className="my-8">
                      <div className="flex my-4">
                        <p
                          className={`${
                           order &&  order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          { order && order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div className="flex my-4">
                        <p className="font-normal text-base">Amount:</p>
                        <span className="ml-4 font-light text-base text-gray-600">
                          {order && order.totalPrice && order.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="font-normal text-xl uppercase">Order Status</h2>
                <div className="my-8 flex gap-8 items-center">

                  <div className="flex jus my-4">
                    <p
                      className={`${
                        order && order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-500"
                        : order.orderStatus === "Processing"
                        ? "text-yellow-500"
                        : order.orderStatus === "Shipped"
                        ? "text-blue-500"
                        : "text-red-500"
                      }`}
                    >
                      {order && order.orderStatus && order.orderStatus}
                    </p>
                  </div>

                  <div
      className={order && order.orderStatus === "Delivered" || order && order.orderStatus === "Cancelled" ? "hidden" : "block"}
    >
            <select
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full mt-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <option value="">Choose Category</option>
        {order && order.orderStatus === "Processing" && (
          <>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </>
        )}
        {order && order.orderStatus === "Shipped" && (
          <>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </>
        )}
      </select>
      <button
        type="submit"
        disabled={loading}
        onClick={()=>updateOrderSubmitHandler()}
        className="w-full mt-2 bg-indigo-500 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600 flex items-center justify-center disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-2" />
            Processing...
          </div>
        ) : (
          "Update Status"
        )}
      </button>
    </div>

                </div>
              </div>
              <div className="border-t border-gray-300">
                <h2 className="font-normal text-xl my-8 uppercase">
                  Order Items:
                </h2>
                <div className="my-8">
                  {order && order.orderItems &&
                    order.orderItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center my-8"
                      >
                        <img src={item.image} alt="Product" className="w-12" />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-gray-600 mx-8 w-3/5"
                        >
                          {item.name}
                        </Link>
                        <span className="font-light text-base text-gray-600">
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div> 
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProcessOrder;
