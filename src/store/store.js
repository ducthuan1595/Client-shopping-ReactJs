import { configureStore } from "@reduxjs/toolkit";
import productReducer from './producterSlice';
import authUser from './userSlice';
import cartList from './cartSlice';

const rootReducer = {
  products: productReducer,
  auth: authUser,
  cart: cartList,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export default store;