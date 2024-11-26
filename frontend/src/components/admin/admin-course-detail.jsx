import { courseService } from "@/services/course.service";
import { getOneCourseFailure, getOneCourseStart, getOneCourseSuccess } from "@/slice/course-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "./admin-layout";
import { Loader2 } from "lucide-react";
import { BsPatchCheck } from "react-icons/bs";
import { Button } from "../ui/button";
import moment from "moment";
import AddCourseModule from "./course-modules/add-course-module";
import courseModuleService from "@/services/course-module-service";
import {
  deleteModuleFailure,
  deleteModuleStart,
  deleteModuleSuccess,
  getModulesFailure,
  getModulesStart,
  getModulesSuccess,
  getOneModuleFailure,
  getOneModuleStart,
  getOneModuleSuccess,
} from "@/slice/course-module-slice";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import EditCourseModule from "./course-modules/edit-course-module";
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
import Cookies from "js-cookie";
import { secondsToMinutes } from "@/hooks";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import CourseDetailSkeleton from "../skeletons/course.detail.skeleton";

const AdminCourseDetail = () => {
  const { slug } = useParams();
  const { isLoading, course } = useSelector((state) => state.courses);
  const { modules } = useSelector((state) => state.courseModule);
  const { mode } = useSelector((state) => state.mode);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleId, setModuleId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOneCourse = async () => {
    dispatch(getOneCourseStart());
    try {
      const { data } = await courseService.getOneCourse(slug);
      dispatch(getOneCourseSuccess(data));
      lessonCountHandler(data.modules, data.id);
      getModules(data.id);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  const getModules = async (id) => {
    dispatch(getModulesStart());
    setLoading(true);
    try {
      const { data } = await courseModuleService.getModules(id);
      lessonCountHandler(data, id);
      dispatch(getModulesSuccess(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(getModulesFailure(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const openModal = (e, id) => {
    e.stopPropagation();
    setEditModal(!editModal);
    getModule(id);
    setModuleId(id);
  };

  const getModule = async (id) => {
    dispatch(getOneModuleStart());
    setLoading(true);
    try {
      const { data } = await courseModuleService.getOneModule(course?.id, id);
      dispatch(getOneModuleSuccess(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(getOneModuleFailure(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteModule = async (id) => {
    dispatch(deleteModuleStart());
    try {
      const { data } = await courseModuleService.deleteModule(course?.id, id);
      toast.success("Module o'chirildi!", { position: "top-center" });
      getModules(course?.id);
      const modulesData = await courseModuleService.getModules(course?.id);
      dispatch(deleteModuleSuccess(data));
      dispatch(getModulesSuccess(modulesData.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(deleteModuleFailure(error?.response?.data?.message));
    }
  };

  const lessonCountHandler = async (data, id) => {
    try {
      let count = 0;
      let duration = 0;

      data.forEach((module) => {
        count += module.videos.length;
      });

      data.forEach((module) => {
        module.videos.forEach((video) => {
          duration += video.duration * 1;
        });
      });

      const formData = new FormData();
      formData.append("lesson_count", count);
      formData.append("duration", secondsToMinutes(duration));
      const response = await courseService.updateCourse(formData, id);
      dispatch(getOneCourseSuccess(response.data));
    } catch (error) {
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getOneCourse();
  }, []);

  return (
    <AdminLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/courses" className="text-gray-500 hover:text-gray-600">
              Kurslar
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500">Kurs ma'lumotlari</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ? (
        <div>
          <CourseDetailSkeleton />
        </div>
      ) : (
        <div className="pb-8">
          <h1 className="text-2xl font-bold text-center font-spaceGrotesk tracking-[1px]">{course?.title}</h1>
          <div
            className={`${
              mode ? "bg-light" : "bg-gray-700"
            } p-4 flex sm:justify-start justify-center sm:items-start items-center mt-3 gap-3 flex-col sm:flex-row`}
          >
            <img src={`http://localhost:5000/course-images/${course?.image}`} alt="Img" className="w-[300px] h-[200px] object-cover rounded-md" />
            <p className="line-clamp-[10]">{course?.description}</p>
          </div>
          <div className={`p-4 mt-3`}>
            <h1 className="text-xl mt-2 font-bold text-center font-spaceGrotesk tracking-[1px]">Tehnologiyalar</h1>
            <div className="grid grid-cols-2">
              {course?.technologies?.map((item, idx) => (
                <p key={`item${idx}`} className="flex gap-2 p-2 cursor-pointer line-clamp-1 items-center justify-start">
                  <span className="mt-[1px]">
                    <BsPatchCheck className="text-blue-500" />
                  </span>{" "}
                  <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                </p>
              ))}
            </div>
          </div>
          <div className={`${mode ? "bg-light" : "bg-gray-700"} p-4 mt-3`}>
            <h1 className="text-xl mt-2 font-bold text-center font-spaceGrotesk tracking-[1px]">Modullar</h1>
            <div>
              {loading ? (
                <h1 className="flex justify-center items-center h-[80vh]">
                  <Loader2 className="animate-spin" />
                </h1>
              ) : modules?.length > 0 ? (
                modules?.map((item) => (
                  <p
                    key={item._id}
                    onClick={() => navigate(`/admin/courses/${slug}/course-module/${item._id}`)}
                    className="flex gap-2 border-b p-2 py-4 cursor-pointer line-clamp-1 items-center justify-between"
                  >
                    <span>{item.title}</span>
                    <Popover>
                      <PopoverTrigger
                        className="w-[30px] h-[30px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(!isOpen);
                        }}
                      >
                        <IoEllipsisVerticalSharp className="hover:scale-125" />
                      </PopoverTrigger>
                      <PopoverContent className={`${mode ? "bg-gray-400" : "bg-black text-white"} `}>
                        <ul className={`w-full`}>
                          <li
                            onClick={(e) => openModal(e, item._id)}
                            className="flex border-b cursor-pointer border-gray-400 items-center hover:text-blue-600 transition-all justify-start gap-3 p-2"
                          >
                            <MdModeEditOutline className="w-[20px] h-[20px]" />
                            <span>Tahrirlash</span>
                          </li>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDeleteModal(!openDeleteModal);
                              setModuleId(item._id);
                            }}
                            className="flex border-b cursor-pointer border-gray-400 hover:text-red-500 transition-all items-center justify-start gap-3 p-2"
                          >
                            <MdDelete className="w-[20px] h-[20px]" />
                            <span>O'chirish</span>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </p>
                ))
              ) : (
                <h1 className="">Modul mavjud emas</h1>
              )}
              <Button className="mt-4 bg-green-700 w-full hover:bg-blue-700" onClick={() => setModal(!modal)}>
                <span className="text-white text-[25px] mr-3 pb-1">+</span>
                Modul qo'shish
              </Button>
            </div>
          </div>
          <div className={`${mode ? "bg-light" : "bg-gray-700"} p-4 mt-3`}>
            <h2 className="text-xl mt-2 font-bold text-center font-spaceGrotesk tracking-[1px]">Kurs ma'lumotlari</h2>
            <ul>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Kurs Nomi:</span> {course?.title}
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Kommentlar soni:</span> {course?.comments?.length}
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Davomiyligi:</span> {course?.duration} daqiqa
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Darslar soni:</span> {course?.lesson_count}
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Narxi:</span> {course?.price} SO'M
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Yo'nalish:</span> {course?.directionCategory}
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Kurs Darajasi:</span> {course?.ratingCategory}
              </li>
              <li className={`border-b border-gray-600 p-2 flex justify-between text-start items-center`}>
                <span className="font-bold">Kurs statusi:</span> {course?.priceCategory}
              </li>
            </ul>
            <div className="py-4 px-2">
              <p className="flex justify-between items-center">
                <span>Yaratilgan vaqti:</span> <span className="font-bold"> {moment().format("YYYY-MM-DD, HH:mm")}</span>
              </p>
            </div>
          </div>

          {modal && <AddCourseModule modal={modal} setModal={setModal} />}
          {editModal && <EditCourseModule editModal={editModal} setEditModal={setEditModal} moduleId={moduleId} />}
          {openDeleteModal && (
            <AlertDialog
              open={openDeleteModal}
              onOpenChange={() => {
                setOpenDeleteModal(false);
              }}
            >
              <AlertDialogContent className={`${mode ? "bg-white" : "bg-gray-800 text-white"}`}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Siz bu modulni o'chirmoqchimisiz?</AlertDialogTitle>
                  <AlertDialogDescription>Ushbu modul butunlay o'chib ketadi. Modul o'chirilsinmi?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={(e) => deleteModule(moduleId)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourseDetail;
