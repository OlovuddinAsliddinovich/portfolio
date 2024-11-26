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
import { codeResourceService } from "@/services/code-resource-service";
import { codeResourceFailure, codeResourcesSuccess, codeResourceStart, codeResourceSuccess } from "@/slice/code-resource.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteCodeResource = ({ deleteOpen, setDeleteOpen, id }) => {
  const { mode } = useSelector((state) => state.mode);
  const { isLoading } = useSelector((state) => state.codeResources);
  const dispatch = useDispatch();

  const deleteVideoHandler = async (id) => {
    dispatch(codeResourceStart());
    try {
      await codeResourceService.deleteCodeResource(id);
      dispatch(codeResourceSuccess(null));
      const getAllCodes = await codeResourceService.getAllCodeResources();
      dispatch(codeResourcesSuccess(getAllCodes?.data));
    } catch (error) {
      console.log(error);
      dispatch(codeResourceFailure(error?.response?.data?.message));
    }
  };
  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent className={mode ? "bg-white" : "bg-gray-800 text-light"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Siz bu videoni o'chirmoqchimisiz?</AlertDialogTitle>
          <AlertDialogDescription className={mode ? "" : "text-gray-400"}>Bu video butunlay o'chib ketadi! O'chirilsinmi?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={mode ? "" : "text-gray-900"}>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={() => deleteVideoHandler(id)} className="bg-red-500 hover:bg-red-600">
            {isLoading ? "O'chirilmoqda..." : "O'chirish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCodeResource;
