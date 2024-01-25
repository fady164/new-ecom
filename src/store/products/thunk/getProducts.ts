import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(
        `http://localhost:3001/items?cat_prefix=${prefix}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default getProducts;
