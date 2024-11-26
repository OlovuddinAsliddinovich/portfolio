import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  isLoading: false,
  courses: [],
  course: null,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initalState,
  reducers: {
    getCoursesStart: (state) => {
      state.isLoading = true;
    },
    getCoursesSuccess: (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    },
    getCoursesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOneCourseStart: (state) => {
      state.isLoading = true;
    },
    getOneCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.course = action.payload;
    },
    getOneCourseFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCourseStart: (state) => {
      state.isLoading = true;
    },
    setCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    },
    setCourseFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCourseStart: (state) => {
      state.isLoading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.course = action.payload;
    },
    deleteCourseFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCoursesStart,
  getCoursesSuccess,
  getCoursesFailure,
  setCourseStart,
  setCourseSuccess,
  setCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  deleteCourseFailure,
  getOneCourseStart,
  getOneCourseSuccess,
  getOneCourseFailure,
} = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
