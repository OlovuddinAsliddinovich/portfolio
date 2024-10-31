import {
  FaCode,
  FaCodeBranch,
  FaFolderMinus,
  FaGithub,
  FaHome,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <div className="flex flex-col justify-between px-4 py-6 h-[90vh] font-montserrat ">
      <ul
        className={`${
          mode ? "text-black" : "text-white"
        } text-[17px] font-normal`}
      >
        <li>
          Sahifalar <hr className="my-2 border-gray-800" />
        </li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? `font-semibold ${
                    mode
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-800 text-white"
                  }`
                : ""
            }
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/admin-panel"}
        >
          <FaHome className="text-[16px]" />
          Bosh sahifa
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? `font-semibold ${
                    mode
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-800 text-white"
                  }`
                : ""
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/admin/courses"}
        >
          <FaCode className="text-[16px]" />
          Kurslar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? `font-semibold ${
                    mode
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-800 text-white"
                  }`
                : ""
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/admin/projects"}
        >
          <FaCodeBranch className="text-[16px]" />
          Loyihalar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? `font-semibold ${
                    mode
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-800 text-white"
                  }`
                : ""
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/admin/code-resources"}
        >
          <FaFolderMinus className="text-[16px]" />
          Kod manbalari
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? `font-semibold ${
                    mode
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-800 text-white"
                  }`
                : ""
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/admin/users"}
        >
          <IoIosSpeedometer className="text-[16px]" />
          Foydalanuvchilar
        </NavLink>
      </ul>
      <div>
        <hr className="my-2 border-gray-800" />
        <div className="md:flex hidden gap-2 justify-center items-center pt-3">
          <FaTelegram
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaInstagram
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaYoutube
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaLinkedin
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaGithub
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
