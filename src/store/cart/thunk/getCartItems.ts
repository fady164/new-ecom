import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router";
import getCartItemsIds from "../../../hooks/getCartItemsIds";
import { RootState } from "./../../store";

const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    const cartItemsIds = getCartItemsIds(state.cart.cartItemData);
    try {
      const { data } = await axios.get(
        `http://localhost:3001/items?${cartItemsIds}`
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError<ErrorResponse>).message);
    }
  }
);

export default getCartItems;
