import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Courses from "./components/pages/courses";
import Projects from "./components/pages/projects";
import CodeResource from "./components/pages/code-resource";
import Profile from "./components/pages/profile";
import ErrorPage from "./components/pages/error-page";
import CourseDetail from "./components/pages/course-detail";
import SignUp from "./components/layouts/sign-up";
import SignIn from "./components/layouts/sign-in";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "./services/user.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "./slice/user-slice";
import AdminPage from "./components/pages/admin";
import AdminCourses from "./components/pages/admin-courses";
import AdminProjects from "./components/pages/admin-projects";
import AdminCodeResource from "./components/pages/admin-code-resource";
import AdminUsers from "./components/pages/admin-users";
import AdminLogin from "./components/pages/admin.login";
import AdminCourseDetail from "./components/admin/admin-course-detail";
import AdminCourseModuleDetail from "./components/admin/course-modules/course-module-detail";
import ShowVideoCourse from "./components/admin/video-detail/show-video-course";
import AdminProjectDetail from "./components/admin/projects/project-detail";
import AdminProjectVideos from "./components/admin/projects/project-videos";
import ShowVideoProject from "./components/admin/video-detail/show-video-project";
import ShowVideosCourse from "./components/pages/show-videos-course";
import ProjectDetail from "./components/pages/project-detail";
import ShowVideosProject from "./components/pages/show-videos-project";
import AdminComments from "./components/pages/admin-comments";

const App = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const checkAuth = async () => {
    dispatch(signUserStart());
    try {
      const response = await UserService.refresh();
      localStorage.setItem("accessToken", response.accessToken);
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      dispatch(signUserFailure(error?.response?.data?.message));
      await UserService.logout();
    }
  };
  useEffect(() => {
    if (accessToken) {
      checkAuth();
    }
  }, []);
  return (
    <>
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path="/admin-panel" element={<AdminPage />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/:slug" element={<AdminCourseDetail />} />
        <Route path="/admin/courses/:slug/course-module/:id" element={<AdminCourseModuleDetail />} />
        <Route path="/admin/courses/:slug/course-module/:id/videos/:videoId" element={<ShowVideoCourse />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/:slug" element={<AdminProjectDetail />} />
        <Route path="/admin/projects/:slug/videos" element={<AdminProjectVideos />} />
        <Route path="/admin/projects/:slug/videos/:videoId" element={<ShowVideoProject />} />
        <Route path="/admin/code-resources" element={<AdminCodeResource />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/comments" element={<AdminComments />} />
        <Route path="admin-sign" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/courses/:slug/modules/:id/videos/:videoId" element={<ShowVideosCourse />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/projects/:slug/videos/:videoId" element={<ShowVideosProject />} />
        <Route path="/code-resource" element={<CodeResource />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
