import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const VideoItemSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <>
      <div className="mt-4">
        <h1 className={`text-xl xs:text-2xl font-bold ${mode ? "bg-gray-300" : "bg-gray-600"} h-6 rounded-md`}>
          <Skeleton className={`h-6 w-[200px] ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
        </h1>

        <Button className={`w-full sm:w-[200px] mt-4 p-0`}>
          <Skeleton className={`h-full w-full sm:w-[200px] bg-green-600`} />
        </Button>
      </div>
      {[...Array(6)].map((_, index) => (
        <li key={index} className="flex justify-between items-start border-b py-3 mt-4 gap-4">
          <div className="cursor-pointer hover:text-gray-400 transition-all flex justify-between w-full pt-2">
            <span className="flex items-center gap-2">
              <Skeleton className={`w-4 h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
              <Skeleton className={`w-[150px] h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
            </span>
            <Skeleton className={`w-[80px] h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
          </div>

          <div className="flex gap-1 items-center xs:flex-row flex-col">
            <Skeleton className={`w-[100px] h-8 rounded-md bg-blue-600`} />
            <Skeleton className={`w-[100px] h-8 rounded-md bg-red-500`} />
          </div>
        </li>
      ))}
    </>
  );
};

export default VideoItemSkeleton;
