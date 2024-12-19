import { IUser } from "../types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAsync } from "../async/authAsync";

const initialState = {
  user: {} as IUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
    },
    CHECK_LOGIN: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(
  //       loginAsync.fulfilled,
  //       (state, action: PayloadAction<{ user: IUser }>) => {
  //         state.user = action.payload.user;
  //         console.log("🚀 ~ action.payload.user:", action.payload.user)
  //       }
  //     )
  //     .addCase(loginAsync.rejected, (state) => {
  //       state.user = {} as IUser;
  //     })
  // },
});

export const { LOGIN, CHECK_LOGIN } = authSlice.actions;
export default authSlice.reducer;
