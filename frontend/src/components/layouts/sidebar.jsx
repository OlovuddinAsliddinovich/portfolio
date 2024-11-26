import { FaCode, FaCodeBranch, FaFolderMinus, FaGithub, FaHome, FaInstagram, FaTelegram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <div className="flex flex-col justify-between px-4 py-6 h-[90vh] font-montserrat">
      <ul className={`${mode ? "text-black" : "text-white"} text-[17px] font-normal`}>
        <li>
          Sahifalar <hr className="my-2 border-gray-800" />
        </li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/"}
        >
          <FaHome className="text-[16px]" />
          Bosh sahifa
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/courses"}
        >
          <FaCode className="text-[16px]" />
          Kurslar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/projects"}
        >
          <FaCodeBranch className="text-[16px]" />
          Loyihalar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/code-resource"}
        >
          <FaFolderMinus className="text-[16px]" />
          Kod manbalari
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
          }
          to={"/profile"}
        >
          <IoIosSpeedometer className="text-[16px]" />
          Profil
        </NavLink>
      </ul>
      <div>
        <hr className="my-2 border-gray-800" />
        <div className="md:flex hidden gap-2 justify-center items-center pt-3">
          <FaTelegram
            onClick={() => window.open("https://t.me/Olovuddin_Asliddinovich")}
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaInstagram
            onClick={() => window.open("https://www.instagram.com/olovuddin_ramiddinov/")}
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaYoutube
            onClick={() => window.open("https://www.youtube.com/@programmer_0618")}
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaLinkedin
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/olovuddin-ramiddinov-482a28250?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUBScFdKkSw%2ByGacCbv%2BlXg%3D%3D"
              )
            }
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
          <FaGithub
            onClick={() => window.open("https://github.com/OlovuddinAsliddinovich")}
            className={`p-2 w-[35px] cursor-pointer transition-all h-[35px] rounded text-[20px] hover:bg-gray-700 hover:text-white ${
              mode ? "text-gray-900" : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
