import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { getOneVideoFailure, getOneVideoStart, getOneVideoSuccess } from "@/slice/video-slice";
import videoService from "@/services/video.service";
import { useEffect } from "react";
import { IMG_URL } from "@/services";
import { toast } from "react-toastify";
import { projectService } from "@/services/project.service";
import { getOneProjectSuccess } from "@/slice/project.slice";

const EditVideoProject = ({ editVideoOpen, setEditVideoOpen, videoId }) => {
  const { mode } = useSelector((state) => state.mode);
  const { project } = useSelector((state) => state.projects);
  const { video, isLoading } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    video: "",
  });

  const getVideoHandler = async () => {
    dispatch(getOneVideoStart());
    setLoading(true);
    try {
      const { data } = await videoService.getOneVideoProject(project?.id, videoId);
      dispatch(getOneVideoSuccess(data));
      setVideoData(data);
    } catch (error) {
      console.log(error);
      dispatch(getOneVideoFailure(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const editVideoHandler = async (e) => {
    e.preventDefault();
    dispatch(getOneVideoStart());
    try {
      const formdata = new FormData();
      formdata.append("title", videoData?.title);
      formdata.append("video", videoData?.video);
      const response = await videoService.updateProject(formdata, project?.id, videoId);
      const projectData = await projectService.getOneProject(project?.slug);
      dispatch(getOneProjectSuccess(projectData?.data));
      dispatch(getOneVideoSuccess(response.data));
      toast.success("Video tahrirlandi!");
      setEditVideoOpen(false);
    } catch (error) {
      console.log(error);
      dispatch(getOneVideoFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getVideoHandler();
  }, []);

  return (
    <Dialog open={editVideoOpen} onOpenChange={() => setEditVideoOpen(false)}>
      <DialogContent className={`${mode ? "bg-gray-200" : "bg-gray-800 text-white"}`}>
        {loading ? (
          <DialogTitle>
            {" "}
            <p>Loading...</p>
          </DialogTitle>
        ) : (
          <DialogHeader>
            <DialogTitle className={`text-center`}>Videoni Tahrirlash</DialogTitle>
            <form onSubmit={editVideoHandler}>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="title">Video nomi</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={videoData?.title}
                  onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                  placeholder="Video nomi"
                  className={`w-full p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
                    mode ? "bg-white" : "bg-zinc-700"
                  }`}
                />
              </div>
              <div className="mt-3 mb-2">
                <label htmlFor="vid">Video fayl</label>
                <video src={`${IMG_URL}/course-videos/${video?.url}`} id="vid" className={`w-[200px] h-[100px] border`} controls></video>
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="link">Video Yuklash</label>
                <input
                  type="file"
                  name="link"
                  id="link"
                  onChange={(e) => setVideoData({ ...videoData, video: e.target.files[0] })}
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditVideoProject;
