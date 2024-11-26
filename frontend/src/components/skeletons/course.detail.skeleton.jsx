import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";

const CourseDetailSkeleton = () => {
  const { mode } = useSelector((state) => state.mode);

  const skeletonClass = mode ? "bg-gray-300" : "bg-gray-700";

  return (
    <div className="space-y-4">
      <Skeleton className={`h-8 w-1/2 mx-auto ${skeletonClass}`} />

      <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start p-4">
        <Skeleton className={`w-[300px] h-[200px] rounded-md ${skeletonClass}`} />
        <Skeleton className={`w-full h-40 sm:h-24 ${skeletonClass}`} />
      </div>

      <div className="p-4">
        <Skeleton className={`h-6 w-1/3 mx-auto ${skeletonClass}`} />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className={`h-6 w-full ${skeletonClass}`} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <Skeleton className={`h-6 w-1/3 mx-auto ${skeletonClass}`} />
        <div className="space-y-4 mt-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className={`h-10 w-full ${skeletonClass}`} />
          ))}
        </div>
        <Skeleton className={`h-12 w-full mt-4 ${skeletonClass}`} />
      </div>

      <div className="p-4">
        <Skeleton className={`h-6 w-1/3 mx-auto ${skeletonClass}`} />
        <ul className="mt-4 space-y-4">
          {[...Array(7)].map((_, index) => (
            <li key={index} className="flex justify-between items-center">
              <Skeleton className={`h-5 w-1/3 ${skeletonClass}`} />
              <Skeleton className={`h-5 w-1/3 ${skeletonClass}`} />
            </li>
          ))}
        </ul>
        <div className="py-4 px-2">
          <Skeleton className={`h-5 w-2/3 mx-auto ${skeletonClass}`} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
