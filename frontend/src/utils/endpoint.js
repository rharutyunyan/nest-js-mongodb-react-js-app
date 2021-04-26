import { config } from '../configs';

export const authenticationEndpoint = () => {
  return `${config.APP_API_ENDPOINT}/api/authenticate`;
};

export const registerEndpoint = () => {
  return `${config.APP_API_ENDPOINT}/api/register`;
};

export const getUsersEndpoint = (id = null) => {
  return id ? `${config.APP_API_ENDPOINT}/api/users/${id}` : `${config.APP_API_ENDPOINT}/api/users`;
};

export const getReviewsEndpoint = (id = null) => {
  return id
    ? `${config.APP_API_ENDPOINT}/api/reviews/${id}`
    : `${config.APP_API_ENDPOINT}/api/reviews`;
};
