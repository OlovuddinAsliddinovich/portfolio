import { Button } from "@/components/ui/button";
import courseModuleService from "@/services/course-module-service";
import { getModulesSuccess, setCourseModuleFailure, setCourseModuleStart, setCourseModuleSuccess } from "@/slice/course-module-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCourseModule = ({ modal, setModal }) => {
  const { mode } = useSelector((state) => state.mode);
  const { course } = useSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState({
    title: "",
    videos: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createModuleHandler = async (e) => {
    e.preventDefault();
    dispatch(setCourseModuleStart());
    setLoading(true);
    try {
      const response = await courseModuleService.createModule(moduleName, course?.id);
      const modules = await courseModuleService.getModules(course?.id);
      dispatch(setCourseModuleSuccess(response.data));
      dispatch(getModulesSuccess(modules.data));
      navigate(`/admin/courses/${course?.slug}`);
      setModal(false);
    } catch (error) {
      console.log(error);
      dispatch(setCourseModuleFailure(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed right-0 top-0 w-full h-screen bg-[rgba(0,0,0,0.8)]`} onClick={() => setModal(false)}>
      <div
        className={`w-full sm:w-[50%] ml-auto animate-right h-screen p-4 ${mode ? "bg-light text-gray-900" : "bg-darkBlue text-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={createModuleHandler}>
          <div className="flex justify-center items-center relative">
            <h1 className="text-2xl font-bold text-center">Modul Yaratish</h1>
            <button
              onClick={() => setModal(false)}
              className="text-2xl absolute right-0 top-0 z-20 font-bold cursor-pointer border border-gray-300 w-[20px] hover:text-white-700 hover:bg-red-600 hover:text-white transition-all h-[20px] rounded-sm flex justify-center items-center"
            >
              <span className="mb-[4px]">&times;</span>
            </button>
          </div>
          <div className="mt-4">
            <label htmlFor="name">Modul nomi</label>
            <input
              type="text"
              id="name"
              placeholder="Modul nomi"
              value={moduleName.title}
              onChange={(e) => setModuleName({ ...moduleName, title: e.target.value })}
              className={`w-full p-2 outline-none border border-gray-600 rounded-md ${mode ? "bg-light" : "text-white bg-darkBlue"}`}
            />
          </div>
          <Button type="submit" disabled={loading} className={`w-full mt-4 bg-blue-600 hover:bg-green-700`}>
            {loading ? "Loading..." : "Yaratish"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModule;
