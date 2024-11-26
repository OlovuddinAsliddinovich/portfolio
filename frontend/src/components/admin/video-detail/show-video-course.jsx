import ListItemSkeleton from "@/components/skeletons/list.item.skeleton";
import { Button } from "@/components/ui/button";
import courseModuleService from "@/services/course-module-service";
import { courseService } from "@/services/course.service";
import videoService from "@/services/video.service";
import { getOneModuleSuccess } from "@/slice/course-module-slice";
import { getOneCourseFailure, getOneCourseStart, getOneCourseSuccess } from "@/slice/course-slice";
import { setMode } from "@/slice/mode-slice";
import { getOneVideoFailure, getOneVideoStart, getOneVideoSuccess, getVideosSuccess } from "@/slice/video-slice";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RxMoon } from "react-icons/rx";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowVideoCourse = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { module } = useSelector((state) => state.courseModule);
  const { video, isLoading } = useSelector((state) => state.videos);
  const { slug, id, videoId } = useParams();
  const [playId, setPlayId] = useState(videoId);

  const getOneCourse = async () => {
    dispatch(getOneCourseStart());
    try {
      const { data } = await courseService.getOneCourse(slug);
      const oneModule = await courseModuleService.getOneModule(data.id, id);
      dispatch(getOneCourseSuccess(data));
      dispatch(getOneModuleSuccess(oneModule.data));
      getVideo(data?.id, id, playId);
    } catch (error) {
      console.log(error);
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  const getVideo = async (courseId, moduleId, playId) => {
    dispatch(getOneVideoStart());
    try {
      const { data } = await videoService.getOneVideoCourse(courseId, moduleId, playId);
      dispatch(getOneVideoSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOneVideoFailure(error?.response?.data?.message));
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
    navigate(`/admin/courses/${slug}/course-module/${id}/videos/${itemId}`);
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getOneCourse();
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
        <div className={`md:w-[70%] xs:w-[60%] w-full h-[40%] xs:h-[70%] md:h-[80%] ${mode ? "bg-light" : "bg-gray-800"}`}>
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
          {isLoading ? (
            <div className="overflow-y-scroll h-full">
              {[...Array(12)].map((_, index) => (
                <div key={index}>
                  <ListItemSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {module?.videos?.map((item, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowVideoCourse;
