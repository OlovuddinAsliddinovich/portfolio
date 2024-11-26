import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";

const CodeResourceSkeleton = ({ key }) => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className="flex gap-2 h-[40px] relative" key={key}>
      <Skeleton className={`w-full h-[40px] ${mode ? "bg-gray-300" : "bg-gray-700"}`} />
    </div>
  );
};

export default CodeResourceSkeleton;
