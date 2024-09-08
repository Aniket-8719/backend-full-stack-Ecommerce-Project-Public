import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Backend URL
const API_URL = process.env.REACT_APP_BACKEND_URL;  

// Configure API key and credentials
const apikeyConfig = {
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY, // Access API key from environment variables
  },
  withCredentials: true, // Ensure cookies are sent with the request
};

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/v1/product/${id}`, apikeyConfig);
    
    dispatch({
      type: ADD_TO_CART, 
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    // Handle error (e.g., dispatch an error action)
  }
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
