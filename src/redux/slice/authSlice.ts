import { IUser } from "../types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
});

export const { LOGIN, CHECK_LOGIN } = authSlice.actions;
export default authSlice.reducer;
