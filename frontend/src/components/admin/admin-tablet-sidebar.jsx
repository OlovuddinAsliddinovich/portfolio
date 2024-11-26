import { FaCode, FaCodeBranch, FaFolderMinus, FaGithub, FaHome, FaInstagram, FaTelegram, FaYoutube, FaLinkedin, FaCommentDots } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { setSidebarOpen } from "@/slice/mode-slice";

const AdminTabletSidebar = () => {
  const { mode, sidebarOpen } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <Sheet
      open={sidebarOpen}
      onOpenChange={() => {
        dispatch(setSidebarOpen(!sidebarOpen));
      }}
    >
      <SheetContent side={"left"} className={`${mode ? "bg-light" : "bg-darkBlue"}`}>
        <SheetHeader>
          <div className="flex flex-col justify-between px-4 py-6 h-[90vh] font-montserrat ">
            <ul className={`${mode ? "text-black" : "text-white"} text-[17px] font-normal`}>
              <SheetTitle className={`${mode ? "text-gray-800" : "text-white"} text-start`}>
                Sahifalar <hr className="my-2 border-gray-800" />
              </SheetTitle>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""}
            } w-full ${
              mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
            } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/admin-panel"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
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
                to={"/admin/courses"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
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
                to={"/admin/projects"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
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
                to={"/admin/code-resources"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
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
                to={"/admin/users"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <IoIosSpeedometer className="text-[16px]" />
                Foydalanuvchilar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } text-[15px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/admin/comments"}
              >
                <FaCommentDots className="text-[16px]" />
                Fikrlar
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
                  onClick={() => window.open("https://www.youtube.com/@programmer_0618")}
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AdminTabletSidebar;
