import React, { useEffect, useState } from "react";
import AdminLayout from "../admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneModuleFailure, getOneModuleStart, getOneModuleSuccess } from "@/slice/course-module-slice";
import courseModuleService from "@/services/course-module-service";
import { getOneCourseFailure, getOneCourseStart, getOneCourseSuccess } from "@/slice/course-slice";
import { courseService } from "@/services/course.service";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddVideoCourse from "../video-detail/add-video-course";
import { secondsToMinutes } from "@/hooks";
import { FaVideo } from "react-icons/fa";

import {
  deleteVideoFailure,
  deleteVideoSuccess,
  getOneVideoFailure,
  getOneVideoStart,
  getOneVideoSuccess,
  getVideosSuccess,
} from "@/slice/video-slice";
import videoService from "@/services/video.service";
import EditVideoCourse from "../video-detail/edit-video-course";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import VideoItemSkeleton from "@/components/skeletons/video.item.skeleton";
import { Helmet } from "react-helmet";

const AdminCourseModuleDetail = () => {
  const { slug, id } = useParams();
  const { course, isLoading } = useSelector((state) => state.courses);
  const { module } = useSelector((state) => state.courseModule);
  const { mode } = useSelector((state) => state.mode);
  const { loading } = useSelector((state) => state.videos);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");

  const dispatch = useDispatch();

  const getOneCourse = async () => {
    dispatch(getOneCourseStart());
    try {
      const { data } = await courseService.getOneCourse(slug);
      getModule(data.id, id);
      dispatch(getOneCourseSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  const getModule = async (courseId, moduleId) => {
    dispatch(getOneModuleStart());
    try {
      const { data } = await courseModuleService.getOneModule(courseId, moduleId);
      dispatch(getOneModuleSuccess(data));
      dispatch(getVideosSuccess(data.videos));
    } catch (error) {
      console.log(error);
      dispatch(getOneModuleFailure(error?.response?.data?.message));
    }
  };

  const editModalHandler = (id) => {
    setEditModal(!editModal);
    setVideoId(id);
    getVideo(id);
  };

  const getVideo = async (videoId) => {
    dispatch(getOneVideoStart());
    try {
      const { data } = await videoService.getOneVideoCourse(course?.id, module?._id, videoId);
      dispatch(getOneVideoSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOneVideoFailure(error?.response?.data?.message));
    }
  };

  const deleteVideo = async (id) => {
    dispatch(getOneVideoStart());
    try {
      await videoService.deleteVideoCourse(course?.id, module?._id, id);
      getModule(course?.id, module?._id);
      dispatch(deleteVideoSuccess());
      setDeleteModal(false);
    } catch (error) {
      dispatch(deleteVideoFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }

    if (slug) getOneCourse();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>{module?.title}</title>
        <meta name="description" content="Modul haqida ma'lumot" />
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/courses" className="text-gray-500 hover:text-gray-600">
              Kurslar
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/admin/courses/${slug}`} className="text-gray-500 hover:text-gray-600">
              {course?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500">{module?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        {isLoading ? (
          <div>
            <VideoItemSkeleton />
          </div>
        ) : (
          <div className="relative">
            <h1 className="text-xl xs:text-2xl font-bold">{module?.title}</h1>
            <Button onClick={() => setOpen(true)} className=" bg-green-600 hover:bg-blue-600 w-full sm:w-[200px] mt-4">
              Video qo'shish
            </Button>
            <ul>
              {module?.videos?.map((video, idx) => (
                <li key={video?._id} className="flex justify-between items-start border-b py-3 gap-4">
                  <p
                    className="cursor-pointer hover:text-gray-400 transition-all flex justify-between w-full pt-2"
                    onClick={() => navigate(`/admin/courses/${slug}/course-module/${module?._id}/videos/${video?._id}`)}
                  >
                    <span className="flex items-center gap-2">
                      <FaVideo className="w-4 h-4 text-blue-500" /> #{idx + 1}. {video?.title}
                    </span>
                    <span>{secondsToMinutes(video?.duration)}</span>
                  </p>
                  <div className="flex gap-1 items-center xs:flex-row flex-col">
                    <Button onClick={() => editModalHandler(video?._id)} className="w-[100px] bg-blue-500 hover:bg-blue-600">
                      Tahrirlash
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteModal(true);
                        setVideoId(video?._id);
                      }}
                      className="w-[100px] bg-red-500 hover:bg-red-600"
                    >
                      O'chirish
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {open && <AddVideoCourse open={open} setOpen={setOpen} />}
            {editModal && <EditVideoCourse editModal={editModal} setEditModal={setEditModal} videoId={videoId} />}
            {deleteModal && (
              <AlertDialog
                open={deleteModal}
                onOpenChange={() => {
                  setDeleteModal(false);
                }}
              >
                <AlertDialogContent className={`${mode ? "bg-white" : "bg-gray-800 text-white"}`}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Siz bu videoni o'chirmoqchimisiz?</AlertDialogTitle>
                    <AlertDialogDescription>Ushbu video butunlay o'chib ketadi. Video o'chirilsinmi?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-black">Bekor qilish</AlertDialogCancel>
                    <Button disabled={loading} className="bg-red-500 hover:bg-red-600 w-[200px]" onClick={(e) => deleteVideo(videoId)}>
                      {loading ? "O'chirilmoqda..." : "O'chirish"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCourseModuleDetail;
