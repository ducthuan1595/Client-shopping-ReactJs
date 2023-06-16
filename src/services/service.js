import axios from "axios";
import { axiosJWT } from "./axios";
import { getCookie } from "../store/userSlice";
// require('dotenv').config()
// console.log(process.env)

export const url = process.env.REACT_APP_API_URL;

export const request = {
  login: (value) => {
    return axios.post(
      `${url}/login`,
      { ...value },
      {
        withCredentials: true,
        credentials: "include",
        validateStatus: function (status) {
          return status < 500;
        }
      }
    );
  },
  logout: () => {
    return axios.post(`${url}/logout`,{},{
        withCredentials: true,
        credentials: "include",
      }
    );
  },
  signup: (value) => {
    return axios.post(`${url}/signup`, { ...value },{
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  refreshToken: () => {
    return axios.get(`${url}/refresh-token`, {
      withCredentials: true,
      // credentials: "include",
    });
  },

  getProducts: () => {
    return axios.get(`${url}/get-all-product`);
  },

  getCarts: (userId, config) => {
    return axiosJWT.get(`${url}/get-cart/${userId}`, config);
  },
  addCart: (userId, productId, quantity) => {
    return axiosJWT.post(`${url}/add-cart`, { userId, productId, quantity }, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      },
      withCredentials: true,
    });
  },
  deleteCart: (userId, productId) => {
    return axiosJWT.delete(`${url}/delete-cart/${productId}?userId=${userId}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getDetailProduct: (productId) => {
    return axios.get(`${url}/get-edit-product/${productId}`);
  },

  postOrder: (value) => {
    return axiosJWT.post(`${url}/post-order`, { ...value }, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getOrderWithUser: (userId, page) => {
    return axiosJWT.get(`${url}/get-order/${userId}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getDetailOrderByUser: (userId, orderId) => {
    return axiosJWT.get(
      `${url}/get-detail-order-by-user/${orderId}?userId=${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${getCookie()}`
        }
      }
    );
  },

  getMessages: (roomId) => {
    return axios.get(`${url}/get-message/${roomId}`)
  },
  createRoom: (userId) => {
    return axios.post(`${url}/create-room`, userId)
  },
  sendMessage: (value) => {
    return axios.post(`${url}/send-message`, value)
  },
  deleteRoom: (roomId) => {
    return axios.delete(`${url}/delete-room/${roomId}`)
  },
};
