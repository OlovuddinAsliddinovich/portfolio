import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "@/slice/mode-slice";
import { userReducer } from "@/slice/user-slice";
import { courseReducer } from "@/slice/course-slice";
import { projectReducer } from "@/slice/project.slice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    userData: userReducer,
    courses: courseReducer,
    projects: projectReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
