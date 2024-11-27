import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { addVideoFailure, addVideoStart, addVideoSuccess } from "@/slice/video-slice";
import videoService from "@/services/video.service";
import { toast } from "react-toastify";
import courseModuleService from "@/services/course-module-service";
import { getModulesSuccess, getOneModuleSuccess } from "@/slice/course-module-slice";
import { getOneCourseFailure, getOneCourseSuccess } from "@/slice/course-slice";
import { secondsToMinutes } from "@/hooks";
import { courseService } from "@/services/course.service";

const AddVideoCourse = ({ open, setOpen }) => {
  const { mode } = useSelector((state) => state.mode);
  const { course } = useSelector((state) => state.courses);
  const { module } = useSelector((state) => state.courseModule);
  const { isLoading } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [video, setVideo] = useState({
    title: "",
    video: "",
  });

  const addVideoHandler = async (e) => {
    e.preventDefault();
    dispatch(addVideoStart());
    try {
      const formdata = new FormData();
      formdata.append("title", video?.title);
      formdata.append("video", video?.video);
      const response = await videoService.addVideoCourse(formdata, course?.id, module?._id);
      const moduleData = await courseModuleService.getOneModule(course?.id, module?._id);
      dispatch(addVideoSuccess(response.data));
      dispatch(getOneModuleSuccess(moduleData.data));
      const modules = await courseModuleService.getModules(course?.id);
      setOpen(false);
      lessonCountHandler(modules.data, course?.id);
      dispatch(getModulesSuccess(modules.data));
      toast.success("Video qo'shildi!");
    } catch (error) {
      console.log(error);
      dispatch(addVideoFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
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

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className={`${mode ? "bg-gray-200" : "bg-gray-800 text-white"}`}>
        <DialogHeader>
          <DialogTitle className={`text-center`}>Video Yuklash</DialogTitle>
          <form onSubmit={addVideoHandler}>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="title">Video nomi</label>
              <input
                type="text"
                name="title"
                id="title"
                value={video?.title}
                onChange={(e) => setVideo({ ...video, title: e.target.value })}
                placeholder="Video nomi"
                className={`w-full p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
                  mode ? "bg-white" : "bg-zinc-700"
                }`}
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="link">Video Yuklash</label>
              <input
                type="file"
                name="link"
                id="link"
                onChange={(e) => setVideo({ ...video, video: e.target.files[0] })}
                className={`w-full p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
                  mode ? "bg-white" : "bg-zinc-700"
                }`}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="mt-3 w-full h-[35px] bg-green-500 hover:bg-blue-600">
              {isLoading ? "Yuklanmoqda..." : "Qo'shish"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddVideoCourse;
