import ImgInput from "@/components/admin-ui/img-input";
import Input from "@/components/admin-ui/input";
import Textarea from "@/components/admin-ui/textarea";
import { Button } from "@/components/ui/button";
import { projectService } from "@/services/project.service";
import { addProjectFailure, addProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddProject = ({ addOpen, setAddOpen }) => {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.projects);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    directionCategory: "",
    ratingCategory: "",
    priceCategory: "",
    technologies: [],
  });

  const addProjectHandler = async (e) => {
    e.preventDefault();
    if (!projectDetails.image) return toast.error("Siz rasm tanlashingiz kerak!");
    dispatch(getProjectsStart());
    try {
      const formData = new FormData();
      const technologiesArray = projectDetails.technologies.split(",").map((tech) => tech.trim());

      formData.append("title", projectDetails.title);
      formData.append("description", projectDetails.description);
      formData.append("image", projectDetails.image);
      formData.append("price", projectDetails.price);
      formData.append("directionCategory", projectDetails.directionCategory);
      formData.append("ratingCategory", projectDetails.ratingCategory);
      formData.append("priceCategory", projectDetails.priceCategory);
      technologiesArray.forEach((tech) => formData.append("technologies", tech.trim()));
      const { data } = await projectService.addProject(formData);
      const projects = await projectService.getProjects();
      dispatch(addProjectSuccess(data));
      dispatch(getProjectsSuccess(projects.data));
      toast.success("Loyiha muvaffaqqiyatli qo'shildi!");
      setAddOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      dispatch(addProjectFailure(error?.response?.data?.message));
    }
  };

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0" onClick={() => setAddOpen(!addOpen)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:w-[50%] h-[100%] overflow-y-scroll ml-auto animate-right ${mode ? "bg-light" : "bg-slate"}`}
      >
        <form className="sm:p-4 p-2" onSubmit={addProjectHandler}>
          <h1 className="text-2xl font-bold text-center relative mt-3">
            Yangi loyiha qo'shish{" "}
            <span
              className="absolute top-0 right-0 cursor-pointer border border-gray-600 rounded-[4px] hover:bg-red-600 hover:text-white transition-all"
              onClick={() => setAddOpen(false)}
            >
              <LiaTimesSolid className="w-5 h-5" />
            </span>
          </h1>
          <Input title={"Title"} type={"text"} name={"title"} state={projectDetails.title} setState={setProjectDetails} />
          <Textarea title={"Description"} type={"text"} name={"description"} state={projectDetails.description} setState={setProjectDetails} />
          <ImgInput setState={setProjectDetails} title={"Loyiha uchun rasm yuklash"} />
          <Input title={"Price"} type={"number"} name={"price"} state={projectDetails.price} setState={setProjectDetails} />
          <Input title={"Technologies"} type="text" name={"technologies"} state={projectDetails.technologies} setState={setProjectDetails} />

          <div className="my-2">
            <label htmlFor="yunalish">Loyiha yo'nalishi</label>
            <select
              className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
              value={projectDetails?.directionCategory}
              onChange={(e) => setProjectDetails({ ...projectDetails, directionCategory: e.target.value })}
              id="yunalish"
            >
              <option value="">Loyiha Yo'nalishi</option>
              <option value="Front-End">Frontend</option>
              <option value="Back-End">Backend</option>
              <option value="Full-Stack">Fullstack</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="rating">Loyiha Reytingi</label>
            <select
              className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
              value={projectDetails?.ratingCategory}
              onChange={(e) => setProjectDetails({ ...projectDetails, ratingCategory: e.target.value })}
              id="rating"
            >
              <option value="">Loyiha Reytingi</option>
              <option value="Boshlang'ich">Boshlang'ich</option>
              <option value="O'rta">O'rta</option>
              <option value="Murakkab">Murakkab</option>
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="narxi">Loyiha Narxi</label>
            <select
              className={`w-full h-[35px] focus:outline-none mt-1 cursor-pointer rounded-sm px-2 ${mode ? "bg-white" : "bg-zinc-700"}`}
              value={projectDetails?.priceCategory}
              onChange={(e) => setProjectDetails({ ...projectDetails, priceCategory: e.target.value })}
              id="narxi"
            >
              <option value="">Loyiha Narxi</option>
              <option value="Bepul">Bepul</option>
              <option value="Pullik">Pullik</option>
            </select>
          </div>
          <Button disabled={isLoading} type="submit" className={`bg-green-600 hover:bg-blue-700 w-[200px] mt-3`}>
            {isLoading ? "Loading..." : "Qo'shish"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
