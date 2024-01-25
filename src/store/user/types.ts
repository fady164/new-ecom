type AuthSliceType = {
  loading: boolean;
  userInfo: UserInfo;
  userToken: string | null;
  error: string | null;
  success: boolean;
};

export type UserInfo = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
};

export default AuthSliceType;
