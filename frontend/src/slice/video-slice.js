import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  videos: [],
  video: null,
  error: null,
  loading: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addVideoStart(state) {
      state.isLoading = true;
      state.loading = true;
    },
    addVideoSuccess(state, action) {
      state.isLoading = false;
      state.video = action.payload;
      state.loading = false;
    },
    addVideoFailure(state, action) {
      state.isLoading = false;
      state.loading = false;
      state.error = action.payload;
    },
    getVideosStart(state) {
      state.isLoading = true;
      state.loading = true;
    },
    getVideosSuccess(state, action) {
      state.isLoading = false;
      state.videos = action.payload;
      state.loading = false;
    },
    getVideosFailure(state, action) {
      state.isLoading = false;
      state.loading = false;
      state.error = action.payload;
    },
    getOneVideoStart(state) {
      state.isLoading = true;
      state.loading = true;
    },
    getOneVideoSuccess(state, action) {
      state.isLoading = false;
      state.video = action.payload;
      state.loading = false;
    },
    getOneVideoFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.loading = false;
    },
    editVideoSuccess(state, action) {
      state.isLoading = false;
      state.video = action.payload;
      state.loading = false;
    },
    editVideFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.loading = false;
    },
    deleteVideoSuccess(state, action) {
      state.isLoading = false;
      state.loading = false;
      state.video = null;
    },
    deleteVideoFailure(state, action) {
      state.isLoading = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addVideoStart,
  addVideoSuccess,
  addVideoFailure,
  getVideosStart,
  getVideosSuccess,
  getVideosFailure,
  getOneVideoStart,
  getOneVideoSuccess,
  getOneVideoFailure,
  editVideoSuccess,
  editVideFailure,
  deleteVideoSuccess,
  deleteVideoFailure,
} = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
