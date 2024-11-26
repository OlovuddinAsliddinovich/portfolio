import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import AddCodeResource from "../admin/code-resource/add-code-resource";
import { useDispatch, useSelector } from "react-redux";
import { codeResourceFailure, codeResourcesSuccess, codeResourceStart } from "@/slice/code-resource.slice";
import { codeResourceService } from "@/services/code-resource-service";
import { FaGithub } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditCodeResource from "../admin/code-resource/edit-code-resource";
import { Loader2 } from "lucide-react";
import DeleteCodeResource from "../admin/code-resource/delete-code-resource";
import CodeSkeleton from "../skeletons/code.skeleton";
import { Helmet } from "react-helmet";

const AdminCodeResource = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState(null);
  const { codeResources, isLoading } = useSelector((state) => state.codeResources);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const getAllCodes = async () => {
    dispatch(codeResourceStart());
    try {
      const { data } = await codeResourceService.getAllCodeResources();
      dispatch(codeResourcesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(codeResourceFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getAllCodes();
  }, []);
  return (
    <AdminLayout>
      <Helmet>
        <title>Admin | Kod manbalar</title>
        <meta name="description" content="Kod manbalar" />
      </Helmet>
      <div className="w-full container mx-auto h-[80px] flex items-start xs:flex-row flex-col justify-between">
        <h1 className={`font-bold text-2xl text-center`}>Kod manbalari</h1>
        <Button onClick={() => setAddOpen(true)} className="w-full xs:w-[200px] bg-green-600 hover:bg-blue-600 float-end">
          Qo'shish
        </Button>
      </div>
      {isLoading ? (
        <div className="w-full grid xs:grid-cols-2 grid-cols-1 gap-3 mt-4 xs:mt-0">
          {[...Array(18)].map((_, index) => (
            <div key={index}>
              <CodeSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full grid xs:grid-cols-2 grid-cols-1 gap-3 mt-4 xs:mt-0">
          {codeResources?.map((code) => (
            <div
              onClick={() => (window.location.href = code?.url)}
              key={code?._id}
              className="flex items-center gap-2 border border-gray-500 p-2 cursor-pointer"
            >
              <div className="text-2xl">
                <FaGithub />
              </div>
              <div>{code?.title}</div>
              <div className="ml-auto text-xl hover:text-blue-500 p-1 transition-all" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="ml-auto text-xl hover:text-blue-500 p-1 transition-all">
                      <BsThreeDotsVertical />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={`${mode ? "bg-white" : "bg-darkBlue text-white"} w-[200px]`}>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditOpen(true);
                        setId(code?._id);
                      }}
                      className="text-blue-500 focus:text-blue-600"
                    >
                      <span className="flex items-center">
                        <CiEdit className="mr-2 mt-[2px]" />
                      </span>
                      Tahrirlash
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteOpen(true);
                        setId(code?._id);
                      }}
                      className="text-red-500 focus:text-red-500"
                    >
                      <MdOutlineDeleteOutline className="mr-2 mt-[2px]" /> O'chirish
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        {addOpen && <AddCodeResource addOpen={addOpen} setAddOpen={setAddOpen} />}
        {editOpen && <EditCodeResource editOpen={editOpen} setEditOpen={setEditOpen} id={id} />}
        {deleteOpen && <DeleteCodeResource deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} id={id} />}
      </div>
    </AdminLayout>
  );
};

export default AdminCodeResource;
