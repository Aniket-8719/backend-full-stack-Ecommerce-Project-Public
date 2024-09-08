import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";


// Set API key in headers from environment variables
const apikeyConfig = {
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY,  // Access API key from environment variables
  },
};

const API_URL =  process.env.REACT_APP_BACKEND_URL;  // Your backend URL 

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };
    
    const { data } = await axios.post(`${API_URL}/api/v1/login`, { email, password }, config);
    
    localStorage.setItem("auth", data.token);  // Store token in localStorage (if necessary)
    
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("auth");
    if (!token) {
      dispatch({ type: LOAD_USER_FAIL, payload: "No token found" });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.get(`${API_URL}/api/v1/me`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};


// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.post(`${API_URL}/api/v1/register`, userData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    await axios.get(`${API_URL}/api/v1/logout`, config);
    localStorage.removeItem("auth");
    sessionStorage.removeItem('adminAccessToastShown');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response?.data?.message || 'An error occurred' });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.put(`${API_URL}/api/v1/me/update`, userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.put(`${API_URL}/api/v1/password/update`, passwords, config);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.post(`${API_URL}/api/v1/password/forgot`, email, config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.put(`${API_URL}/api/v1/password/reset/${token}`, passwords, config);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.get(`${API_URL}/api/v1/admin/users`, config);
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Get User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.get(`${API_URL}/api/v1/admin/user/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.put(`${API_URL}/api/v1/admin/user/${id}`, userData, config);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        ...apikeyConfig.headers,  // Combine headers with API key
      },
      withCredentials: true,  // Send cookies with the request
    };

    const { data } = await axios.delete(`${API_URL}/api/v1/admin/user/${id}`, config);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message || 'An error occurred',
    });
  }
};

// Clear Errors
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
