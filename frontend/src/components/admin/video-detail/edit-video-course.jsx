import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IMG_URL } from "@/services";
import courseModuleService from "@/services/course-module-service";
import videoService from "@/services/video.service";
import { getOneModuleSuccess } from "@/slice/course-module-slice";
import { editVideFailure, editVideoSuccess, getOneVideoFailure, getOneVideoStart, getOneVideoSuccess } from "@/slice/video-slice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditVideoCourse = ({ editModal, setEditModal, videoId }) => {
  const { mode } = useSelector((state) => state.mode);
  const { video, isLoading } = useSelector((state) => state.videos);
  const { course } = useSelector((state) => state.courses);
  const { module } = useSelector((state) => state.courseModule);
  const dispatch = useDispatch();

  const [videoDetail, setVideoDetail] = useState({
    title: "",
    url: "",
  });

  const getVideo = async () => {
    dispatch(getOneVideoStart());
    try {
      const { data } = await videoService.getOneVideoCourse(course?.id, module?._id, videoId);
      setVideoDetail(data);
      dispatch(getOneVideoSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOneVideoFailure(error?.response?.data?.message));
    }
  };
  const editVideoHandler = async (e) => {
    e.preventDefault();
    dispatch(getOneVideoStart());
    try {
      const formdata = new FormData();
      formdata.append("title", videoDetail?.title);
      formdata.append("video", videoDetail?.url);
      const response = await videoService.updateVideoCourse(formdata, course?.id, module?._id, videoId);
      const modules = await courseModuleService.getOneModule(course?.id, module?._id);
      dispatch(editVideoSuccess(response.data));
      dispatch(getOneVideoSuccess(response.data));
      dispatch(getOneModuleSuccess(modules.data));
      toast.success("Video tahrirlandi!");
      setEditModal(false);
    } catch (error) {
      console.log(error);
      dispatch(editVideFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <Dialog open={editModal} onOpenChange={() => setEditModal(false)}>
      <DialogContent className={`${mode ? "bg-gray-200" : "bg-gray-800 text-white"}`}>
        <DialogHeader>
          <DialogTitle className={`text-center`}>Video Tahrirlash</DialogTitle>
          {isLoading ? (
            <div className="pt-6">
              <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            </div>
          ) : (
            <form onSubmit={editVideoHandler}>
              <div className="flex flex-col gap-1 mt-3 text-start">
                <label htmlFor="title">Video nomi</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={videoDetail?.title}
                  onChange={(e) => setVideoDetail({ ...video, title: e.target.value })}
                  placeholder="Video nomi"
                  className={`w-full p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
                    mode ? "bg-white" : "bg-zinc-700"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-1 mt-3 text-start">
                <label htmlFor="link"> Yuklangan Video</label>
                <video src={`${IMG_URL}/course-videos/${videoDetail?.url}`} controls className="w-[300px] h-[200px] border"></video>
                <label htmlFor="link">Video Yuklash</label>
                <input
                  type="file"
                  name="link"
                  id="link"
                  value={videoDetail?.video}
                  onChange={(e) => setVideoDetail({ ...video, url: e.target.files[0] })}
                  className={`w-full p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
                    mode ? "bg-white" : "bg-zinc-700"
                  }`}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="mt-3 w-full h-[35px] bg-green-500 hover:bg-blue-600">
                {isLoading ? "Loading..." : "Yangilash"}
              </Button>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditVideoCourse;
