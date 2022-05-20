import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrCreateItemCart = createAsyncThunk(
  "ADD_OR_CREATE_ITEMCART",
  (data, thunkAPI) => {
    const { shoppingCart } = thunkAPI.getState();
    if (shoppingCart.id) {
      return axios
        .post(`https://the-green-shop.herokuapp.com/api/itemCart`, data)
        .then(() => {
          return axios
            .get(
              `https://the-green-shop.herokuapp.com/api/itemCart/${shoppingCart.id}`
            )
            .then((res) => {
              const items = res.data;
              const total = parseFloat(
                items
                  .map(({ quantity, product }) => quantity * product.price)
                  .reduce((total, i) => total + i, 0)
              );
              return axios
                .put(
                  `https://the-green-shop.herokuapp.com/api/shoppingCart/total`,
                  { id: shoppingCart.id, total }
                )
                .then(() => {
                  return res.data;
                });
            });
        });
    }
  }
);
export const deleteItemCart = createAsyncThunk(
  "REMOVE_ITEMCART",
  (id, thunkAPI) => {
    const { shoppingCart } = thunkAPI.getState();
    if (shoppingCart.id) {
      return axios
        .delete(
          `https://the-green-shop.herokuapp.com/api/itemCart/remove/${id}`
        )
        .then(() => {
          return axios
            .get(
              `https://the-green-shop.herokuapp.com/api/itemCart/${shoppingCart.id}`
            )
            .then((res) => {
              const items = res.data;
              const total = parseInt(
                items
                  .map(({ quantity, product }) => quantity * product.price)
                  .reduce((total, i) => total + i, 0)
              );
              return axios
                .put(
                  `https://the-green-shop.herokuapp.com/api/shoppingCart/total`,
                  { id: shoppingCart.id, total }
                )
                .then(() => res.data);
            });
        });
    }
  }
);

export const getItemCart = createAsyncThunk(
  "GET_ITEMCARTS",
  (shoppingCartId, thunkAPI) => {
    // const { shoppingCart } = thunkAPI.getState();
    if (shoppingCartId) {
      return axios
        .get(
          `https://the-green-shop.herokuapp.com/api/itemCart/${shoppingCartId}`
        )
        .then(({ data }) => {
          // if(!data.length) return null
          return data;
        });
    }
  }
);

export const resetItemCarts = createAsyncThunk("RESET_ITEMCARTS", () => {
  return [];
});

const itemCartReducer = createReducer([], {
  [addOrCreateItemCart.fulfilled]: (state, action) => action.payload,
  [getItemCart.fulfilled]: (state, action) => {
    return action.payload;
  },
  [deleteItemCart.fulfilled]: (state, action) => action.payload,
  [resetItemCarts.fulfilled]: (state, action) => action.payload,
});

export default itemCartReducer;
