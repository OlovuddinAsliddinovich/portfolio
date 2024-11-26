import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { addVideoFailure, addVideoStart, addVideoSuccess } from "@/slice/video-slice";
import videoService from "@/services/video.service";
import { toast } from "react-toastify";
import { projectService } from "@/services/project.service";

const AddVideoProject = ({ addVideoOpen, setAddVideoOpen, lessonCountHandler }) => {
  const { mode } = useSelector((state) => state.mode);
  const { project } = useSelector((state) => state.projects);
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
      const response = await videoService.addVideoProject(formdata, project?.id);
      const pr = await projectService.getOneProject(project?.slug);
      lessonCountHandler(pr.data, pr?.data?.id);
      dispatch(addVideoSuccess(response.data));
      setVideo({ title: "", video: "" });
      setAddVideoOpen(false);
      toast.success("Video qo'shildi!");
    } catch (error) {
      console.log(error);
      dispatch(addVideoFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Dialog open={addVideoOpen} onOpenChange={() => setAddVideoOpen(false)}>
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

export default AddVideoProject;
