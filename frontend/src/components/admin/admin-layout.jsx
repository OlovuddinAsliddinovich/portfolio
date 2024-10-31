import React, { useRef, useEffect } from "react";
import Navbar from "../layouts/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { CiTextAlignLeft } from "react-icons/ci";
import { HiOutlineChatAlt } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { setMode, setSidebarOpen } from "@/slice/mode-slice";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import AdminSidebar from "./admin.sidebar";
import AdminNavbar from "./admin-navbar";

const AdminLayout = ({ children }) => {
  const { mode, sidebarOpen } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <div className={`${mode ? "bg-white" : "bg-slate"} scroll-smooth w-full`}>
      <div
        className={`mx-auto fixed w-full top-0 left-0 ${
          mode ? "bg-light" : "bg-slate"
        } z-[9]`}
      >
        <AdminNavbar />

        <div
          className={`border-t border-gray-700 ${
            mode ? "bg-light" : "bg-slate"
          } flex justify-between items-center px-3`}
        >
          <div className="md:hidden flex p-2">
            <Button
              className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
                mode
                  ? "text-gray-800 bg-light hover:bg-gray-200"
                  : "text-white hover:bg-gray-600"
              }`}
              onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
            >
              <CiTextAlignLeft />
            </Button>
            <Button
              onClick={() => dispatch(setMode(!mode))}
              className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
                mode
                  ? "text-gray-800 bg-light hover:bg-gray-200"
                  : "text-white hover:bg-gray-600"
              }`}
            >
              {mode ? <RxMoon /> : <IoSunnyOutline />}
            </Button>
            <Button
              className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
                mode
                  ? "text-gray-800 bg-light hover:bg-gray-200"
                  : "text-white hover:bg-gray-600"
              }`}
            >
              <HiOutlineChatAlt />
            </Button>
          </div>
          <div className="md:hidden flex gap-0 justify-center items-center flex-wrap">
            <FaTelegram
              className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                mode ? "text-gray-900" : "text-white"
              }`}
            />
            <FaInstagram
              className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                mode ? "text-gray-900" : "text-white"
              }`}
            />
            <FaYoutube
              className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                mode ? "text-gray-900" : "text-white"
              }`}
            />
            <FaLinkedin
              className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                mode ? "text-gray-900" : "text-white"
              }`}
            />
            <FaGithub
              className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                mode ? "text-gray-900" : "text-white"
              }`}
            />
          </div>
        </div>

        <div className="relative border-t-[1px] border-gray-700">
          <div
            className={`fixed w-[288px] top-[80px] left-0 ${
              mode ? "bg-light" : "bg-slate"
            } h-screen z-[-1]`}
          >
            <AdminSidebar />
          </div>
          <div
            className={`absolute md:left-[288px] left-0 top-0 md:w-[calc(100%-288px)] w-full ${
              mode ? "bg-white" : "bg-darkBlue"
            } h-[calc(100vh-80px)] overflow-y-scroll`}
          >
            <div
              className={`container mx-auto py-4 px-3 lg:px-12 w-full ${
                mode ? "text-gray-800" : "text-white"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
