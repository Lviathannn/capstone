import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
    updateToken: (state, action) => {
      state.user.access_token = action.payload;
    },
  },
});

export const { setUser, resetUser, updateToken, showConsole } =
  authSlice.actions;
export default authSlice.reducer;
