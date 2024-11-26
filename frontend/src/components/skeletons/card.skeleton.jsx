import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";

const CardSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={`h-[180px] w-full ${mode ? "bg-gray-300" : "bg-gray-700"}`} />
      <Skeleton className={`rounded-none p-3 pt-2 ${mode ? "bg-gray-300" : "bg-gray-700"}`} />
    </div>
  );
};

export default CardSkeleton;
