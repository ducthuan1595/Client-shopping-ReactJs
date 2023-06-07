import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'products',
  initialState: {
    showPopup: false,
    product: {},
    products: [],
    detailProduct: null,
  },
  reducers: {
    showPopup: (state) => {
      state.showPopup = true;
    },
    closePopup: (state) => {
      state.showPopup = false;
    },
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    getAllProduct: (state, action) => {
      state.products = action.payload;
    },
    detailProduct: (state, action) => {
      state.detailProduct = action.payload;
    }
  }
});

const { reducer, actions } = popupSlice
export const {showPopup, closePopup, getProduct, getAllProduct, detailProduct} = popupSlice.actions;
export default reducer;


