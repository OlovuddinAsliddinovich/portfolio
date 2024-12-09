import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { adminService } from "@/services/admin.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const { mode } = useSelector((state) => state.mode);
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      console.log(adminData);
      const response = await adminService.login(adminData);
      console.log(response);
      navigate("/admin-panel");
      toast.success("Welcome Admin!", { position: "top-center" });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className={`w-full min-h-screen pt-16 xs:pt-32 px-4 ${mode ? "bg-blue-300 text-gray-900" : "bg-darkBlue text-white"}`}>
      <form
        className={`flex flex-col justify-center items-center w-full xs:w-[70%] sm:w-[400px] mx-auto border p-4 rounded-sm ${
          mode ? "bg-white" : "bg-zinc-600"
        }`}
        onSubmit={loginAdmin}
      >
        <h1 className="text-3xl">Admin panel</h1>
        <div className="flex flex-col justify-center items-start w-full">
          <label htmlFor="login" className="py-1">
            Login
          </label>
          <input
            type="text"
            className={`w-full h-[40px] flex items-center justify-center rounded-[3px] p-2 focus:outline-none focus:shadow-[inset_0px_0px_2px_2px_rgba(1,150,251,1)] text-gray-700 border border-blue-500`}
            id="login"
            placeholder="login"
            value={adminData.username}
            onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-center items-start w-full">
          <label htmlFor="password" className="py-1">
            Password
          </label>
          <input
            type="password"
            className={`w-full h-[40px] flex items-center justify-center rounded-[3px] p-2 focus:outline-none focus:shadow-[inset_0px_0px_2px_2px_rgba(1,150,251,1)] text-gray-700 border border-blue-500`}
            id="password"
            placeholder="password"
            value={adminData.password}
            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          />
        </div>
        <Button className={`w-full mt-4 rounded-[3px] ${mode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`} type="submit">
          Kirish
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
