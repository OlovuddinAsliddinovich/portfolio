import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

const ListItemSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className="p-2 cursor-pointer">
      <div
        className={`flex items-center justify-between gap-2 p-2 ${mode ? "bg-gray-200" : "bg-gray-800"} hover:bg-gray-500 border-t border-gray-600`}
      >
        <Skeleton className={`h-6 w-[200px] ${mode ? "bg-gray-300" : "bg-gray-600"}`} />
      </div>
    </div>
  );
};

export default ListItemSkeleton;
