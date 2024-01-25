import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "../types";

const register = createAsyncThunk(
  "user/register",
  async (userData: UserInfo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        `http://localhost:3001/register`,
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default register;
