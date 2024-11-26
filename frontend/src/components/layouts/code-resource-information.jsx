import React from "react";
import PointerRoute from "./pointer-route";
import { Card, CardTitle } from "../ui/card";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { codeResourceFailure, codeResourcesSuccess, codeResourceStart } from "@/slice/code-resource.slice";
import { codeResourceService } from "@/services/code-resource-service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CodeResourceSkeleton from "../skeletons/code.resource.skeleton";

const CodeResourceInformation = ({ mode }) => {
  const { codeResources, isLoading } = useSelector((state) => state.codeResources);
  const dispatch = useDispatch();
  const getResources = async () => {
    dispatch(codeResourceStart());
    try {
      const { data } = await codeResourceService.getAllCodeResources();
      dispatch(codeResourcesSuccess(data));
      return data;
    } catch (error) {
      dispatch(codeResourceFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <div>
      <PointerRoute text={"Kod manbalari"} />
      {isLoading ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-2 gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <CodeResourceSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${mode ? "bg-white" : "bg-darkBlue"} font-montserrat grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-2 gap-2`}
        >
          {codeResources.map((resource) => (
            <Card
              key={resource?._id}
              onClick={() => window.open(resource.url, "_blank")}
              className={`${
                mode ? "bg-white" : "bg-darkBlue border-gray-700"
              } flex justify-between resources-center rounded-[2px] p-3 cursor-pointer`}
            >
              <CardTitle
                className={`${mode ? "text-darkBlue" : "text-white"}
                font-semibold text-[16px] line-clamp-1
                `}
              >
                {resource.title}
              </CardTitle>
              <FaGithub className="text-[20px] font-bold text-gray-200" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeResourceInformation;
