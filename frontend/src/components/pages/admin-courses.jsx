import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { courseService } from "@/services/course.service";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursesFailure,
  getCoursesStart,
  getCoursesSuccess,
} from "@/slice/course-slice";
import { Loader2 } from "lucide-react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const AdminCourses = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();

  const { courses, isLoading } = useSelector((state) => state.courses);

  const getCourses = async () => {
    dispatch(getCoursesStart());
    try {
      const { data } = await courseService.getCourses();
      dispatch(getCoursesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getCoursesFailure(error));
      console.log(error);
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
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl xs:text-3xl font-bold">Kurslar ro'yxati</h1>
        <Button className={`bg-green-600 hover:bg-blue-700`}>Qo'shish</Button>
      </div>

      <Table className="mt-4">
        {!isLoading && <TableCaption>Mavjud kurslar Jadvali</TableCaption>}
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
          <TableBody className="w-full">
            <TableRow className="border hover:bg-transparent">
              <TableCell className="h-24 hover:bg-transparent" colSpan={6}>
                <Loader2 className="animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>
                    <img
                      className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-sm object-cover"
                      src={`http://localhost:5000/course-images/${course.image}`}
                      alt="course img"
                    />
                  </TableCell>
                  <TableCell className="w-[220px] line-clamp-1 mt-2">
                    {course.title}
                  </TableCell>
                  <TableCell>{course.lesson_count}</TableCell>
                  <TableCell>{course.students.length}</TableCell>
                  <TableCell>{course.comment_count}</TableCell>
                  <TableCell>
                    <Button className="bg-red-500 hover:bg-red-600 rounded-tr-none rounded-br-none">
                      <MdDelete />
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 rounded-tl-none rounded-bl-none">
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
    </AdminLayout>
  );
};

export default AdminCourses;
