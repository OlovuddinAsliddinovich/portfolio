import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  isLoading: false,
  courses: [],
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
  },
});

export const { getCoursesStart, getCoursesSuccess, getCoursesFailure } =
  courseSlice.actions;
export const courseReducer = courseSlice.reducer;
