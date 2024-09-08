import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Layouts/Loader";
import { toast } from "react-toastify";

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]);

    if (loading) return <Loader />;

    // Ensure order is defined before rendering
    if (!order) return <p>No order details available</p>;

    return (
        <Fragment>
            <MetaData title="Order Details" />
            <div className="bg-white p-8">
                <div className="pb-0">
                    <h1 className="font-light text-3xl text-red-500 my-16">
                        Order #{order._id}
                    </h1>
                    <div className="flex flex-col md:flex md:flex-row justify-left gap-2 md:gap-32">
                        <div className="">
                            <h2 className="font-normal text-xl uppercase">Shipping Info</h2>
                            <div className="my-8">
                                <div className="flex my-4">
                                    <p className="font-normal text-base">Name:</p>
                                    <span className="ml-4 font-light text-base text-gray-600">
                                        {order.user?.name || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex my-4">
                                    <p className="font-normal text-base">Phone:</p>
                                    <span className="ml-4 font-light text-base text-gray-600">
                                        {order.shippingInfo?.phoneNo || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex my-4">
                                    <p className="font-normal text-base">Address:</p>
                                    <span className="ml-4 font-light text-base text-gray-600">
                                        {order.shippingInfo &&
                                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="ok-2">
                            <h2 className="font-normal text-xl uppercase">Payment</h2>
                            <div className="my-8">
                                <div className="flex my-4">
                                    <p className={`${
                                        order.paymentInfo?.status === "succeeded"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}>
                                        {order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
                                    </p>
                                </div>
                                <div className="flex my-4">
                                    <p className="font-normal text-base">Amount:</p>
                                    <span className="ml-4 font-light text-base text-gray-600">
                                        {order.totalPrice || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="font-normal text-xl uppercase">Order Status</h2>
                    <div className="my-8">
                        <div className="flex my-4">
                            <p className={`${
                                order.orderStatus === "Delivered"
                                    ? "text-green-500"
                                    : order.orderStatus === "Processing"
                                    ? "text-yellow-500"
                                    : order.orderStatus === "Shipped"
                                    ? "text-blue-500"
                                    : "text-red-500"
                            }`}>
                                {order.orderStatus || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300">
                    <h2 className="font-normal text-xl my-8 uppercase">Order Items:</h2>
                    <div className="my-8">
                        {order.orderItems?.map((item) => (
                            <div key={item.product} className="flex items-center my-8">
                                <img src={item.image} alt="Product" className="w-12" />
                                <Link to={`/product/${item.product}`} className="text-gray-600 mx-8 w-3/5">
                                    {item.name}
                                </Link>
                                <span className="font-light text-base text-gray-600">
                                    {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                </span>
                            </div>
                        )) || 'No items found'}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderDetails;
