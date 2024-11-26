import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { projectService } from "@/services/project.service";
import { deleteProjectFailure, deleteProjectSuccess, getProjectsStart, getProjectsSuccess } from "@/slice/project.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const DeleteProject = ({ deleteOpen, setDeleteOpen, projectId }) => {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const deleteProjectHandler = async (id) => {
    dispatch(getProjectsStart());
    try {
      await projectService.deleteProject(id);
      const projects = await projectService.getProjects();
      dispatch(deleteProjectSuccess());
      dispatch(getProjectsSuccess(projects?.data));
      toast.success("Loyiha o'chirildi!");
      setDeleteOpen(false);
    } catch (error) {
      dispatch(deleteProjectFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent className={mode ? "bg-white" : "bg-gray-800 text-light"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Siz bu loyihani o'chirmoqchimisiz?</AlertDialogTitle>
          <AlertDialogDescription>Bu loyiha butunlay o'chib ketadi! O'chirilsinmi?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={mode ? "" : "text-gray-900"}>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProjectHandler(projectId)} className="bg-red-500 hover:bg-red-600">
            O'chirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProject;
