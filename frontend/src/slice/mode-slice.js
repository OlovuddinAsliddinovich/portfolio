import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: JSON.parse(localStorage.getItem("mode")) || false,
  sidebarOpen: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("mode", state.mode);
    },
    setSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setMode, setSidebarOpen } = modeSlice.actions;
export const modeReducer = modeSlice.reducer;
