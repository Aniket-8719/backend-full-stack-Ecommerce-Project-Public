import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import Navbar from "./Components/Layouts/Navbar";
import Footer from "./Components/Layouts/Footer";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Drop from "./Users/Drop";
import Login from "./Users/Login"; 
import Register from "./Users/Register";
import ProfilePage from "./Users/ProfilePage";
import PrivateRoute from "./Components/Route/PrivateRoute";
import UpdateProfile from "./Users/UpdateProfile";
import UpdatePassword from "./Users/UpdatePassword";
import ForgotPassword from "./Users/ForgotPassword";
import ResetPassword from "./Users/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrders from "./Components/Orders/MyOrders";
import OrderDetails from "./Components/Orders/OrderDetails";
import NotFound from "./Components/Not Found/NotFound";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import EditProduct from "./Components/Admin/EditProduct";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UserList from "./Components/Admin/UserList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
 

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const config = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY, // API key header
    }, 
    withCredentials: true, // Ensure cookies are sent with the request
  };
  
  // Backend URL
  const API_URL = process.env.REACT_APP_BACKEND_URL;  
  
  async function getStripeApiKey() { 
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/stripeapikey`, config);
  
      // Assuming setStripeApiKey is a state setter or function to use the API key
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to fetch Stripe API key:", error);
      // Handle error (e.g., set an error state or notify the user)
    }
  }
  useEffect(() => {
    dispatch(loadUser()); 
    getStripeApiKey();
  }, [dispatch]);

  window.addEventListener("contextmenu", (e)=> e.preventDefault());
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/product/:id" element={<PrivateRoute Component={ProductDetails} />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/profile" element={<PrivateRoute Component={ProfilePage} />} />
        <Route exact path="/update" element={<PrivateRoute Component={UpdateProfile} />} />
        <Route exact path="/password/update" element={<PrivateRoute Component={UpdatePassword} />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/shipping" element={<PrivateRoute Component={Shipping} />} />
        <Route exact path="/order/confirm" element={<PrivateRoute Component={ConfirmOrder} />} />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PrivateRoute Component={Payment} />
              </Elements>
            }
          />
        )}
        <Route exact path="/success" element={<PrivateRoute Component={OrderSuccess} />} />
        <Route exact path="/orders" element={<PrivateRoute Component={MyOrders} />} />
        <Route exact path="/order/:id" element={<PrivateRoute Component={OrderDetails} />} />
        <Route exact path="/admin/dashboard" element={<PrivateRoute isAdmin={true} Component={Dashboard} />} />
        <Route exact path="/admin/products" element={<PrivateRoute isAdmin={true} Component={ProductList} />} />
        <Route exact path="/admin/product/create" element={<PrivateRoute isAdmin={true} Component={NewProduct} />} />
        <Route exact path="/admin/product/:id" element={<PrivateRoute isAdmin={true} Component={EditProduct} />} />
        <Route exact path="/admin/orders" element={<PrivateRoute isAdmin={true} Component={OrderList} />} />
        <Route exact path="/admin/order/:id" element={<PrivateRoute isAdmin={true} Component={ProcessOrder} />} />
        <Route exact path="/admin/users" element={<PrivateRoute isAdmin={true} Component={UserList} />} />
        <Route exact path="/admin/user/:id" element={<PrivateRoute isAdmin={true} Component={UpdateUser} />} />
        <Route exact path="/admin/reviews" element={<PrivateRoute isAdmin={true} Component={ProductReviews} />} />
        <Route exact path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
