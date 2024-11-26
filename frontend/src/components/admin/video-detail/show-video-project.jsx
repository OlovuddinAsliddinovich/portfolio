import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import { useEffect } from "react";
import videoService from "@/services/video.service";
import { getOneVideoStart, getOneVideoSuccess, getVideosSuccess } from "@/slice/video-slice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setMode } from "@/slice/mode-slice";
import { RxMoon } from "react-icons/rx";
import { IoSunnyOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";

const ShowVideoProject = () => {
  const { slug, videoId } = useParams();
  const { mode } = useSelector((state) => state.mode);
  const { video, videos, isLoading } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [playId, setPlayId] = useState(videoId);
  const navigate = useNavigate();
  const getOneProject = async () => {
    dispatch(getProjectsStart());
    dispatch(getOneVideoStart());
    try {
      const projects = await projectService.getProjects();
      dispatch(getProjectsSuccess(projects?.data));
      const { data } = await projectService.getOneProject(slug);
      const videoData = await videoService.getOneVideoProject(data?.id, videoId);
      dispatch(getOneProjectSuccess(data));
      dispatch(getVideosSuccess(data?.videos));
      dispatch(getOneVideoSuccess(videoData?.data));
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  const logoutHandler = () => {
    try {
      Cookies.remove("adminToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const playHandler = (itemId) => {
    setPlayId(itemId);
    navigate(`/admin/projects/${slug}/videos/${itemId}`);
  };

  useEffect(() => {
    getOneProject();
  }, [playId]);

  return (
    <div className={`${mode ? "bg-white text-gray-700" : "bg-slate text-light"} scroll-smooth`}>
      <div className="w-full h-[60px] flex items-center justify-between px-3 xl:px-[100px]">
        <Link to={"/admin-panel"}>
          <h1
            className="text-[30px] bg-[url('/img.jpg')] bg-no-repeat bg-clip-text text-transparent bg-cover 
       font-bold"
          >
            Admin Panel
          </h1>
        </Link>
        <div className="flex items-center justify-between gap-1 group">
          <Button
            onClick={() => dispatch(setMode(!mode))}
            className={`text-[20px] ${mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"}`}
          >
            {mode ? <RxMoon /> : <IoSunnyOutline className="text-[20px]" />}
          </Button>
          <Button
            onClick={() => logoutHandler()}
            className={`text-[16px] w-[40px] hover:text-red-600 relative flex items-center justify-center gap-2 p-1 rounded-sm cursor-pointer bg-darkblue ${
              mode ? "text-black hover:bg-gray-200" : "text-white"
            }`}
          >
            <LuLogOut className="w-[20px] h-[30px]" title="Logout" />
          </Button>
        </div>
      </div>
      <div className={` flex items-start justify-start h-[calc(100vh-60px)] border-t border-gray-700 xs:flex-row flex-col gap-10 xs:gap-0`}>
        <div className={`md:w-[70%] xs:w-[60%] w-full h-[40%] xs:h-[70%] md:h-[80%] ${mode ? "bg-white" : "bg-gray-800"}`}>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-[url('https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg')] bg-no-repeat bg-cover">
              <Loader2 className="animate-spin w-[100px] h-[100px]" />
            </div>
          ) : (
            <>
              <ReactPlayer
                url={`http://localhost:5000/course-videos/${video?.url}`}
                width={"100%"}
                height={"100%"}
                style={{ padding: "0px" }}
                controls={true}
              />
              <h1 className="text-2xl font-bold font-spaceGrotesk h-[40px] pl-4 pt-2 xs:pt-0">{video?.title}</h1>
            </>
          )}
        </div>
        <div className={`md:w-[30%] xs:w-[40%] w-full h-full xs:border-none xs:pt-0pt-3 border-t ${mode ? "bg-white" : "bg-darkBlue"}`}>
          {videos?.map((item, index) => (
            <div
              key={index}
              onClick={() => playHandler(item?._id)}
              className={`${
                videoId === item?._id ? "bg-blue-500" : mode ? "bg-white hover:bg-gray-200" : "bg-gray-900 hover:bg-gray-700"
              } flex items-center justify-between gap-2 p-2 cursor-pointer ${index !== 0 ? "border-t border-gray-600" : ""}`}
            >
              <p>
                {index + 1}. {item?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowVideoProject;
