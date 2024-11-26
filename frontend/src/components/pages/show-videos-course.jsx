import { Button } from "@/components/ui/button";
import courseModuleService from "@/services/course-module-service";
import { courseService } from "@/services/course.service";
import videoService from "@/services/video.service";
import { getModulesSuccess } from "@/slice/course-module-slice";
import { getOneCourseFailure, getOneCourseSuccess } from "@/slice/course-slice";
import { setMode } from "@/slice/mode-slice";
import { getOneVideoFailure, getOneVideoStart, getOneVideoSuccess } from "@/slice/video-slice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layouts/navbar";
import { HiOutlineChatAlt } from "react-icons/hi";
import { CiTextAlignLeft } from "react-icons/ci";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import AddComment from "../layouts/add-comment";
import { toast } from "react-toastify";

const ShowVideosCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { course } = useSelector((state) => state.courses);
  const { modules } = useSelector((state) => state.courseModule);
  const { video, isLoading } = useSelector((state) => state.videos);
  const { slug, id, videoId } = useParams();
  const [playId, setPlayId] = useState(videoId);
  const [moduleId, setModuleId] = useState(id);
  const [commentModal, setCommentModal] = useState(false);

  const getCourse = async () => {
    try {
      const { data } = await courseService.getOneCourse(slug);
      dispatch(getOneCourseSuccess(data));
      const modules = await courseModuleService.getModules(data.id);
      dispatch(getModulesSuccess(modules?.data));
      getVideo(data?.id, moduleId, playId);
    } catch (error) {
      console.log(error);
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  const getVideo = async (courseId, moduleId, videoId) => {
    dispatch(getOneVideoStart());
    try {
      const { data } = await videoService.getOneVideoCourse(courseId, moduleId, videoId);
      dispatch(getOneVideoSuccess(data));
    } catch (error) {
      console.log(error);
      toast.success(error?.response?.data?.message);
      if (error?.response?.data?.message) {
        navigate("/");
      }
      dispatch(getOneVideoFailure(error?.response?.data?.message));
    }
  };

  const playHandler = (id) => {
    setPlayId(id);
    getVideo(course?.id, moduleId, id);
  };

  useEffect(() => {
    getCourse();
  }, [playId]);

  return (
    <div className={`${mode ? "bg-white text-gray-700" : "bg-slate text-light"} scroll-smooth`}>
      <div className="w-full h-[60px] flex items-center justify-between px-3">
        <div className="w-full flex items-center justify-between gap-1">
          <Navbar />
        </div>
      </div>
      <div className="md:hidden flex p-2">
        <Button
          className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
            mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"
          }`}
        >
          <CiTextAlignLeft />
        </Button>
        <Button
          onClick={() => dispatch(setMode(!mode))}
          className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
            mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"
          }`}
        >
          {mode ? <RxMoon /> : <IoSunnyOutline />}
        </Button>
        <Button
          className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
            mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"
          }`}
        >
          <HiOutlineChatAlt />
        </Button>
      </div>
      <div className={` flex items-start justify-start h-[calc(100vh-60px)] border-t border-gray-700 xs:flex-row flex-col gap-10 xs:gap-0`}>
        <div className={`md:w-[70%] xs:w-[60%] w-full xs:block h-[40%] xs:h-[70%] md:h-[80%] mb-3 ${mode ? "bg-light" : "bg-gray-800"}`}>
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
                playing={true}
              />
              <div className="h-[50px] flex items-center ">
                <h1 className="text-xl font-bold font-spaceGrotesk pl-4">{video?.title}</h1>
                <button
                  onClick={() => setCommentModal(true)}
                  className={`text-sm font-spaceGrotesk ml-4 bg-green-500 hover:bg-blue-500 transition-all p-1 rounded px-2 ${
                    mode ? "text-gray-800" : "text-white"
                  }`}
                >
                  Fikr bildirish
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className={`md:w-[30%] xs:w-[40%] w-full h-full overflow-y-scroll xs:border-none xs:pt-0pt-3 border-t ${mode ? "bg-white" : "bg-darkBlue"}`}
        >
          <Accordion type="single" collapsible className="mb-3">
            {isLoading ? (
              <div className="w-full flex items-center justify-center mt-[30px]">
                <Loader2 className="animate-spin w-[20px] h-[20px]" />
              </div>
            ) : (
              modules?.map((item, index) => (
                <AccordionItem key={index} value={`module-${index}`}>
                  <AccordionTrigger
                    onClick={() => setModuleId(item?._id)}
                    className={`${
                      moduleId === item?._id
                        ? mode
                          ? "bg-gray-300 text-gray-800" // Light mode uchun aktiv bo‘lsa
                          : "bg-gray-700 text-white" // Dark mode uchun aktiv bo‘lsa
                        : mode
                        ? "hover:bg-gray-200 text-black" // Light mode uchun hover holat
                        : "hover:bg-gray-700 text-white" // Dark mode uchun hover holat
                    } text-start`}
                  >
                    {item?.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      {item?.videos?.length > 0 ? (
                        item?.videos?.map((video, vIndex) => (
                          <div
                            key={vIndex}
                            onClick={() => playHandler(video._id)}
                            className={`cursor-pointer p-2 ${
                              playId === video._id ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            } ${mode ? "text-gray-800" : "text-white"}`}
                          >
                            # {video?.title}
                          </div>
                        ))
                      ) : (
                        <div className="w-full flex items-center justify-center">
                          <h1 className="text-xl font-spaceGrotesk">Video mavjud emas</h1>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </div>
      </div>
      {commentModal && <AddComment refModel={"Course"} refId={course?.id} setCommentModal={setCommentModal} />}
    </div>
  );
};

export default ShowVideosCourse;
