// client/src/utils/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load preferences from localStorage if available
const savedPreferences = JSON.parse(localStorage.getItem("userPreferences")) || {
  theme: "dark",
  language: "English",
  notifications: true,
};

const initialState = null; // user will be null if not logged in

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      // When adding a user, also attach preferences
      return { ...action.payload, preferences: savedPreferences };
    },
    removeUser: (state, action) => {
      return null; // Clear user on sign out
    },
    updatePreferences: (state, action) => {
      if (!state) return;
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem("userPreferences", JSON.stringify(state.preferences));
    },
  },
});

export const { addUser, removeUser, updatePreferences } = userSlice.actions;

export default userSlice.reducer;
