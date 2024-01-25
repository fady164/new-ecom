import AuthSliceType from "./types";

const initialState: AuthSliceType = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

export default initialState;
