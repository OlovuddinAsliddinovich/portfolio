import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { getOneProjectFailure, getOneProjectSuccess, getProjectsFailure, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import AddProject from "../admin/projects/add-project";
import { toast } from "react-toastify";
import EditProject from "../admin/projects/edit-project";
import DeleteProject from "../admin/projects/delete-project";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb";
import CoursesSkeleton from "../skeletons/courses.skeleton";
import { Helmet } from "react-helmet";
import { IMG_URL } from "@/services";

const AdminProjects = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const { projects, isLoading } = useSelector((state) => state.projects);

  const getProjects = async () => {
    dispatch(getProjectsStart());
    try {
      const { data } = await projectService.getProjects();
      dispatch(getProjectsSuccess(data));
      return data;
    } catch (error) {
      dispatch(getProjectsFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  const getProject = async (slug) => {
    dispatch(getProjectsStart());
    try {
      const response = await projectService.getOneProject(slug);
      dispatch(getOneProjectSuccess(response?.data));
      setEditOpen(true);
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  const editModalHandler = (e, slug) => {
    e.stopPropagation();
    getProject(slug);
  };

  const deleteModalHandler = (e, id) => {
    e.stopPropagation();
    setProjectId(id);
    setDeleteOpen(true);
  };

  const navigateHandler = (slug) => {
    getProject(slug);
    navigate(`/admin/projects/${slug}`);
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getProjects();
  }, []);
  return (
    <AdminLayout>
      <Helmet>
        <title>Admin | Loyihalar</title>
        <meta name="description" content="Admin | Loyihalar" />
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/projects" className="text-blue-500 text-2xl font-bold hover:text-blue-600">
              Loyihalar
            </BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbLink className="text-gray-400 hover:text-gray-500 text-2xl" href="/admin/courses">
              Kurslar
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full flex items-center justify-end">
        <Button className={`bg-green-600 hover:bg-blue-700`} onClick={() => setAddOpen(true)}>
          Qo'shish
        </Button>
      </div>

      <Table className="mt-4">
        {isLoading && <TableCaption>Mavjud Loyihalar Jadvali</TableCaption>}
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Rasm</TableHead>
            <TableHead className="w-[220px]">Nomi</TableHead>
            <TableHead>Darslar</TableHead>
            <TableHead>O'quvchilar</TableHead>
            <TableHead>Kommentariya</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            {[...Array(6)].map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <CoursesSkeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project?._id} className="cursor-pointer " onClick={() => navigateHandler(project?.slug, project?._id)}>
                  <TableCell>
                    <img className="w-10 h-10 rounded-sm object-cover" src={`${IMG_URL}/course-images/${project.image}`} alt="course img" />
                  </TableCell>
                  <TableCell className="w-[220px] line-clamp-1 mt-2">{project.title}</TableCell>
                  <TableCell>{project.lesson_count}</TableCell>
                  <TableCell>{project.students.length}</TableCell>
                  <TableCell>{project.comment_count}</TableCell>
                  <TableCell className="flex gap-0">
                    <Button
                      onClick={(e) => deleteModalHandler(e, project?._id)}
                      variant="destructive"
                      className="hover:bg-red-600 rounded-tr-none rounded-br-none"
                    >
                      <MdDelete />
                    </Button>
                    <Button
                      onClick={(e) => editModalHandler(e, project?.slug)}
                      className="bg-blue-500 hover:bg-blue-600 rounded-tl-none rounded-bl-none"
                    >
                      <MdOutlineEdit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="mt-4 bg-transparent">
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="font-semibold text-[16px]">
                  Jami loyihalar soni
                </TableCell>
                <TableCell colSpan={2}>{projects.length}</TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
      {addOpen && <AddProject addOpen={addOpen} setAddOpen={setAddOpen} />}
      {editOpen && <EditProject editOpen={editOpen} setEditOpen={setEditOpen} />}
      {deleteOpen && <DeleteProject deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} projectId={projectId} />}
    </AdminLayout>
  );
};

export default AdminProjects;
