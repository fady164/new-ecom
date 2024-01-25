import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (
    formData: {
      username: string | undefined;
      email: string | undefined;
      password: string | undefined;
    },
    thunkAPI
  ) => {
    const { rejectWithValue, getState } = thunkAPI;
    const {
      auth: {
        userInfo: { id },
      },
    } = getState() as RootState;
    try {
      await axios.put(`http://localhost:3001/users/${id}`, formData);
      return formData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default updateUserData;
