import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";

const CourseCardSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className="w-full h-full flex flex-col gap-2 relative">
      <div className={`flex items-center justify-between w-[230px] z-30 overflow-hidden absolute top-2 left-0`}>
        <Skeleton className={"w-[33%] px-2 h-[25px] hover:bg-red-950 rounded-[3px] bg-red-900"} />
        <Skeleton className={"w-[33%] px-2 h-[25px] hover:bg-gray-900 rounded-[3px] bg-gray-800"} />
        <Skeleton className={"w-[33%] px-2 h-[25px] hover:bg-blue-900 rounded-[3px] bg-blue-800 text-gray-950"} />
      </div>
      <Skeleton className={`h-[180px] w-full ${mode ? "bg-gray-300" : "bg-gray-700"}`} />
      <Skeleton className={`rounded-none p-3 pt-2 ${mode ? "bg-gray-300" : "bg-gray-700"}`} />
    </div>
  );
};

export default CourseCardSkeleton;
