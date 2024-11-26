import React from "react";
import AdminLayout from "../admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProjectFailure, getOneProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { projectService } from "@/services/project.service";
import { useEffect } from "react";
import { secondsToMinutes } from "@/hooks";
import { IMG_URL } from "@/services";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditVideoProject from "../video-detail/edit-video-project";
import { getVideosSuccess } from "@/slice/video-slice";
import DeleteVideoProject from "../video-detail/delete-video-project";
import VideoItemSkeleton from "@/components/skeletons/video.item.skeleton";

const AdminProjectVideos = () => {
  const { slug } = useParams();
  const { isLoading, project } = useSelector((state) => state.projects);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState(null);
  const [editVideoOpen, setEditVideoOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getProject = async () => {
    dispatch(getProjectsStart());
    try {
      const projects = await projectService.getProjects();
      dispatch(getProjectsSuccess(projects?.data));
      const response = await projectService.getOneProject(slug);
      dispatch(getOneProjectSuccess(response?.data));
      dispatch(getVideosSuccess(response?.data?.videos));
    } catch (error) {
      console.log(error);
      dispatch(getOneProjectFailure(error?.response?.data?.message));
    }
  };

  const editModalHandler = (e, id) => {
    e.stopPropagation();
    setEditVideoOpen(true);
    setVideoId(id);
  };

  const deleteModalHandler = (e, id) => {
    e.stopPropagation();
    setVideoId(id);
    setDeleteOpen(true);
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <AdminLayout>
      {isLoading ? (
        <div>
          <VideoItemSkeleton />
        </div>
      ) : (
        <div>
          <div>
            {project && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-gray-400 hover:text-gray-500" href="/admin/projects">
                      Loyihalar
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-gray-400 hover:text-gray-500" href={`/admin/projects/${project?.slug}`}>
                      {project?.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className={"text-gray-500"}>Videolar</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <div className="mt-4">
            <h1 className={"text-2xl font-bold flex flex-col xs:flex-row justify-between items-center hover:cursor-default"}>
              {project?.title}{" "}
              <img
                src={`${IMG_URL}/course-images/${project?.image}`}
                alt="img"
                className={`w-[300px] h-[100px] rounded-[3px] object-cover mt-3 xs:mt-0`}
              />
            </h1>
            <div className="mt-4">
              <div className={"font-bold w-full grid grid-cols-3"}>
                {" "}
                <span>Video nomi</span> <span>Davomiyligi</span> <span className={"text-center"}>Action</span>{" "}
              </div>
              {project?.videos.map((video) => (
                <div
                  onClick={() => navigate(`/admin/projects/${project?.slug}/videos/${video?._id}`)}
                  key={video?._id}
                  className={`${mode ? "hover:bg-gray-200" : "hover:bg-gray-700"} transition-all cursor-pointer grid grid-cols-3 p-2 border-b`}
                >
                  <span># {video?.title}</span>
                  <span>{secondsToMinutes(video?.duration)}</span>
                  <span className={"text-end flex xs:flex-row flex-col gap-1 justify-end items-end xs:items-start"}>
                    <Button onClick={(e) => editModalHandler(e, video?._id)} className={`w-[100px] bg-blue-500 hover:bg-blue-600`}>
                      Tahrirlash
                    </Button>
                    <Button onClick={(e) => deleteModalHandler(e, video?._id)} className={`w-[100px] bg-red-600 hover:bg-red-700`}>
                      O'chirish
                    </Button>
                  </span>
                </div>
              ))}
            </div>
          </div>
          {editVideoOpen && <EditVideoProject editVideoOpen={editVideoOpen} setEditVideoOpen={setEditVideoOpen} videoId={videoId} />}
          {deleteOpen && <DeleteVideoProject deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} videoId={videoId} />}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjectVideos;
