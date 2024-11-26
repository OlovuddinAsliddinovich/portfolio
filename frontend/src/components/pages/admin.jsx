import { useEffect } from "react";
import AdminLayout from "../admin/admin-layout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "@/slice/course-slice";
import { courseService } from "@/services/course.service";
import { projectService } from "@/services/project.service";
import { getProjectsSuccess } from "@/slice/project.slice";
import { codeResourceService } from "@/services/code-resource-service";
import { codeResourcesSuccess } from "@/slice/code-resource.slice";
import userService from "@/services/user.service";
import { signUsersSuccess } from "@/slice/user-slice";
import moment from "moment";
import { Helmet } from "react-helmet";

const AdminPage = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { courses, isLoading } = useSelector((state) => state.courses);
  const { projects } = useSelector((state) => state.projects);
  const { codeResources } = useSelector((state) => state.codeResources);
  const { users } = useSelector((state) => state.userData);

  const getAllData = async () => {
    dispatch(getCoursesStart());
    try {
      const courses = await courseService.getCourses();
      dispatch(getCoursesSuccess(courses.data));
      const projects = await projectService.getProjects();
      dispatch(getProjectsSuccess(projects.data));
      const codeResources = await codeResourceService.getAllCodeResources();
      dispatch(codeResourcesSuccess(codeResources.data));
      const users = await userService.getUsers();
      dispatch(signUsersSuccess(users));
    } catch (error) {
      console.log(error);
      dispatch(getCoursesFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getAllData();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin panel</title>
        <meta name="description" content="Admin panel" />
      </Helmet>
      <div className="grid sm:grid-cols-2 gird-cols-1 gap-4">
        <div className={`overflow-x-scroll border p-2 ${mode ? "bg-light" : "bg-slate border-gray-700"}`}>
          <h1 className="text-2xl font-semibold font-spaceGrotesk mt-4 mb-2 cursor-default text-center">Kurslar</h1>
          <table className="w-full border-collapse min-w-[400px] overflow-x-scroll p-2">
            <thead className="text-left">
              <tr className="border-b">
                <th>№</th>
                <th>Kurs nomi</th>
                <th>Yaratilgan vaqti</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr
                    onClick={() => navigate(`/admin/courses/${course.slug}`)}
                    key={index}
                    className="hover:bg-gray-400 transition-all cursor-pointer border-b h-[50px]"
                  >
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                    <td>{moment(course.createdAt).format("DD-MM-YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="pt-4 text-center text-gray-500">
                    Kurslar mavjud emas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`overflow-x-scroll border p-2 ${mode ? "bg-light" : "bg-slate border-gray-700"}`}>
          <h1 className="text-2xl font-semibold font-spaceGrotesk mt-4 mb-2 cursor-default text-center">Loyihalar</h1>
          <table className="w-full border-collapse min-w-[400px] overflow-x-scroll p-2">
            <thead className="text-left">
              <tr className="border-b">
                <th>№</th>
                <th>Loyiha nomi</th>
                <th>Yaratilgan vaqti</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr
                    onClick={() => navigate(`/admin/projects/${project.slug}`)}
                    key={index}
                    className="hover:bg-gray-400 transition-all cursor-pointer border-b h-[50px]"
                  >
                    <td>{index + 1}</td>
                    <td>{project.title}</td>
                    <td>{moment(project.createdAt).format("DD-MM-YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="pt-4 text-center text-gray-500">
                    Loyihalar mavjud emas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`overflow-x-scroll border p-2 ${mode ? "bg-light" : "bg-slate border-gray-700"}`}>
          <h1 className="text-2xl font-semibold font-spaceGrotesk mt-4 mb-2 cursor-default text-center">Kod manbalari</h1>
          <table className="w-full border-collapse min-w-[400px] overflow-x-scroll p-2">
            <thead className="text-left">
              <tr className="border-b">
                <th>№</th>
                <th>Code nomi</th>
                <th>Yaratilgan vaqti</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : codeResources.length > 0 ? (
                codeResources.map((resource, index) => (
                  <tr
                    onClick={() => window.open(resource.url, "_blank")}
                    key={index}
                    className="hover:bg-gray-400 transition-all cursor-pointer border-b h-[50px]"
                  >
                    <td>{index + 1}</td>
                    <td>{resource.title}</td>
                    <td>{moment(resource.createdAt).format("DD-MM-YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="pt-4 text-center text-gray-500">
                    Kod manbalar mavjud emas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`overflow-x-scroll border p-2 ${mode ? "bg-light" : "bg-slate border-gray-700"}`}>
          <h1 className="text-2xl font-semibold font-spaceGrotesk mt-4 mb-2 cursor-default text-center">Foydalanuvchilar</h1>
          <table className="w-full border-collapse min-w-[400px] overflow-x-scroll p-2">
            <thead className="text-left">
              <tr className="border-b">
                <th>№</th>
                <th>Foydalanuvchi nomi</th>
                <th>Yaratilgan vaqti</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : users?.length > 0 ? (
                users?.map((user, index) => (
                  <tr
                    onClick={() => navigate(`/admin/users`)}
                    key={index}
                    className="hover:bg-gray-400 transition-all cursor-pointer border-b h-[50px]"
                  >
                    <td>{index + 1}</td>
                    <td>{user?.firstname}</td>
                    <td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="pt-4 text-center text-gray-500">
                    Foydalanuvchilar mavjud emas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
