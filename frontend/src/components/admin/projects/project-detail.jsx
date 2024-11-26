import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import moment from "moment";

import Cookies from "js-cookie";
import { secondsToMinutes } from "@/hooks";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { getOneProjectFailure, getOneProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import { IMG_URL } from "@/services";
import { LuBadgeCheck } from "react-icons/lu";
import AddVideoProject from "../video-detail/add-video-project";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet";

const AdminProjectDetail = () => {
  const { slug } = useParams();
  const adminToken = Cookies.get("adminToken");
  const { project, isLoading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addVideoOpen, setAdVideoOpen] = useState(false);

  const getProject = async () => {
    dispatch(getProjectsStart());
    try {
      const projects = await projectService.getProjects();
      dispatch(getProjectsSuccess(projects?.data));
      const response = await projectService.getOneProject(slug);
      lessonCountHandler(response.data, response?.data?.id);
      dispatch(getOneProjectSuccess(response?.data));
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };
  const lessonCountHandler = async (data, id) => {
    try {
      const count = data?.videos?.length;

      let duration = 0;

      data?.videos?.forEach((vide) => {
        duration += Number(vide?.duration);
      });

      const formData = new FormData();
      formData.append("lesson_count", count);
      formData.append("duration", secondsToMinutes(duration));
      await projectService.updateProject(formData, id);
      const projectData = await projectService.getOneProject(data?.slug);
      dispatch(getOneProjectSuccess(projectData?.data));
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getProject();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>{`Admin | ${project?.title}`}</title>
        <meta name="description" content={project?.description} />
      </Helmet>
      {isLoading ? (
        <h1 className="flex justify-center items-center h-[80vh]">
          <Loader2 className="animate-spin" />
        </h1>
      ) : (
        <div>
          <div className="mb-3">
            {project && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/projects" className="text-gray-400 hover:text-gray-500">
                      Loyihalar
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className={"text-gray-500"}>{project?.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <h1 className="sm:text-2xl text-xl font-bold text-center">{project?.title}</h1>
          <div className="flex sm:flex-row mt-3 flex-col gap-2">
            <img
              src={`${IMG_URL}/course-images/${project?.image}`}
              alt="Kurs rasmi"
              className="w-full sm:w-[40%] h-[200px] rounded-[5px] sm:mx-3 object-cover"
            />
            <span className="sm:w-[60%] w-full line-clamp-[10] text-justify">{project?.description}</span>
          </div>
          <div>
            <h3 className="text-xl mt-3 border-y py-1 flex justify-between sm:justify-start gap-4 w-full">
              Videolar soni: <span className="font-bold">{project?.lesson_count} ta</span>
            </h3>
            {project?.lesson_count > 0 && (
              <Button
                onClick={() => navigate(`/admin/projects/${slug}/videos`)}
                className="mt-3 w-full bg-green-600 hover:bg-blue-600 transition-all"
              >
                Videolarni ko'rish
              </Button>
            )}
            <Button onClick={() => setAdVideoOpen(true)} className="mt-3 w-full bg-blue-600 hover:bg-blue-700 transition-all">
              Video Qo'shish <span className="text-2xl pb-[2px]">+</span>
            </Button>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl mt-3 w-full font-bold text-center">Foydalanilgan tehnologiyalar</h2>
            <div className={"grid grid-cols-2"}>
              {project?.technologies?.map((tech) => (
                <p className="text-lg line-clamp-1 py-2 flex items-center justify-start gap-1" key={tech}>
                  <span className="text-xl">
                    <LuBadgeCheck className={`text-blue-500`} />
                  </span>{" "}
                  <span className="line-clamp-1">{tech}</span>
                </p>
              ))}
            </div>
          </div>

          <h1 className={"sm:text-2xl text-xl font-bold text-center mt-3"}>Loyiha ma'lumotlari</h1>
          <ul className="mt-3 w-full">
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha nomi: <span className="font-bold">{project?.title}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha yo'nalishi: <span className="font-bold">{project?.directionCategory}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha darajasi: <span className="font-bold">{project?.ratingCategory}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha narxi statusi: <span className="font-bold">{project?.priceCategory}</span>
            </li>
            {project?.priceCategory === "Pullik" && (
              <li className="flex justify-between w-full py-2 border-b">
                Loyiha narxi: <span className="font-bold">{project?.price} SO'M</span>
              </li>
            )}
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha reytingi: <span className="font-bold">{project?.rating}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyihani videolar soni: <span className="font-bold">{project?.lesson_count}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha davomiyligi: <span className="font-bold">{project?.duration} soniya</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyiha o'quvchilar soni: <span className="font-bold">{project?.students?.length}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Loyihani kommentlari soni: <span className="font-bold">{project?.comment_count}</span>
            </li>
            <li className="flex justify-between w-full py-2 border-b">
              Yaratilgan vaqti: <span className="font-bold">{moment(project?.createdAt).format("MMM DD, YYYY")}</span>
            </li>
          </ul>
          <AddVideoProject addVideoOpen={addVideoOpen} setAddVideoOpen={setAdVideoOpen} lessonCountHandler={lessonCountHandler} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjectDetail;
