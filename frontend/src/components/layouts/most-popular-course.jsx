import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle } from "../ui/card";
import PointerRoute from "./pointer-route";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "@/slice/course-slice";
import { courseService } from "@/services/course.service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IMG_URL } from "@/services";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../skeletons/card.skeleton";

const MostPopularCourse = ({ mode }) => {
  const { courses, isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCourses = async () => {
    dispatch(getCoursesStart());
    try {
      const { data } = await courseService.getCourses();
      dispatch(getCoursesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getCoursesFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={`${mode ? "bg-white" : "bg-darkBlue"} font-montserrat`}>
      <PointerRoute text={"Mashhur kurslar"} />
      {isLoading ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {courses?.slice(0, 4)?.map((course) => (
            <Card
              onClick={() => navigate(`/courses/${course?.slug}`)}
              className={`${mode ? "bg-light text-gray-700 border" : "bg-gray-800 text-white border-gray-800"} rounded-sm cursor-pointer`}
              key={course?._id}
            >
              <img src={`${IMG_URL}/course-images/${course?.image}`} alt={course?.title} className="h-[180px] border w-full md:object-cover" />
              <CardTitle className={`rounded-none p-3 tracking-[.1px] text-[18px] font-semibold`}>{course?.title}</CardTitle>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostPopularCourse;
