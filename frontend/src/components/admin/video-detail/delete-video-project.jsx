import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { secondsToMinutes } from "@/hooks";
import { projectService } from "@/services/project.service";
import videoService from "@/services/video.service";
import { getOneProjectFailure, getOneProjectSuccess, getProjectsStart } from "@/slice/project.slice";
import { deleteVideoFailure, deleteVideoSuccess, getVideosStart } from "@/slice/video-slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteVideoProject = ({ deleteOpen, setDeleteOpen, videoId }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { project } = useSelector((state) => state.projects);

  const lessonCountHandler = async (data, id) => {
    try {
      const count = data?.videos?.length;

      let duration = 0;

      data?.videos?.forEach((vide) => {
        duration += Number(vide?.duration);
      });

      const formData = new FormData();
      formData.append("lesson_count", count);
      formData.append("duration", secondsToMinutes(duration));
      await projectService.updateProject(formData, id);
      const projectData = await projectService.getOneProject(data?.slug);
      dispatch(getOneProjectSuccess(projectData?.data));
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  const deleteVideoHandler = async (id) => {
    dispatch(getVideosStart());
    getProjectsStart();
    try {
      await videoService.deleteVideoProject(project?.id, id);
      dispatch(deleteVideoSuccess());
      const projectData = await projectService.getOneProject(project?.slug);
      lessonCountHandler(projectData.data, project?.id);
      dispatch(getOneProjectSuccess(projectData?.data));
      toast.success("Video o'chirildi!");
    } catch (error) {
      console.log(error);
      dispatch(deleteVideoFailure(error?.response?.data?.message));
    }
  };

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent className={mode ? "bg-white" : "bg-gray-800 text-light"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Siz bu videoni o'chirmoqchimisiz?</AlertDialogTitle>
          <AlertDialogDescription className={mode ? "" : "text-gray-400"}>Bu video butunlay o'chib ketadi! O'chirilsinmi?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={mode ? "" : "text-gray-900"}>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteVideoHandler(videoId)} className="bg-red-500 hover:bg-red-600">
            O'chirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVideoProject;
