import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUsersSuccess, signUserStart } from "@/slice/user-slice";
import UserService from "@/services/user.service";
import { FaSearch } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { IMG_URL } from "@/services";
import { Button } from "../ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import UsersSkeleton from "../skeletons/users.skeleton";
import { Fragment } from "react";

const AdminUsers = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { users, isLoading } = useSelector((state) => state.userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced qiymat

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const getUsers = async () => {
    dispatch(signUserStart());
    try {
      const data = await UserService.getUsers();
      dispatch(signUsersSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(signUserFailure(error?.response?.data?.message));
    }
  };

  const filteredUsers = users?.filter((user) => {
    const fullName = `${user?.firstname} ${user?.lastname}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase()) || user?.email?.toLowerCase().includes(debouncedSearch.toLowerCase());
  });

  const deleteHandler = async (userId) => {
    dispatch(signUserStart());
    try {
      const data = await UserService.deleteUser(userId);
      getUsers();
    } catch (error) {
      console.log(error);
      dispatch(signUserFailure(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
    getUsers();
  }, []);

  return (
    <AdminLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin-panel" className="text-gray-500 hover:text-gray-600">
              Bosh sahifa
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500">Foydalanuvchilar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center gap-4">
        <h1 className="xs:text-2xl text-xl font-bold">Foydalanuvchilar</h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Qidirish"
            className={`w-full sm:w-[200px] h-[35px] p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 z-10 rounded-xs ${
              mode ? "bg-light" : "bg-zinc-600"
            }`}
            name="search"
          />
          <FaSearch className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 cursor-pointer h-full w-[40px] p-2 z-20" />
        </div>
      </div>
      <div className="overflow-x-scroll w-full">
        <table className="w-full text-start border-collapse mt-4">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-start">№</th>
              <th className="p-2 text-start">Rasm</th>
              <th className="p-2 text-start">FIO</th>
              <th className="p-2 text-start">Email</th>
              <th className="p-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading ? (
              [...Array(8)].map((_, index) => (
                <Fragment key={index}>
                  <UsersSkeleton />
                </Fragment>
              ))
            ) : filteredUsers?.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b h-[70px]">
                  <td className="p-2 text-start">{index + 1}</td>
                  <td className="text-start w-[50px] h-[50px]">
                    <img
                      src={
                        user?.image
                          ? `${IMG_URL}/${user?.image}`
                          : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaJS0dnDYQ5NkVr30LWhCjQoMLtm6BC0TDA&s`
                      }
                      alt="img"
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2 pl-3 text-start gap-2 flex mt-[15px] flex-nowrap items-center justify-start">
                    <span>{user?.firstname}</span> <span>{user?.lastname}</span>
                  </td>
                  <td className="p-2 text-start pb-3">{user?.email}</td>
                  <td className="p-2 text-start">
                    <Button onClick={() => deleteHandler(user?._id)} className="bg-red-500 hover:bg-red-600">
                      {isLoading ? "O'chirilmoqda" : "O'chirish"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5" className="text-gray-500">
                  Hech narsa topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
