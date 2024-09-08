import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// Set API key in headers from environment variables
const apikeyConfig = {
  headers: {
      'x-api-key': process.env.REACT_APP_API_KEY, // Access API key from environment variables
  },
};

// Backend URL
const API_URL = process.env.REACT_APP_BACKEND_URL;  

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const config = {
          headers: {
              "Content-Type": "application/json",
              ...apikeyConfig.headers, // Combine headers with API key
          },
          withCredentials: true, // Ensure cookies are sent with the request
      };

      const { data } = await axios.post(`${API_URL}/api/v1/order/new`, order, config);

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: CREATE_ORDER_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
      dispatch({ type: MY_ORDERS_REQUEST });

      const { data } = await axios.get(`${API_URL}/api/v1/orders/me`, {
          ...apikeyConfig,
          withCredentials: true, // Ensure cookies are sent with the request
      });

      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
      dispatch({
          type: MY_ORDERS_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
      dispatch({ type: ALL_ORDERS_REQUEST });

      const { data } = await axios.get(`${API_URL}/api/v1/admin/orders`, {
          ...apikeyConfig,
          withCredentials: true, // Ensure cookies are sent with the request
      });

      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
      dispatch({
          type: ALL_ORDERS_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const config = {
          headers: {
              "Content-Type": "application/json",
              ...apikeyConfig.headers, // Combine headers with API key
          },
          withCredentials: true, // Ensure cookies are sent with the request
      };

      const { data } = await axios.put(
          `${API_URL}/api/v1/admin/order/${id}`,
          order,
          config
      );

      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
      dispatch({
          type: UPDATE_ORDER_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
      dispatch({ type: DELETE_ORDER_REQUEST });

      const { data } = await axios.delete(`${API_URL}/api/v1/admin/order/${id}`, {
          ...apikeyConfig,
          withCredentials: true, // Ensure cookies are sent with the request
      });

      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
      dispatch({
          type: DELETE_ORDER_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`${API_URL}/api/v1/order/${id}`, {
          ...apikeyConfig,
          withCredentials: true, // Ensure cookies are sent with the request
      });

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
      dispatch({
          type: ORDER_DETAILS_FAIL,
          payload: error.response?.data?.message || 'An error occurred',
      });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
