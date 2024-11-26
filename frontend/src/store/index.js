import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "@/slice/mode-slice";
import { userReducer } from "@/slice/user-slice";
import { courseReducer } from "@/slice/course-slice";
import { projectReducer } from "@/slice/project.slice";
import { courseModuleReducer } from "@/slice/course-module-slice";
import { videoReducer } from "@/slice/video-slice";
import { codeResourceReducer } from "@/slice/code-resource.slice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    userData: userReducer,
    courses: courseReducer,
    courseModule: courseModuleReducer,
    projects: projectReducer,
    videos: videoReducer,
    codeResources: codeResourceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
