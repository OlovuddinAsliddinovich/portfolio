import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle } from "../ui/card";
import PointerRoute from "./pointer-route";
import { getProjectsFailure, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IMG_URL } from "@/services";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../skeletons/card.skeleton";

const ProjectsInformation = ({ mode }) => {
  const { projects, isLoading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProjects = async () => {
    dispatch(getProjectsStart());
    try {
      const { data } = await projectService.getProjects();
      dispatch(getProjectsSuccess(data));
      return data;
    } catch (error) {
      dispatch(getProjectsFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div className={`${mode ? "bg-white" : "bg-darkBlue"} font-montserrat`}>
      <PointerRoute text={"Loyihalar"} />
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
          {projects?.slice(0, 4)?.map((project) => (
            <Card
              onClick={() => navigate(`/projects/${project.slug}`)}
              className={`${mode ? "bg-light text-gray-700 border" : "bg-gray-800 text-white border-gray-800"} rounded-sm cursor-pointer`}
              key={project?._id}
            >
              <img src={`${IMG_URL}/course-images/${project.image}`} alt={project.title} className="h-[180px] w-full md:object-cover" />
              <CardTitle className={`rounded-none p-3 tracking-[.1px] text-[18px] font-semibold`}>{project.title}</CardTitle>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsInformation;
