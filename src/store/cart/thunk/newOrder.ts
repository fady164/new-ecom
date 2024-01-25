import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router";
import { ProductType } from "../../../components/ecom-ui/Product/ProductCard";
import { RootState } from "../../store";

export type orderWithQuantity = { product: ProductType; quantity: number };
const newOrder = createAsyncThunk(
  "cart/newOrder",
  async (orders: orderWithQuantity[], thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    const userId = state.auth.userInfo?.id!;

    const newUserOrder: {
      orders: { product: ProductType; quantity: number }[];
      userId: number;
    } = {
      orders,
      userId,
    };

    try {
      const { data } = await axios.post(
        `http://localhost:3001/orders`,
        newUserOrder
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError<ErrorResponse>).message);
    }
  }
);

export default newOrder;
