import { IoSearch } from "react-icons/io5";
import Layout from "../layouts/layout";
import { ComboboxDemo } from "../ui/combobox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsFailure, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import { useEffect } from "react";
import ProjectCard from "../layouts/project-card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import CourseCardSkeleton from "../skeletons/course.card.skeleton";
import { Helmet } from "react-helmet";

const Projects = () => {
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const { projects, isLoading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [select, setSelect] = useState("yangi");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms kechikish
    return () => {
      clearTimeout(handler);
    };
  });

  useEffect(() => {
    let tempProjects = projects.filter((project) => project?.title?.toLowerCase().includes(debouncedSearch.toLowerCase()));

    if (select === "yangi") {
      tempProjects = tempProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (select === "oldingi") {
      tempProjects = tempProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (select === "mashxur") {
      tempProjects = tempProjects.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProjects(tempProjects);
  }, [debouncedSearch, select, projects]);

  const getProjects = async () => {
    dispatch(getProjectsStart());
    try {
      const { data } = await projectService.getProjects();
      dispatch(getProjectsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getProjectsFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Loyihalar</title>
        <meta name="description" content="Loyihalar - turli sohalarda sifatli va interaktiv ta'limni taklif qilamiz." />
      </Helmet>
      <header className="flex justify-between items-start xl:items-center gap-2 flex-col xl:flex-row">
        <div className="xl:text-2xl md:text-xl font-bold font-spaceGrotesk flex gap-2">
          <h2 className="text-blue-500">Loyihalar</h2>/
          <h2 className="underline hover:text-blue-200 cursor-pointer" onClick={() => navigate("/courses")}>
            Kurslar
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
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <CourseCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => <ProjectCard key={project?._id} {...project} marginTop={"mt-1"} />)
          ) : (
            <div className="w-full flex justify-start items-center mt-4">
              <h2>Bunday loyiha topilmadi</h2>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Projects;
