import PropTypes from 'prop-types';
import axios from 'axios';
const axiosInstance = axios.create({
  // Your Axios instance configuration here
  validateStatus: function (status) {
    return status !== 400; // Do not treat 400 as an error
  },
});

const API_URL = process.env.REACT_APP_API_URL + '/api/v1/auth'; // Replace with your API base URL
// Function to make a login API request
export const login = async (userName, password, rememberMeValue) => {
  const data = {
    username: userName,
    password: password,
    isRememberMe: rememberMeValue,
  };
  try {
    const response = axiosInstance.post(`${API_URL}/login`, data);
    return response;
  } catch (e) {
    //Handle Error Code//
  }
};

// Function to make a registration API request
export const register = async (
  userName,
  email,
  firstName,
  lastName,
  password,
  internationalDialNumber,
  phoneNumber,
) => {
  const data = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
    phoneNumber: phoneNumber,
    internationalDialNumber: internationalDialNumber,
    email: email,
    password: password,
  };
  const response = axiosInstance.post(`${API_URL}/register`, data);
  return response;
};

// Function to make a registration API request
export const IsNotExpiredAccessToken = async (tokenValue) => {
  const data = { token: tokenValue };
  const response = axiosInstance.post(`${API_URL}/isTokenExpired`, data);
  return response;
};
IsNotExpiredAccessToken.propTypes = {
  tokenValue: PropTypes.string.isRequired,
};
login.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  rememberMeValue: PropTypes.bool.isRequired,
};
register.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  internationalDialNumber: PropTypes.number.isRequired,
  phoneNumber: PropTypes.number.isRequired,
};
