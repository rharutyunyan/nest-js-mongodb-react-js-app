import axios from 'axios';
import {
  authenticationEndpoint,
  registerEndpoint,
  getUsersEndpoint,
  getReviewsEndpoint,
} from '../utils';

let headers,
  multiPartHeaders = {};
const userData = localStorage.getItem('user');

if (userData) {
  const user = JSON.parse(userData);
  const { token } = user;
  headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  multiPartHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
}

export const authenticate = async (data) => {
  return axios.post(authenticationEndpoint(), data);
};

export const register = async (data) => {
  return axios.post(registerEndpoint(), data);
};

export const getUser = async (id) => {
  return axios.get(getUsersEndpoint(id), headers);
};

export const updateUser = async (id, data) => {
  return axios.put(getUsersEndpoint(id), data, headers);
};

export const uploadUserImage = async (id, data, passedHeaders = null) => {
  const uploadHeaders = passedHeaders || multiPartHeaders;
  return axios.post(`${getUsersEndpoint(id)}/image`, data, uploadHeaders);
};

export const createReview = async (data) => {
  return axios.post(getReviewsEndpoint(), data, headers);
};

export const getReview = async () => {
  const url = `${getReviewsEndpoint()}`;
  return axios.get(url, headers);
};
