import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
// import Cookies from "js-cookie";

const cookies = new Cookies();
const userCrr = cookies.get('currUser');

export function getCookie() {
  return document.cookie.split("access-token=")[1];
};

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    onLogin: userCrr && userCrr !== 'undefined' ? true : false,
    currUser: userCrr,
    accessToken: getCookie(),
  },
  reducers: {
    login: (state, payload) => {
      state.onLogin = true;
      state.currUser = payload.payload
    },
    logout: (state) => {
      state.onLogin = false;
      state.currUser = null;
    },
    getToken: (state, payload) => {
      state.accessToken = payload.payload;
    }
  }
});

const { reducer, actions } = userSlice;
export const { login, logout, getToken } = userSlice.actions;

export default reducer;