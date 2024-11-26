import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  modules: [],
  module: null,
  error: null,
};

const courseModuleSlice = createSlice({
  name: "courseModule",
  initialState,
  reducers: {
    setCourseModuleStart: (state) => {
      state.isLoading = true;
    },
    setCourseModuleSuccess: (state, action) => {
      state.isLoading = false;
      state.module = action.payload;
    },
    setCourseModuleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getModulesStart: (state) => {
      state.isLoading = true;
    },
    getModulesSuccess: (state, action) => {
      state.isLoading = false;
      state.modules = action.payload;
    },
    getModulesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getOneModuleStart: (state) => {
      state.isLoading = true;
    },
    getOneModuleSuccess: (state, action) => {
      state.isLoading = false;
      state.module = action.payload;
    },
    getOneModuleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteModuleStart: (state) => {
      state.isLoading = true;
    },
    deleteModuleSuccess: (state, action) => {
      state.isLoading = false;
      state.module = null;
    },
    deleteModuleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCourseModuleStart,
  setCourseModuleSuccess,
  setCourseModuleFailure,
  getModulesStart,
  getModulesSuccess,
  getModulesFailure,
  getOneModuleStart,
  getOneModuleSuccess,
  getOneModuleFailure,
  deleteModuleStart,
  deleteModuleSuccess,
  deleteModuleFailure,
} = courseModuleSlice.actions;

export const courseModuleReducer = courseModuleSlice.reducer;
