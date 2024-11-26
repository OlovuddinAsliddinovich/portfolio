import React from "react";
import Layout from "../layouts/layout";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { ComboboxDemo } from "../ui/combobox";
import { Card, CardTitle } from "../ui/card";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { codeResourceService } from "@/services/code-resource-service";
import { codeResourceFailure, codeResourcesSuccess, codeResourceStart } from "@/slice/code-resource.slice";
import { useEffect } from "react";
import { useState } from "react";
import CodeResourceSkeleton from "../skeletons/code.resource.skeleton";

const CodeResource = () => {
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const { codeResources, isLoading } = useSelector((state) => state.codeResources);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [select, setSelect] = useState("yangi");
  const [filteredCodeResources, setFilteredCodeResources] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms kechikish
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    let tempCoderesource = codeResources.filter((codeResource) => codeResource?.title?.toLowerCase().includes(debouncedSearch.toLowerCase()));

    if (select === "yangi") {
      tempCoderesource = tempCoderesource.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (select === "oldingi") {
      tempCoderesource = tempCoderesource.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (select === "mashxur") {
      tempCoderesource = tempCoderesource.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCodeResources(tempCoderesource);
  }, [debouncedSearch, select, codeResources]);

  const getCodeResources = async () => {
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
    getCodeResources();
  }, []);

  return (
    <Layout>
      <header className="flex justify-between items-start xl:items-center gap-2 flex-col xl:flex-row">
        <div className="text-[15px] font-normal text-gray-500 font-spaceGrotesk flex gap-2 flex-wrap">
          <span className={`cursor-pointer hover:${mode ? "text-black" : "text-white"} transition-all duration-200`} onClick={() => navigate("/")}>
            Bosh sahifa
          </span>{" "}
          /{" "}
          <span
            className={`cursor-pointer hover:${mode ? "text-black" : "text-white"} transition-all duration-200`}
            onClick={() => navigate("/courses")}
          >
            Kurslar
          </span>{" "}
          /{" "}
          <span
            className={`cursor-pointer hover:${mode ? "text-black" : "text-white"} transition-all duration-200`}
            onClick={() => navigate("/projects")}
          >
            Loyihalar
          </span>{" "}
          / <span className={`${mode ? "text-black" : "text-white"}`}>Kod manbalari</span>
        </div>
        <div className="flex justify-between items-center gap-2 w-full md:w-auto flex-col xs:flex-row">
          <div className="relative flex items-center justify-start w-full">
            <input
              type="text"
              placeholder="Qidirish"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border-none focus:outline-none h-[35px] pl-4 w-full ${mode ? "bg-gray-100" : "bg-gray-800"} pr-10`}
            />
            <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" cursor={"pointer"} />
          </div>
          <div className="relative w-full">
            <ComboboxDemo setSelect={setSelect} />
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-2 gap-2 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <CodeResourceSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-2 gap-2 mt-6">
          {filteredCodeResources.length > 0 ? (
            filteredCodeResources.map((item) => (
              <Card
                key={item?._id}
                onClick={() => window.open(item?.url, "_blank")}
                className={`${
                  mode ? "bg-white" : "bg-darkBlue border-gray-700"
                } flex justify-between items-center rounded-[2px] p-3 gap-4 cursor-pointer`}
              >
                <CardTitle
                  className={`${mode ? "text-darkBlue" : "text-white"}
                font-semibold text-[16px] line-clamp-1
                `}
                >
                  {item?.title}
                </CardTitle>
                <FaGithub className={`text-[20px] font-bold ${mode ? "text-darkBlue" : "text-white"}`} />
              </Card>
            ))
          ) : (
            <div>Hech narsa topilmadi</div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CodeResource;
