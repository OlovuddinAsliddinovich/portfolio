import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";

const UsersSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <tr className="border-b h-[70px]">
      <td className="p-2 text-start">
        <Skeleton className={`h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </td>

      <td className="text-start w-[50px] h-[50px]">
        <Skeleton className={`w-[50px] h-[50px] rounded-full ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </td>

      <td className="p-2 pl-3 text-start gap-2 flex mt-[15px] flex-nowrap items-center justify-start">
        <Skeleton className={`w-[80px] h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
        <Skeleton className={`w-[100px] h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </td>

      <td className="p-2 text-start pb-3">
        <Skeleton className={`w-[150px] h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </td>

      <td className="p-2 text-start">
        <Skeleton className={`w-[100px] h-8 rounded-md ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </td>
    </tr>
  );
};

export default UsersSkeleton;
