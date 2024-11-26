import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  codeResources: [],
  codeResource: null,
  loading: false,
};

const codeResourceSlice = createSlice({
  name: "codeResource",
  initialState,
  reducers: {
    codeResourceStart: (state) => {
      state.isLoading = true;
    },
    codeResourceSuccess: (state, action) => {
      state.isLoading = false;
      state.codeResource = action.payload;
    },
    codeResourcesSuccess: (state, action) => {
      state.isLoading = false;
      state.codeResources = action.payload;
    },
    codeResourceFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { codeResourceStart, codeResourceSuccess, codeResourceFailure, codeResourcesSuccess } = codeResourceSlice.actions;
export const codeResourceReducer = codeResourceSlice.reducer;
