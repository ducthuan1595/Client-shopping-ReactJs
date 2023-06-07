import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { request } from './service';
import Cookies from 'universal-cookie';
import store from '../store/store';
import { getToken } from '../store/userSlice';
import { getCookie } from '../store/userSlice';
// import Cookies from 'js-cookie';

export const axiosJWT = axios.create();
const cookies = new Cookies();
// const user = cookies.get('currUser');
// const token = store.getState().auth.accessToken;

const refreshToken = async() => {
  try{
    const res = await request.refreshToken();
    return res.data;
  }catch(err) {
    console.log(err);
  }
}
 
axiosJWT.interceptors.request.use(
  async(config) => {
    let date = new Date();
    // console.log(document.cookie);
    const accessToken = await getCookie();
    console.log(accessToken);
    const decodeToken = jwt_decode(accessToken);
    if(decodeToken.exp * 1000 < date.getTime()) {
      const data = await refreshToken();
      console.log(data.token);

      store.dispatch(getToken(data.token));
      cookies.set('access-token', data.token);
      config.headers['authorization'] = `Bearer ${data.token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  }
)

