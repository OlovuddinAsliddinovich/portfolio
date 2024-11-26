import { useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import { IoSearch } from "react-icons/io5";
import { ComboboxDemo } from "../ui/combobox";
import CourseCard from "../layouts/course-card";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "@/slice/course-slice";
import { toast } from "react-toastify";
import { courseService } from "@/services/course.service";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import CardSkeleton from "../skeletons/card.skeleton";
import CourseCardSkeleton from "../skeletons/course.card.skeleton";
import { Helmet } from "react-helmet";

const Courses = () => {
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const { courses, isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced qiymat
  const [select, setSelect] = useState();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm); // Kechikish bilan qiymatni o‘zgartirish
    }, 500); // 500ms kechikish

    return () => {
      clearTimeout(handler); // Har o‘zgarishda avvalgi timeoutni tozalash
    };
  }, [searchTerm]);

  useEffect(() => {
    let tempCourses = courses.filter((course) => course.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

    if (select === "yangi") {
      tempCourses = tempCourses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Eng eski oldin
    } else if (select === "oldingi") {
      tempCourses = tempCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Eng yangi oldin
    } else if (select === "mashxur") {
      tempCourses = tempCourses.sort((a, b) => b.rating - a.rating); // Mashhur bo‘yicha
    }

    setFilteredCourses(tempCourses); // Filterlangan va tartiblangan kurslarni saqlash
  }, [debouncedSearch, select, courses]);

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
    <Layout>
      <Helmet>
        <title>Kurslar</title>
        <meta
          name="description"
          content="Onlayn dasturlash kurslari: JavaScript, React, va boshqa texnologiyalarni o'rganing. Har bir kurs interaktiv va amaliy misollar bilan to'ldirilgan. Tezkor bilim olish va yangi ko'nikmalarni rivojlantirish uchun bizning platformamizni tanlang."
        />
      </Helmet>
      <header className="flex justify-between items-start xl:items-center gap-2 flex-col xl:flex-row">
        <div className="xl:text-2xl md:text-xl font-bold font-spaceGrotesk flex gap-2">
          <h2 className="text-blue-500">Kurslar</h2>/
          <h2 className="underline hover:text-blue-200 cursor-pointer" onClick={() => navigate("/projects")}>
            Loyihalar
          </h2>
        </div>
        <div className="flex justify-between items-center gap-2 w-full md:w-auto flex-col xs:flex-row">
          <div className="relative flex items-center justify-start w-full">
            <input
              type="text"
              placeholder="Qidirish"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border-none focus:outline-none h-[35px] pl-4 w-full ${mode ? "bg-gray-100" : "bg-gray-800"} pr-10`}
            />
            <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" cursor={"pointer"} />
          </div>
          <div className="relative w-full">
            <ComboboxDemo setSelect={setSelect} />
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="mt-4 grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <CourseCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => <CourseCard key={course?._id} {...course} />)
          ) : (
            <div className="flex justify-start items-center mt-4">
              <p className="font-semibold">Kurslar topilmadi</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Courses;
