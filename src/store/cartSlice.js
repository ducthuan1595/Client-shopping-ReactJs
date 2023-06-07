import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
    totalAmount: 0,
  },
  reducers: {
    getCarts: (state, action) => {
      state.listCart = action.payload;
      state.totalAmount = action.payload
        .map((item) => +item.quantity * +item.productId.price)
        .reduce((init, curr) => {
          return init + curr;
        }, 0);
    },
    // addCart: (state, action) => {
    //   // calculation total mount item
    //   state.totalAmount = state.totalAmount + action.payload.price * action.payload.amount;
    //   // find index exiting item
    //   const exitingItemIndex = state.listCart.findIndex((item)=> item._id.$oid === action.payload._id.$oid);
    //   const existingItem = state.listCart[exitingItemIndex];

    //   // when add item has exiting in listCart
    //   if(existingItem) {
    //     const updateItem = {
    //       ...existingItem,
    //       amount: existingItem.amount + action.payload.amount,
    //     };
    //     state.listCart[exitingItemIndex] = updateItem;

    //   }else {
    //     state.listCart.push(action.payload);
    //   }
    //   // add item local Storage
    //   localStorage.setItem('items', JSON.stringify(state.listCart));
    //   localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));

    // },
    // deleteCart: (state, action) => {

    //   state.totalAmount = state.totalAmount - (action.payload.price * action.payload.amount);

    //   state.listCart = state.listCart.filter(item => item._id.$oid !== action.payload._id.$oid);

    //   localStorage.setItem('items', JSON.stringify(state.listCart));
    //   localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    // },
    // updateCart: (state, action) => {

    //   const exitingItemIndex = state.listCart.findIndex((item)=> item._id.$oid === action.payload._id.$oid);
    //   const exitingItem = state.listCart[exitingItemIndex];

    //   // calculation total amount
    //   // when decrease amount product
    //   if(exitingItem.amount < action.payload.amount) {
    //     state.totalAmount = +state.totalAmount + +action.payload.price;
    //   }
    //   // when increase amount product
    //   if(exitingItem.amount > action.payload.amount) {
    //     state.totalAmount = +state.totalAmount - +action.payload.price;
    //   }

    //   // update product
    //   const updateItem = {...exitingItem, amount: action.payload.amount}
    //   state.listCart[exitingItemIndex] = updateItem;

    //   localStorage.setItem('items', JSON.stringify(state.listCart));
    //   localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));

    // }
  },
});

const { reducer, actions } = cartSlice;
export const { totalAmount, getCarts } = cartSlice.actions;

export default reducer;
