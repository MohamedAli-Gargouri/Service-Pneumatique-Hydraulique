import PropTypes from 'prop-types';

import axios from 'axios';
const axiosInstance = axios.create({
  // Your Axios instance configuration here
  validateStatus: function (status) {
    return status !== 400; // Do not treat 400 as an error
  },
});

const API_URL_GETALLORDERS =
  process.env.REACT_APP_API_URL + '/api/v1/Order/all?size=0&page=0&getAll=true';
export const getAllOrders = async (accessToken) => {
  try {
    const data = {};
    const response = axiosInstance.get(`${API_URL_GETALLORDERS}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_RESUMEORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/resume';
export const resumeOrder = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_RESUMEORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_CANCEL_ORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/cancel';
export const cancelOrder = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_CANCEL_ORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_SETDELIVERED_ORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/setDelivered';
export const markOrderDelivered = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_SETDELIVERED_ORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_PAUSE_ORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/pause';
export const pauseOrder = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_PAUSE_ORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_MARKPAID_ORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/markPaid';
export const markOrderPaid = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_MARKPAID_ORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

const API_URL_MARKREADY_ORDER =
  process.env.REACT_APP_API_URL + '/api/v1/Order/setReady';
export const markOrderReady = async (orderId, accessToken) => {
  try {
    const data = {
      orderId: orderId,
    };
    const response = axiosInstance.put(`${API_URL_MARKREADY_ORDER}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};
getAllOrders.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
