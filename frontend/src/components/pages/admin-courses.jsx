import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { courseService } from "@/services/course.service";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  getCoursesFailure,
  getCoursesStart,
  getCoursesSuccess,
  getOneCourseSuccess,
} from "@/slice/course-slice";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import AdminAddCourse from "../admin/admin-add-course";
import AdminEditCourse from "../admin/admin-edit-course";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import CoursesSkeleton from "../skeletons/courses.skeleton";

const AdminCourses = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { courses, isLoading } = useSelector((state) => state.courses);
  const { mode } = useSelector((state) => state.mode);

  const getCourses = async () => {
    dispatch(getCoursesStart());
    try {
      const { data } = await courseService.getCourses();
      dispatch(getCoursesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getCoursesFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const isOpenDeleteModal = (e) => {
    e.stopPropagation();
    setModal(!modal);
  };

  const deleteCourseHandler = async (e, id) => {
    e.stopPropagation();
    dispatch(deleteCourseStart());
    try {
      const response = await courseService.deleteCourse(id);
      dispatch(deleteCourseSuccess(response.data));
      toast.success("Kurs o'chirildi!");
      getCourses();
      return response;
    } catch (error) {
      console.log(error);
      dispatch(deleteCourseFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getCourses();
  }, []);
  return (
    <AdminLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/courses" className="text-blue-500 hover:text-blue-600 font-bold text-2xl">
              Kurslar
            </BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/projects" className="text-gray-400 hover:text-gray-500 text-2xl">
              Loyihalar
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full flex items-center justify-end">
        {/* <h1 className="text-xl xs:text-3xl font-bold">Kurslar ro'yxati</h1> */}
        <Button className={`bg-green-600 hover:bg-blue-700`} onClick={() => setIsOpen(!isOpen)}>
          Qo'shish
        </Button>
      </div>
      <Table className="mt-4">
        {isLoading && <TableCaption>Mavjud kurslar Jadvali</TableCaption>}
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
              {courses &&
                courses
                  .slice()
                  .reverse()
                  .map((course) => (
                    <TableRow key={course._id} onClick={() => navigate(`/admin/courses/${course.slug}`)} className={`z-10`}>
                      <TableCell>
                        <img
                          className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-sm object-cover"
                          src={`http://localhost:5000/course-images/${course.image}`}
                          alt="course img"
                        />
                      </TableCell>
                      <TableCell className="w-[220px] line-clamp-1 mt-2">{course.title}</TableCell>
                      <TableCell>{course.lesson_count}</TableCell>
                      <TableCell>{course.students.length}</TableCell>
                      <TableCell>{course.comment_count}</TableCell>
                      <TableCell className="flex">
                        <Button onClick={(e) => isOpenDeleteModal(e)} className="bg-red-500 hover:bg-red-600 rounded-tr-none rounded-br-none">
                          <MdDelete />
                        </Button>
                        {modal && (
                          <AlertDialog open={modal} onOpenChange={() => setModal(!modal)}>
                            <AlertDialogContent className={`${mode ? "bg-white" : "bg-gray-800 text-white"}`}>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Siz bu kursni o'chirmoqchimisiz?</AlertDialogTitle>
                                <AlertDialogDescription>Kurs butunlay o'chib ketadi. Kurs o'chirilsinmi?</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => isOpenDeleteModal(e)} className="text-black">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={(e) => deleteCourseHandler(e, course._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditOpen(!isEditOpen);
                            dispatch(getOneCourseSuccess(course));
                          }}
                          className="bg-blue-500 hover:bg-blue-600 z-20 rounded-tl-none rounded-bl-none"
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
                  Jami kurslar soni
                </TableCell>
                <TableCell colSpan={2}>{courses.length}</TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>

      {isOpen && <AdminAddCourse isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isEditOpen && <AdminEditCourse isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />}
    </AdminLayout>
  );
};

export default AdminCourses;
