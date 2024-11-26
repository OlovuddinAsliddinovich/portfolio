import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/layout";
import { BsFillStarFill, BsPatchCheck } from "react-icons/bs";
import { ImStarHalf } from "react-icons/im";
import { LiaSignInAltSolid } from "react-icons/lia";
import { HiMiniStar } from "react-icons/hi2";
import { Button } from "../ui/button";
import { TbListNumbers } from "react-icons/tb";
import { LuMonitorPlay } from "react-icons/lu";
import { GrPlan } from "react-icons/gr";
import { AccordionDemo } from "../layouts/accordion-content";
import { BiMessageDetail } from "react-icons/bi";
import { TooltipDemo } from "../layouts/tooltip-demo";
import { CarouselSize } from "../layouts/carousel-detail";
import { useNavigate, useParams } from "react-router-dom";
import { getCoursesSuccess, getOneCourseFailure, getOneCourseStart, getOneCourseSuccess } from "@/slice/course-slice";
import { courseService } from "@/services/course.service";
import { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { IMG_URL } from "@/services";
import { getModulesFailure, getModulesStart, getModulesSuccess } from "@/slice/course-module-slice";
import courseModuleService from "@/services/course-module-service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import Comments from "../layouts/comments";
import CourseDetailSkeleton from "../skeletons/course.detail.skeleton";

const CourseDetail = () => {
  const { mode } = useSelector((state) => state.mode);
  const { slug } = useParams();
  const { course, courses, isLoading } = useSelector((state) => state.courses);
  const { modules } = useSelector((state) => state.courseModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentModal, setCommentModal] = useState(false);

  const getOneCourse = async (slug) => {
    dispatch(getOneCourseStart());
    try {
      const courses = await courseService.getCourses();
      dispatch(getCoursesSuccess(courses.data));
      const { data } = await courseService.getOneCourse(slug);
      data?.comments?.forEach((comment) => setRating((prev) => prev + comment.rating));
      setComments(data?.comments);
      getModules(data.id);
      dispatch(getOneCourseSuccess(data));
    } catch (error) {
      console.log(error);
      toast.success(error?.response?.data?.message);
      if (error?.response?.data?.message) {
        navigate("/");
      }
      dispatch(getOneCourseFailure(error?.response?.data?.message));
    }
  };

  const getModules = async (id) => {
    dispatch(getModulesStart());
    try {
      const { data } = await courseModuleService.getModules(id);
      dispatch(getModulesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getModulesFailure(error?.response?.data?.message));
    }
  };

  const enrollCourse = async (id) => {
    try {
      if (modules.length > 0) {
        const { data } = await courseService.enrollCourse(id);
        toast.success(data.message, { position: "top-center" });
        return navigate(`/courses/${slug}/modules/${modules[0]?._id}/videos/${modules[0]?.videos[0]?._id}`);
      } else {
        toast.info("Bu kursda hali ma'lumot mavjud emas!", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      if (error?.response?.status === 401) {
        navigate("/sign-in");
      }
    }
  };

  useEffect(() => {
    getOneCourse(slug);
  }, [slug]);

  const courseContent = [
    {
      id: 1,
      title: "Modullar soni",
      icon: <TbListNumbers className="text-5xl" />,
      count: course?.modules?.length,
    },
    {
      id: 2,
      title: "Darslar soni",
      icon: <LuMonitorPlay className="text-5xl" />,
      count: course?.lesson_count,
    },
    {
      id: 3,
      title: "Kurs davomiyligi",
      icon: <GrPlan className="text-5xl" />,
      count: course?.duration,
    },
  ];

  return (
    <Layout>
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses" className="hover:text-gray-400">
                Kurslar
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-400">{course?.title}</BreadcrumbPage>
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
              <h1 className="text-xl xs:text-3xl font-bold font-montserrat mt-4">Murakkab Backend</h1>
              <p className={`text-[12px] leading-4 font-montserrat pr-4 text-start ${mode ? "text-gray-800" : "text-gray-400"}`}>
                {course?.description}
              </p>
              <div className="flex xl:items-center items-start justify-start gap-4 mt-[20px] text-[14px] flex-col xl:flex-row">
                <p className="text-blue-400">
                  Davomiylik: <span className="text-blue-400 font-bold">{course?.duration}</span>
                </p>
                <p className="text-blue-400">
                  Darslar soni: <span className="text-blue-400 font-bold">{course?.lesson_count} ta</span>
                </p>
              </div>
            </div>
            <div className="md2:w-[400px] w-full  lg:w-full h-[230px]">
              <img src={`${IMG_URL}/course-images/${course?.image}`} alt="Img" className="w-full h-[230px] rounded-sm object-cover" />
            </div>
          </section>
          <section className="mt-10 flex justify-between gap-8 flex-col lg:flex-row">
            <div className={`${mode ? "bg-gray-200" : "bg-gray-800"} p-8 xl:w-3/5 w-full`}>
              <h1 className="text-2xl font-semibold font-spaceGrotesk">Kursda nimalarni o'rganasiz</h1>
              <ul className="grid grid-cols-2 gap-2 mt-4">
                {course?.technologies.map((item, idx) => (
                  <li key={`${idx}item`} className="flex items-center justify-start gap-3 text-[14px] font-montserrat">
                    <BsPatchCheck className="text-blue-500 font-bold min-w-[25px] text-[20px]" /> <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/5 shadow-[inset_0px_0px_15px_8px_rgba(89,190,251,1)] rounded-sm flex flex-col p-8 h-[250px]">
              <h2 className="text-[25px] font-montserrat">Kurs narxi</h2>
              <h1 className="text-2xl font-bold font-spaceGrotesk">
                {course?.priceCategory} <span className="line-through text-muted-foreground text-[16px] font-normal">250.000 UZS</span>
              </h1>
              <h2 className={`flex items-center justify-start font-bold text-orange-500`}>
                {course?.rating}
                <HiMiniStar className="ml-2" />
                <HiMiniStar className="" />
                <HiMiniStar className="" />
                <HiMiniStar className="" />
                <ImStarHalf className="" />
                <span className={`${mode ? "text-gray-700" : "text-gray-200"} ml-3`}>({course?.lesson_count})</span>{" "}
                <span className={`${mode ? "text-gray-700" : "text-gray-200"} font-spaceGrotesk font-normal ml-3`}>
                  {course?.students?.length} o'quvchi
                </span>
              </h2>
              <hr className="w-full border-gray-700 my-4" />
              <Button onClick={() => enrollCourse(course?.id)} className={`w-full text-md flex gap-3 bg-green-500 hover:bg-blue-600 rounded-sm`}>
                Kirish <LiaSignInAltSolid className="text-lg" />
              </Button>
            </div>
          </section>
          {/* Course contents */}
          <section className="mt-10 flex gap-8 justify-between items-center">
            <div className={`${mode ? "bg-gray-200 text-gray-600" : "bg-gray-800"} p-8 lg:w-3/5 w-full`}>
              <div>
                <h1 className="text-3xl font-bold font-montserrat">Kurs kontenti</h1>
                <div>
                  <div className="flex justify-between items-center mt-4">
                    {courseContent.map((item) => (
                      <div key={item.id} className="flex flex-col gap-1">
                        {item.icon} <h2 className="text-xl font-semibold font-montserrat">{item.title}</h2>
                        <h1 className="text-2xl font-semibold">{item.count}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="w-full border-gray-700 my-5" />
              <div>
                <AccordionDemo modules={modules} />
              </div>
            </div>
            <div className="lg:w-2/5 hidden"></div>
          </section>

          <section className="mt-10 flex gap-8 justify-between items-center">
            <div className="lg:w-3/5 w-full">
              <div className="flex items-center font-semibold text-xl justify-between pb-6">
                <h2 className="flex items-center">
                  <BsFillStarFill className="text-orange-500" />
                  <span className="mr-2 ml-1">{rating > 0 ? rating / course?.comments?.length : 0} Kurs baholari:</span> &bull;{" "}
                  <span className="ml-2">{course?.comment_count} ta sharh</span>
                </h2>
                <TooltipDemo mode={mode} BiMessageDetail={BiMessageDetail} setCommentModal={setCommentModal} />
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-4 gap-1">
                {course?.comments
                  ?.slice()
                  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  ?.slice(0, 4)
                  .map((item) => (
                    <div className="border-t overflow-hidden h-[150px] pt-[20px] border-gray-600 mt-3" key={item._id}>
                      <div className="flex gap-2 items-center font-montserrat">
                        {item?.user?.image ? (
                          <img src={`${IMG_URL}/${item?.user?.image}`} alt="Img" className="w-[50px] h-[50px] rounded-full" />
                        ) : (
                          <h1 className="text-2xl bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full">
                            {item.user?.firstname.charAt(0).toUpperCase() + item.user?.lastname.charAt(0).toUpperCase()}
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
                                  fill={index < item.rating ? "gold" : "none"} // Sariq yoki bo'sh
                                  stroke={index < item.rating ? "gold" : "gray"} // Chekka rangi
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
                            <span className="text-muted-foreground text-[13px] font-bold">{moment(item.createdAt).format("DD MMM YYYY HH:mm")}</span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[14px]">{item.text}</p>
                    </div>
                  ))}
              </div>
              {commentModal && <Comments data={comments} setCommentModal={setCommentModal} />}
            </div>
            <div className="lg:w-2/5 hidden"></div>
          </section>
          <section>
            <CarouselSize courses={courses} />
          </section>
        </>
      )}
    </Layout>
  );
};

export default CourseDetail;
