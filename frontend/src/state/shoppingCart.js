import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToShoppingCart = createAsyncThunk(
  "ADD_TO_CART",
  (data, thunkAPI) => {
    const { user } = thunkAPI.getState();
    return axios.post(`https://the-green-shop.herokuapp.com/api/add/objectId=${data.id}`, data).then((res) => res);
  }
);

export const removeFromShoppingCart = createAsyncThunk(
  "REMOVE_FROM_CART",
  (data, thunkAPI) => {
    const { user } = thunkAPI.getState();
    return axios
      .delete(`https://the-green-shop.herokuapp.com/api/remove/objectId=${data.id}`, data)
      .then((res) => res.data);
  }
);

export const getShoppingCart = createAsyncThunk(
  "GET_SHOPPINGCART",
  (data, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (user.id) {
      return axios.get(`https://the-green-shop.herokuapp.com/api/shoppingCart/${user.id}`).then((res) => res.data);
    }
  }
);

export const resetShoppingCart = createAsyncThunk("RESET_SHOPPINGCART", () => {
  return {};
});

const shoppingCartReducer = createReducer(
  {},
  {
    [addToShoppingCart.fulfilled]: (state, action) => action.payload,
    [removeFromShoppingCart.fulfilled]: (state, action) => action.payload,
    [getShoppingCart.fulfilled]: (state, action) => action.payload,
    [resetShoppingCart.fulfilled] : (state, action) => action.payload,
  }
);

export default shoppingCartReducer;
