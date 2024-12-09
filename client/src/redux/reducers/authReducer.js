import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  _id: "",
  name: "",
  rule: 0,
};
const authSlide = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const authReducer = authSlide.reducer;
export const { addAuth } = authSlide.actions;

export const authSeletor = (state) => state.authReducer.data;
