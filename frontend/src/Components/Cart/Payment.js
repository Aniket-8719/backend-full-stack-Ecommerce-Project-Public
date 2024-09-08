import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Backend URL
const API_URL = process.env.REACT_APP_BACKEND_URL;  

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-api-key':process.env.REACT_APP_API_KEY,
        },
        withCredentials: true, // Ensure cookies are sent with the request
      };
      const { data } = await axios.post(
        `${API_URL}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="grid place-items-center bg-white min-h-[65vh] mx-8 my-4">
        <form className="w-full max-w-md" onSubmit={(e) => submitHandler(e)}>
          <p className="mb-8">Just Use an Indian Stripe test card India (IN) 4000003560000008 Visa</p>
          <h2 className="text-center text-xl font-semibold mb-4">Card Info</h2>
          <div className="mb-4 relative">
            <div className="absolute top-2 left-2 text-gray-600">
              <i className="fas fa-credit-card"></i>
            </div>
            <CardNumberElement className="paymentInput pl-8" />
          </div>
          <div className="mb-4 relative">
            <div className="absolute top-2 left-2 text-gray-600">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <CardExpiryElement className="paymentInput pl-8" />
          </div>
          <div className="mb-4 relative">
            <div className="absolute top-2 left-2 text-gray-600">
              <i className="fas fa-key"></i>
            </div>
            <CardCvcElement className="paymentInput pl-8" />
          </div>

          <button
            type="submit"
            ref={payBtn}
            className="w-full py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300"
          >
            Pay - ₹{orderInfo && orderInfo.totalPrice}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
