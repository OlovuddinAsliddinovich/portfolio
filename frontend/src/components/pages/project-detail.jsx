import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/layout";
import { BsFillCameraVideoFill, BsFillStarFill, BsPatchCheck } from "react-icons/bs";
import { ImStarHalf } from "react-icons/im";
import { LiaSignInAltSolid } from "react-icons/lia";
import { HiMiniStar } from "react-icons/hi2";
import { Button } from "../ui/button";
import { BiMessageDetail } from "react-icons/bi";
import { TooltipDemo } from "../layouts/tooltip-demo";
import { CarouselSize } from "../layouts/project-carousel";
import { useParams } from "react-router-dom";
import { projectService } from "@/services/project.service";
import { getOneProjectFailure, getOneProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { secondsToMinutes } from "@/hooks";
import { IMG_URL } from "@/services";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Comments from "../layouts/comments";
import moment from "moment";
import CourseDetailSkeleton from "../skeletons/course.detail.skeleton";
import { Helmet } from "react-helmet";

const ProjectDetail = () => {
  const { mode } = useSelector((state) => state.mode);
  const { projects, project, isLoading } = useSelector((state) => state.projects);
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const getProject = async () => {
    dispatch(getProjectsStart());
    try {
      const projects = await projectService.getProjects();
      dispatch(getProjectsSuccess(projects?.data));
      const response = await projectService.getOneProject(slug);
      response?.data?.comments?.forEach((comment) => setRating((prev) => prev + comment.rating));
      setComments(response?.data?.comments);
      dispatch(getOneProjectSuccess(response?.data));
    } catch (error) {
      console.log(error);
      toast.success(error?.response?.data?.message);
      if (error?.response?.data?.message) {
        navigate("/");
      }
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  const enrollProject = async () => {
    setLoading(true);
    try {
      if (project?.videos?.length > 0) {
        const response = await projectService.enrollProject(project?.id);
        toast.success(response?.data?.message);
        getProject();
        navigate(`/projects/${slug}/videos/${project?.videos[0]?._id}`);
      } else {
        toast.info("Bu loyihada hali ma'lumot mavjud emas!", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        navigate("/sign-in");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{project?.title}</title>
        <meta name="description" content="Loyiha haqida ma'lumot" />
      </Helmet>
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Loyihalar</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isLoading ? (
        <div>
          <CourseDetailSkeleton />
        </div>
      ) : (
        <>
          <section
            className={`flex justify-between items-center flex-col-reverse md2:flex-row lg:flex-col-reverse xl:flex-row sm:p-8 p-3 mt-[40px] ${
              mode ? "bg-gray-200" : "bg-gray-800"
            }`}
          >
            <div className="md2:w-[60%] w-full lg:w-full flex flex-col justify-between items-start gap-2">
              <h1 className="text-xl xs:text-3xl font-bold font-montserrat mt-4">{project?.title}</h1>
              <p className={`text-[12px] leading-4 font-montserrat pr-4 text-start ${mode ? "text-gray-800" : "text-gray-400"}`}>
                {project?.description}
              </p>
              <div className="flex xl:items-center items-start justify-start gap-4 mt-[20px] text-[14px] flex-col xl:flex-row">
                <p className="text-blue-400">
                  Davomiylik: <span className="text-blue-400 font-bold">{project?.duration} daqiqa</span>
                </p>
                <p className="text-blue-400">
                  Darslar soni: <span className="text-blue-400 font-bold">{project?.lesson_count}</span>
                </p>
              </div>
            </div>
            <div className="md2:w-[400px] w-full  lg:w-full h-[230px]">
              <img src={`${IMG_URL}/course-images/${project?.image}`} alt="Img" className="w-full h-[230px] rounded-sm object-cover" />
            </div>
          </section>
          <section className="mt-10 flex justify-between gap-8 flex-col lg:flex-row">
            <div className={`${mode ? "bg-gray-200" : "bg-gray-800"} p-8 xl:w-3/5 w-full`}>
              <h1 className="text-2xl font-semibold font-spaceGrotesk">Kursda nimalarni o'rganasiz</h1>
              <ul className="grid grid-cols-2 gap-2 mt-4">
                {project?.technologies?.map((item) => (
                  <li key={item} className="flex items-center justify-start gap-3 text-[14px] font-montserrat">
                    <BsPatchCheck className="text-blue-500 font-bold min-w-[25px] text-[20px]" /> <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/5 shadow-[inset_0px_0px_15px_8px_rgba(89,190,251,1)] rounded-sm flex flex-col p-8 h-[250px]">
              <h2 className="text-[25px] font-montserrat">Kurs narxi</h2>
              <h1 className="text-2xl font-bold font-spaceGrotesk">
                {project?.priceCategory} <span className="line-through text-muted-foreground text-[16px] font-normal">250.000 UZS</span>
              </h1>
              <h2 className={`flex items-center justify-start font-bold text-orange-500`}>
                {project?.rating}
                <HiMiniStar className="ml-2" />
                <HiMiniStar className="" />
                <HiMiniStar className="" />
                <HiMiniStar className="" />
                <ImStarHalf className="" />
                <span className={`${mode ? "text-gray-700" : "text-gray-200"} ml-3`}>({project?.lesson_count})</span>{" "}
                <span className={`${mode ? "text-gray-700" : "text-gray-200"} font-spaceGrotesk font-normal ml-3`}>
                  {project?.students.length} o'quvchi
                </span>
              </h2>
              <hr className="w-full border-gray-700 my-4" />
              <Button
                type="button"
                disabled={loading}
                onClick={enrollProject}
                className={`w-full text-md flex gap-3 bg-green-500 hover:bg-blue-600 rounded-sm`}
              >
                {loading ? "Loading..." : "Kirish"} <LiaSignInAltSolid className="text-lg" />
              </Button>
            </div>
          </section>
          {/* Course contents */}
          <section className="mt-10 flex gap-8 justify-between items-center">
            <div className={`${mode ? "bg-gray-200 text-gray-600" : "bg-gray-800"} p-8 lg:w-3/5 w-full`}>
              <div>
                <h1 className="text-3xl font-bold font-montserrat">Kurs kontenti</h1>
                <div>
                  {project?.videos?.map((video) => (
                    <div
                      key={video?._id}
                      className="flex border-b hover:text-gray-400 border-gray-700 justify-between items-center py-3 cursor-pointer font-montserrat"
                    >
                      <div className="flex items-center gap-2 transition-all duration-100">
                        <BsFillCameraVideoFill />
                        <span># {video?.title}</span>
                      </div>
                      <div>{secondsToMinutes(video?.duration)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-2/5 hidden"></div>
          </section>

          <section className="mt-10 flex gap-8 justify-between items-center">
            <div className="lg:w-3/5 w-full">
              <div className="flex items-center font-semibold text-xl justify-between pb-6">
                <h2 className="flex items-center">
                  <BsFillStarFill className="text-orange-500" />
                  <span className="mr-2 ml-1">{rating > 0 ? rating / project?.comments?.length : 0} Loyiha baholari:</span> &bull;{" "}
                  <span className="ml-2">{project?.comments?.length}</span>
                </h2>
                <TooltipDemo setCommentModal={setCommentModal} mode={mode} BiMessageDetail={BiMessageDetail} />
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-4 gap-1">
                {!project?.comments?.length ? (
                  <div className="text-center font-montserrat">Kursda sharhlar mavjud emas</div>
                ) : (
                  project.comments
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Saralash
                    .slice(0, 4)
                    .map((item) => (
                      <div className="border-t overflow-hidden h-[150px] pt-[20px] border-gray-600 mt-3" key={`comment-${item?._id}`}>
                        <div className="flex gap-2 items-center font-montserrat">
                          {item?.user?.image ? (
                            <img src={`${IMG_URL}/${item?.user?.image}`} alt="Img" className="w-[50px] h-[50px] rounded-full" />
                          ) : (
                            <h1 className="text-2xl bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full">
                              {item.user?.firstname[0]?.toUpperCase() + item.user?.lastname[0]?.toUpperCase()}
                            </h1>
                          )}
                          <div>
                            <h3>{item?.user?.firstname + " " + item?.user?.lastname}</h3>
                            <p>
                              <span className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={index < item?.rating ? "gold" : "none"} // Yulduz rangi
                                    stroke={index < item?.rating ? "gold" : "gray"} // Yulduz chekkasi
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                  </svg>
                                ))}
                              </span>
                              <span className="text-muted-foreground text-[13px] font-bold">
                                {moment(item?.createdAt).format("DD MMM YYYY HH:mm")}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-[14px]">{item?.text}</p>
                      </div>
                    ))
                )}
              </div>
              {commentModal && <Comments data={comments} setCommentModal={setCommentModal} />}
            </div>
            <div className="lg:w-2/5 hidden"></div>
          </section>
          <section>
            <CarouselSize projects={projects} />
          </section>
        </>
      )}
    </Layout>
  );
};

export default ProjectDetail;
