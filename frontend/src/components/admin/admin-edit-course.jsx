import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../admin-ui/input";
import ImgInput from "../admin-ui/img-input";
import { Button } from "../ui/button";
import { getCoursesSuccess, setCourseFailure, setCourseStart } from "@/slice/course-slice";
import { courseService } from "@/services/course.service";
import { toast } from "react-toastify";
import Textarea from "../admin-ui/textarea";
import { IMG_URL } from "@/services";

const AdminEditCourse = ({ isEditOpen, setIsEditOpen }) => {
  const { mode } = useSelector((state) => state.mode);
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [coursesData, setCoursesData] = useState({
    title: course?.title,
    description: course?.description,
    image: course?.image,
    price: course?.price,
    directionCategory: course?.directionCategory,
    ratingCategory: course?.ratingCategory,
    priceCategory: course?.priceCategory,
    technologies: course?.technologies.toString(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setCourseStart());
    try {
      const formData = new FormData();
      const technologiesArray = coursesData.technologies.split(",").map((tech) => tech.trim());

      formData.append("title", coursesData.title);
      formData.append("description", coursesData.description);
      formData.append("image", coursesData.image);
      formData.append("price", coursesData.price);
      formData.append("directionCategory", coursesData.directionCategory);
      formData.append("ratingCategory", coursesData.ratingCategory);
      formData.append("priceCategory", coursesData.priceCategory);
      technologiesArray.forEach((tech) => formData.append("technologies", tech.trim()));
      const response = await courseService.updateCourse(formData, course._id);
      if (!response.data) return;
      setIsEditOpen(!isEditOpen);
      const { data } = await courseService.getCourses();
      dispatch(getCoursesSuccess(data));
      toast.success("Course added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      dispatch(setCourseFailure(error?.response?.data?.message));
    }
  };
  return (
    <div className="w-full fixed top-0 right-0 bg-[rgba(0,0,0,0.7)] z-40" onClick={() => setIsEditOpen(!isEditOpen)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:w-[50%] animate-right ml-auto border-l border-gray-700  h-[100vh] relative overflow-y-scroll ${
          mode ? "bg-light" : "bg-darkBlue"
        }`}
      >
        <span
          onClick={() => setIsEditOpen(!isEditOpen)}
          className="border border-gray-700 hover:bg-red-600 transition-all h-[20px] w-[20px] pb-1 flex items-center justify-center  rounded-sm absolute top-3 right-3 cursor-pointer z-20 "
        >
          &times;
        </span>
        <div className="p-2 px-4 w-full h-full">
          <h1 className="text-[30px] font-bold text-center mb-2">Edit Course</h1>
          <form onSubmit={handleSubmit} className="overflow-y-scroll">
            <Input title={"Kurs nomi"} state={coursesData.title} setState={setCoursesData} name={"title"} />
            <Textarea title={"Kurs haqida"} state={coursesData.description} setState={setCoursesData} name={"description"} />
            <div className="w-[100px] h-[100px] mt-3">
              <img src={`${IMG_URL}/course-images/${course?.image}`} className="w-full h-full object-cover" alt="Img" />
            </div>
            <ImgInput title={"Kurs rasmi"} type={"file"} state={coursesData.image} setState={setCoursesData} name={"image"} />
            <Input title={"Kurs narxi"} state={coursesData.price} setState={setCoursesData} name={"price"} />

            <Input title={"Tehnologiyalar"} state={coursesData.technologies} setState={setCoursesData} name={"technologies"} />

            <div className="my-2">
              <label htmlFor="narxi">Kurs statusi</label>
              <select
                id="narxi"
                className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
                value={coursesData?.priceCategory}
                onChange={(e) =>
                  setCoursesData({
                    ...coursesData,
                    priceCategory: e.target.value,
                  })
                }
              >
                <option value="Bepul">Bepul</option>
                <option value="Pullik">Pullik</option>
              </select>
            </div>
            <div className="my-2">
              <label htmlFor="narxi">Yo'nalish</label>
              <select
                id="narxi"
                className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
                value={coursesData?.directionCategory}
                onChange={(e) =>
                  setCoursesData({
                    ...coursesData,
                    directionCategory: e.target.value,
                  })
                }
              >
                <option>Yo'nalishni tanlang</option>
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Mobile">Mobile</option>
                <option value="Web">Web</option>
              </select>

              <div className="my-2">
                <label htmlFor="narxi">Kurs qiyinchiligi</label>
                <select
                  id="narxi"
                  className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
                  value={coursesData?.ratingCategory}
                  onChange={(e) =>
                    setCoursesData({
                      ...coursesData,
                      ratingCategory: e.target.value,
                    })
                  }
                >
                  <option>Kurs qiyinchiligi</option>
                  <option value="Boshlang'ich">Boshlang'ich</option>
                  <option value="O'rta">O'rta</option>
                  <option value="Murakkab">Murakkab</option>
                </select>
              </div>
            </div>
            <Button className={`bg-green-600 hover:bg-blue-700`}>Save</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCourse;
