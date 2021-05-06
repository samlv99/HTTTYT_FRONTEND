import axios from 'axios';
import Cookies from 'js-cookie';

// import StorageKeys from '../constants/storage-keys';
import configs from '../config';
import commons from '../constants/common';
import { history } from '../index';

const axiosClient = axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const logout = () => {
  Cookies.remove(commons.TOKEN);
  Cookies.remove(commons.REFRESH_TOKEN);

  localStorage.removeItem(commons.MEMBER);
  history.push('/');
};

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { config, status, data } = error.response;

    // handle error message
    const URLS = ['/v1/auth/register', '/v1/auth/login'];
    if (URLS.includes(config.url) && status === 400) {
      throw new Error(data.message);
    }

    const originalConfig = error.config;
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      return logout();
    }

    return axios
      .post(`${configs.API_DOMAIN}/v1/auth/request-access-token`, {
        refreshToken,
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set('token', res.data?.data?.token);
          originalConfig.headers.Authorization = `Bearer ${res.data?.data?.token}`;
          return axios(originalConfig);
        } else {
          logout();
        }
      })
      .catch(logout);
  }
);

export default axiosClient;
