import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { setMode, setSidebarOpen } from "@/slice/mode-slice";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import AdminSidebar from "./admin.sidebar";
import AdminNavbar from "./admin-navbar";
import AdminTabletSidebar from "./admin-tablet-sidebar";
import { Helmet } from "react-helmet";

const AdminLayout = ({ children }) => {
  const { mode, sidebarOpen } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Admin | Bosh Sahifa</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={"Onlayn o'quv platformasi"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://kurs.uz"} />
        <meta property="og:site_name" content="Onlayn o'quv platformasi" />
      </Helmet>
      <div className={`${mode ? "bg-white" : "bg-slate"} scroll-smooth w-full`}>
        <div className={`mx-auto fixed w-full top-0 left-0 ${mode ? "bg-light" : "bg-slate"} z-[9]`}>
          <AdminNavbar />

          <div className={`border-t border-gray-700 ${mode ? "bg-light" : "bg-slate"} flex justify-between items-center px-3`}>
            <div className="md:hidden flex p-2">
              <Button
                className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
                  mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"
                }`}
                onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              >
                <CiTextAlignLeft />
              </Button>
              <Button
                onClick={() => dispatch(setMode(!mode))}
                className={`text-[20px] p-2 pt-0 pb-0 rounded-[2px] h-[30px] ${
                  mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"
                }`}
              >
                {mode ? <RxMoon /> : <IoSunnyOutline />}
              </Button>
            </div>
            <div className="md:hidden flex gap-0 justify-center items-center flex-wrap">
              <FaTelegram
                onClick={() => window.open("https://t.me/Olovuddin_Asliddinovich")}
                className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                  mode ? "text-gray-900" : "text-white"
                }`}
              />
              <FaInstagram
                onClick={() => window.open("https://www.instagram.com/olovuddin_ramiddinov/")}
                className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                  mode ? "text-gray-900" : "text-white"
                }`}
              />
              <FaYoutube
                onClick={() => window.open("https://www.youtube.com/@programmer_0618")}
                className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                  mode ? "text-gray-900" : "text-white"
                }`}
              />
              <FaLinkedin
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/olovuddin-ramiddinov-482a28250?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUBScFdKkSw%2ByGacCbv%2BlXg%3D%3D"
                  )
                }
                className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                  mode ? "text-gray-900" : "text-white"
                }`}
              />
              <FaGithub
                onClick={() => window.open("https://github.com/OlovuddinAsliddinovich")}
                className={`p-2 w-[33px] cursor-pointer transition-all h-[30px] rounded  hover:bg-gray-700 hover:text-white ${
                  mode ? "text-gray-900" : "text-white"
                }`}
              />
            </div>
          </div>

          <div className="relative border-t-[1px] border-gray-700">
            <div className={`fixed w-full xs:w-[288px] top-[80px] left-0 ${mode ? "bg-light" : "bg-slate"} h-screen z-[-1]`}>
              <AdminSidebar />
              <AdminTabletSidebar />
            </div>
            <div
              className={`absolute md:left-[288px] left-0 top-0 md:w-[calc(100%-288px)] w-full ${
                mode ? "bg-white" : "bg-darkBlue"
              } h-[calc(100vh-80px)] overflow-y-scroll`}
            >
              <div className={`container mx-auto py-4 px-3 lg:px-12 pb-8 w-full ${mode ? "text-gray-800" : "text-white"}`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
