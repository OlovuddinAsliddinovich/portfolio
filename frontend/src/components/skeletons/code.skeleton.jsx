import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

const CodeSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className={`flex items-center gap-2 border ${mode ? "border-gray-300" : "border-gray-800"} p-2 cursor-pointer`}>
      <div className="text-2xl">
        <Skeleton className={`w-6 h-6 rounded-full ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </div>

      <div className="w-[150px]">
        <Skeleton className={`h-4 ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </div>

      <div className="ml-auto text-xl hover:text-blue-500 p-1 transition-all">
        <Skeleton className={`w-6 h-6 rounded-full ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </div>
    </div>
  );
};

export default CodeSkeleton;
