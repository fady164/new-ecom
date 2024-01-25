import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState.ts";
import login from "./thunk/login.ts";
import register from "./thunk/register.ts";
import updateUserData from "./thunk/updateUserData.ts";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.accessToken;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload as string;
    });
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.accessToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload as string;
    });
    // updateUserData
    builder.addCase(updateUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = { ...state.userInfo, ...action.payload };
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export { login, register, updateUserData };
export const { logout } = userSlice.actions;

export default userSlice.reducer;
