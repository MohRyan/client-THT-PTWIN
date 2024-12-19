import { IAuthState } from "../types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authCheckAsync, loginAsync } from "../async/authAsync";

const initialState: IAuthState = {
  user: {} as IUser,
  isLogin: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ token: string; user: IUser }>) => {
          state.isLogin = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginAsync.rejected, (state) => {
        state.isLogin = false;
        state.token = "";
        state.user = {} as IUser;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLogin = false;
      });

    builder
      .addCase(
        authCheckAsync.fulfilled,
        (state, action: PayloadAction<{ token: string; user: IUser }>) => {
          state.isLogin = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(authCheckAsync.rejected, (state) => {
        state.isLogin = false;
        state.token = "";
        state.user = {} as IUser;
      })
      .addCase(authCheckAsync.pending, (state) => {
        state.isLogin = false;
      });
  },
});

export const { LOGIN } = authSlice.actions;
export default authSlice.reducer;
