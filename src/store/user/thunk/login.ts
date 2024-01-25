import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        `http://localhost:3001/login`,
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default login;
