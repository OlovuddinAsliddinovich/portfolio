import React from "react";
import { Skeleton } from "../ui/skeleton";

const CoursesSkeleton = () => {
  return (
    <div className="flex items-center py-3 border-b border-gray-300">
      <Skeleton className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-sm object-cover" />

      <Skeleton className="w-[220px] h-6 ml-4" />

      <Skeleton className="w-[50px] h-5 ml-4" />

      <Skeleton className="w-[50px] h-5 ml-4" />

      <Skeleton className="w-[50px] h-5 ml-4" />

      <div className="flex ml-auto">
        <Skeleton className="w-10 h-10 bg-red-500 rounded-tr-none rounded-br-none" />
        <Skeleton className="w-10 h-10 bg-blue-500 rounded-tl-none rounded-bl-none ml-2" />
      </div>
    </div>
  );
};

export default CoursesSkeleton;
