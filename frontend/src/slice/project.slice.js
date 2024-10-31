import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  isLoading: false,
  projects: [],
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: initalState,
  reducers: {
    getProjectsStart: (state) => {
      state.isLoading = true;
    },
    getProjectsSuccess: (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
    },
    getProjectsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProjectsStart, getProjectsSuccess, getProjectsFailure } =
  projectSlice.actions;

export const projectReducer = projectSlice.reducer;
