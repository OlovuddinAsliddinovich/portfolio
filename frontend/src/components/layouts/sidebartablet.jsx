import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { setSidebarOpen } from "@/slice/mode-slice";
import { NavLink } from "react-router-dom";
import { FaCode, FaCodeBranch, FaFolderMinus, FaHome } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";

const SidebarTablet = () => {
  const { sidebarOpen, mode } = useSelector((state) => state.mode);
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
          <div className="flex flex-col justify-between px-4 py-6 h-[90vh] font-montserrat">
            <ul className={`${mode ? "text-black" : "text-white"} text-[17px] font-normal`}>
              <SheetTitle className={`${mode ? "text-gray-800" : "text-white"} text-start`}>
                Sahifalar <hr className="my-2 border-gray-800" />
              </SheetTitle>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } xs:text-[15px] text-[13px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <FaHome className="text-[16px]" />
                Bosh sahifa
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } xs:text-[15px] text-[13px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/courses"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <FaCode className="text-[16px]" />
                Kurslar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } xs:text-[15px] text-[13px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/projects"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <FaCodeBranch className="text-[16px]" />
                Loyihalar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } xs:text-[15px] text-[13px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/code-resource"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <FaFolderMinus className="text-[16px]" />
                Kod manbalari
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? `font-semibold ${mode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-white"}` : ""} w-full ${
                    mode ? "hover:bg-gray-300 text-gray-700" : "hover:bg-gray-800"
                  } xs:text-[15px] text-[13px] transition-all rounded-sm p-2 px-4 flex justify-start items-center gap-2`
                }
                to={"/profile"}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <IoIosSpeedometer className="text-[16px]" />
                Profil
              </NavLink>
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarTablet;
