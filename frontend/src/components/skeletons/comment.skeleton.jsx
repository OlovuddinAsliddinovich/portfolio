import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

const CommentSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`p-4 relative rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow ${
            mode ? "bg-white" : "bg-slate text-white"
          }`}
        >
          {/* User Info Section (Avatar, Name, Date) */}
          <div className="flex items-center gap-4 mb-2">
            <Skeleton className="bg-gray-500 w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="bg-gray-500 h-6 w-[150px] mb-2" />
              <Skeleton className="bg-gray-500 h-4 w-[100px]" />
            </div>
          </div>

          {/* Delete Button */}
          <Skeleton className="bg-gray-500 absolute top-[35%] right-2 h-[30px] w-[100px]" />

          {/* Rating Section */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="w-5 h-5 mx-1 bg-gray-500" />
            ))}
          </div>

          {/* Comment Text */}
          <Skeleton className="bg-gray-500 h-4 w-full mt-2" />
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
