import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router";

const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get("http://localhost:3001/category");
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError<ErrorResponse>).message);
    }
  }
);

export default getCategories;
