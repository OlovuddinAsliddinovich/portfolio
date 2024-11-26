import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  isLoading: false,
  projects: [],
  project: null,
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
    addProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.project = action.payload;
    },
    addProjectFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOneProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.project = action.payload;
    },
    getOneProjectFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.project = null;
    },
    deleteProjectFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProjectsStart,
  getProjectsSuccess,
  getProjectsFailure,
  addProjectSuccess,
  addProjectFailure,
  getOneProjectSuccess,
  getOneProjectFailure,
  deleteProjectSuccess,
  deleteProjectFailure,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
