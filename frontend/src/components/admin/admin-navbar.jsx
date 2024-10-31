import { Link, useNavigate } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { HiOutlineChatAlt } from "react-icons/hi";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/slice/mode-slice";

import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";

const AdminNavbar = () => {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    try {
      Cookies.remove("adminToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full container mx-auto h-[80px] flex items-center justify-between px-3 xl:px-[100px] py-[16px]">
      <Link to={"/admin-panel"}>
        <h1
          className="text-[30px] bg-[url('/img.jpg')] bg-no-repeat bg-clip-text text-transparent bg-cover 
       font-bold"
        >
          Admin Panel
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-1 group">
        <div className="md:flex hidden">
          <Button
            className={`text-[20px] ${
              mode
                ? "text-gray-800 bg-light hover:bg-gray-200"
                : "text-white hover:bg-gray-600"
            }`}
          >
            <FaTelegram />
          </Button>
          <Button
            onClick={() => dispatch(setMode(!mode))}
            className={`text-[20px] ${
              mode
                ? "text-gray-800 bg-light hover:bg-gray-200"
                : "text-white hover:bg-gray-600"
            }`}
          >
            {mode ? <RxMoon /> : <IoSunnyOutline className="text-[20px]" />}
          </Button>
          <Button
            className={`text-[20px] ${
              mode
                ? "text-gray-800 bg-light hover:bg-gray-200"
                : "text-white hover:bg-gray-600"
            }`}
          >
            <HiOutlineChatAlt />
          </Button>
        </div>
        <Button
          className={`text-[16px] w-[40px] relative flex items-center  justify-center gap-2 p-1 rounded-sm cursor-pointer bg-darkblue ${
            mode ? "text-black hover:bg-gray-200" : "text-white"
          }`}
        >
          <LuLogOut
            className="hover:text-red-600 transition-all w-[20px] h-[30px]"
            title="Logout"
            onClick={() => logoutHandler()}
          />
        </Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
