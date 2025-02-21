import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;